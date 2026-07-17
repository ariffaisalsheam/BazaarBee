import { Client, Databases, Users, Query, ID } from 'node-appwrite';
import crypto from 'node:crypto';

// Hash OTP with a secret salt to prevent read-abuse
const SALT = process.env.OTP_SECRET_SALT || 'bazaarbee-secret-salt-xyz';

function hashOtp(code) {
  return crypto.createHmac('sha256', SALT).update(code).digest('hex');
}

export default async function ({ req, res, log, error }) {
  const client = new Client();
  
  // Appwrite system variables populated inside the runtime environment
  const apiEndpoint = process.env.APPWRITE_FUNCTION_API_ENDPOINT || 'https://cloud.appwrite.io/v1';
  const projectId = process.env.APPWRITE_FUNCTION_PROJECT_ID;
  const apiKey = process.env.APPWRITE_FUNCTION_API_KEY || req.headers['x-appwrite-key'];

  client
    .setEndpoint(apiEndpoint)
    .setProject(projectId)
    .setKey(apiKey);

  const databases = new Databases(client);
  const users = new Users(client);

  const databaseId = 'bazaarbee-db';
  const otpCollectionId = 'otp_log'; // or 'otps' collection

  // Parse path and body
  const path = req.path;
  const method = req.method;
  
  // Rate limiting boundaries
  const SMS_LIMIT_SECONDS = 60; // 1 request per min per phone
  const IP_LIMIT_HOUR_COUNT = 5; // max 5 requests per hour per IP

  if (method === 'POST' && path === '/send-otp') {
    let phone, ipAddress;
    try {
      const body = JSON.parse(req.body);
      phone = body.phone;
      ipAddress = req.headers['x-forwarded-for'] || req.headers['client-ip'] || 'unknown-ip';
    } catch (e) {
      return res.json({ ok: false, message: 'Invalid JSON payload.' }, 400);
    }

    if (!phone) {
      return res.json({ ok: false, message: 'Phone number is required.' }, 400);
    }

    // Clean and validate Bangladeshi phone number format
    // Matches 01XXXXXXXXX or +8801XXXXXXXXX
    const bdPhoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
    const match = phone.trim().match(bdPhoneRegex);
    if (!match) {
      return res.json({ ok: false, message: 'Invalid Bangladeshi phone number. Must be 11 digits (e.g. 01712345678).' }, 400);
    }
    const cleanPhone = '+88' + match[1]; // Standardize format for Appwrite Auth

    try {
      const now = new Date();
      
      // 1. Rate Limiting Check (by Phone)
      const oneMinuteAgo = new Date(now.getTime() - (SMS_LIMIT_SECONDS * 1000)).toISOString();
      const phoneCheck = await databases.listDocuments(databaseId, 'otps', [
        Query.equal('phone', cleanPhone),
        Query.greaterThan('createdAt', oneMinuteAgo)
      ]);
      
      if (phoneCheck.total > 0) {
        return res.json({ ok: false, message: 'Please wait 60 seconds before requesting another OTP.' }, 429);
      }

      // 2. Rate Limiting Check (by IP)
      const oneHourAgo = new Date(now.getTime() - (60 * 60 * 1000)).toISOString();
      const ipCheck = await databases.listDocuments(databaseId, 'otps', [
        Query.equal('ipAddress', ipAddress),
        Query.greaterThan('createdAt', oneHourAgo)
      ]);

      if (ipCheck.total >= IP_LIMIT_HOUR_COUNT) {
        return res.json({ ok: false, message: 'Too many OTP requests from this connection. Please try again in an hour.' }, 429);
      }

      // 3. Generate 6-Digit OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const hashed = hashOtp(otpCode);
      const expiresAt = new Date(now.getTime() + (5 * 60 * 1000)).toISOString(); // 5 min expiry

      // 4. Save to OTP log collection
      await databases.createDocument(databaseId, 'otps', ID.unique(), {
        phone: cleanPhone,
        otpHash: hashed,
        ipAddress: ipAddress,
        expiresAt: expiresAt,
        isVerified: false,
        createdAt: now.toISOString()
      });

      // 5. Send SMS via Bangladeshi Bulk SMS API
      // To configure Greenweb, BulkSMSBD, or MimSMS, replace this block with their respective endpoints
      const smsMessage = `BazaarBee: আপনার ওটিপি কোড হলো ${otpCode}। এটি ৫ মিনিটের জন্য সচল থাকবে।`;
      log(`Sending SMS to ${cleanPhone}: "${smsMessage}"`);

      // Mock Gateway Dispatch (simulate outgoing HTTP call)
      const mockDispatchResult = await mockSmsGatewayDispatch(cleanPhone, smsMessage);
      if (!mockDispatchResult.success) {
        throw new Error('SMS Gateway connection failed.');
      }

      return res.json({ ok: true, message: 'OTP sent successfully.' });
    } catch (err) {
      error('Error sending OTP:', err.message);
      return res.json({ ok: false, message: 'Failed to send OTP. Please try again later.' }, 500);
    }
  }

  if (method === 'POST' && path === '/verify-otp') {
    let phone, code;
    try {
      const body = JSON.parse(req.body);
      phone = body.phone;
      code = body.code;
    } catch (e) {
      return res.json({ ok: false, message: 'Invalid JSON payload.' }, 400);
    }

    if (!phone || !code) {
      return res.json({ ok: false, message: 'Phone and Code are required.' }, 400);
    }

    const bdPhoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
    const match = phone.trim().match(bdPhoneRegex);
    if (!match) {
      return res.json({ ok: false, message: 'Invalid phone format.' }, 400);
    }
    const cleanPhone = '+88' + match[1];

    try {
      const now = new Date().toISOString();
      const hashed = hashOtp(code.trim());

      // Find the latest active OTP log for this phone number
      const otpLogs = await databases.listDocuments(databaseId, 'otps', [
        Query.equal('phone', cleanPhone),
        Query.equal('otpHash', hashed),
        Query.equal('isVerified', false),
        Query.greaterThan('expiresAt', now),
        Query.orderDesc('createdAt'),
        Query.limit(1)
      ]);

      if (otpLogs.total === 0) {
        return res.json({ ok: false, message: 'Invalid or expired OTP code.' }, 400);
      }

      const activeOtpDoc = otpLogs.documents[0];

      // Mark OTP as verified to prevent reuse
      await databases.updateDocument(databaseId, 'otps', activeOtpDoc.$id, {
        isVerified: true
      });

      // Find or create Appwrite User
      let userList;
      try {
        userList = await users.list([Query.equal('phone', cleanPhone)]);
      } catch (err) {
        userList = { total: 0, users: [] };
      }

      let activeUser;
      if (userList.total > 0) {
        activeUser = userList.users[0];
        log(`Existing user logged in: ${activeUser.$id}`);
      } else {
        // Create new user in Auth system
        activeUser = await users.create(ID.unique(), undefined, cleanPhone, undefined, cleanPhone.substring(3));
        log(`New user created: ${activeUser.$id}`);

        // Create Customer Profile in DB
        try {
          await databases.createDocument(databaseId, 'customer_profiles', ID.unique(), {
            userId: activeUser.$id,
            savedAddresses: [],
            wishlistVariantIds: [],
            recentlyViewedProductIds: []
          });
        } catch (profileErr) {
          error('Error generating customer profile card:', profileErr.message);
        }
      }

      // Generate Appwrite User JWT Session Token
      const tokenSession = await users.createJWT(activeUser.$id);

      return res.json({
        ok: true,
        message: 'OTP verified successfully.',
        jwt: tokenSession.jwt,
        userId: activeUser.$id,
        phone: cleanPhone
      });
    } catch (err) {
      error('Error verifying OTP:', err.message);
      return res.json({ ok: false, message: 'Verification error. Please retry.' }, 500);
    }
  }

  return res.json({ ok: false, message: 'Not Found.' }, 404);
}

// Simulated SMS dispatching (Replace with Greenweb/BulkSMSBD API request in production)
async function mockSmsGatewayDispatch(phone, message) {
  // Example of production integration:
  // const url = `https://api.greenweb.com.bd/api.php?token=${process.env.GREENWEB_TOKEN}&to=${phone}&message=${encodeURIComponent(message)}`;
  // const res = await fetch(url);
  // return res.ok;
  
  return { success: true };
}
