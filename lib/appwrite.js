import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();

// Fallback to standard Appwrite Cloud endpoints if env is not defined
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://sgp.cloud.appwrite.io/v1';
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '6a5a340d000f5a5a8876';

client
  .setEndpoint(endpoint)
  .setProject(projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Helper to get optimized image URLs from Appwrite Storage
export function getOptimizedImageUrl(bucketId, fileId, width = 600, height = 600, quality = 80) {
  if (!fileId) return '/mascot.jpg'; // default fallback
  return `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}&width=${width}&height=${height}&quality=${quality}`;
}

export { client };
