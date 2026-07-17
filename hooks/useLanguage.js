'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const DICTIONARY = {
  BN: {
    // Header
    home: "হোম (Home)",
    orders: "অর্ডার ট্র্যাকিং (Orders)",
    cartBtn: "ঝুড়ি",
    langToggle: "EN",
    
    // HomeHero
    heroSub: "রংপুরের নিজস্ব অনলাইন বাজার",
    heroTitleMain: "সহজ, সাশ্রয়ী ও খাঁটি",
    heroTitleSub: "মাসিক বাজার",
    heroTitleEnd: "সমাধান!",
    heroDesc: "বাজারের হাজারো ভিড় ও ভেজালের দিন শেষ। প্রতি মাসে আপনার প্রয়োজনীয় খাঁটি গ্রোসারি সামগ্রী সরাসরি ব্র্যান্ড থেকে পৌঁছে যাবে আপনার দুয়ারে, নির্দিষ্ট সময়সূচী অনুযায়ী।",
    btnShop: "বাজার শুরু করুন (Shop Now)",
    btnCategories: "ক্যাটাগরি দেখুন (View Catalog)",
    
    // MascotWidget
    mascotName: "বাজ ভাই (BUZZ)",
    mascotMsg0: "স্বাগতম! আপনার মাসিক বাজার সহজ ও সাশ্রয়ী করতে আমি প্রস্তুত। 🍯",
    mascotMsg1: "জানেন কি? BazaarBee-তে প্রতিটি মাসিক বাজারে গড়ে ১৫% সাশ্রয় হয়! ৳",
    mascotMsg2: "অর্ডার করলেই আপনার সুবিধাজনক সময়ে (যেমন সকাল ১১টা - দুপুর ২টো) পৌঁছে দেবো। 🚚",
    mascotMsg3: "আমাদের সব পণ্য ১০০% আসল ও খাঁটি। কোনো নকল পণ্যের ঠাঁই নেই! 🛡️",
    mascotMsg4: "মাসিক বাজার করার পর আমাদের ক্যাশ অন ডেলিভারি (COD) অপশন বেছে নিন। 🤝",
    mascotMsg5: "আজকে কি চা, চিনি আর আটা নিতে ভুলে গেছেন? ঝটপট ঝুড়িতে যোগ করুন! 🐝",
    
    // SearchBar
    searchPlaceholder: "খাঁটি সয়াবিন তেল, চিনি, আটা ইত্যাদি খুঁজুন...",
    searchBtn: "খুঁজুন",
    searchResultsTitle: "অনুসন্ধান ফলাফল",
    foundCount: "টি পণ্য পাওয়া গেছে",
    searchEmpty: "দুঃখিত! কোনো পণ্য খুঁজে পাওয়া যায়নি।",
    searchEmptyDesc: "অন্য কোনো কীওয়ার্ড দিয়ে চেষ্টা করুন অথবা ক্যাটাগরি মেনু দেখুন।",
    
    // Categories
    categoriesTitle: "ক্যাটাগরি সমূহ",
    catEmpty: "শীঘ্রই আসছে!",
    catEmptyDesc: "রংপুর শহরের এই ক্যাটাগরির পণ্যগুলো আমাদের তালিকায় যোগ করার কাজ চলছে।",
    foundInCat: "এই বিভাগে {count} টি খাঁটি পণ্য পাওয়া গেছে।",
    
    // ProductCard
    discountBadge: "ছাড়",
    saveLabel: "সাশ্রয়",
    quantityLabel: "পরিমাণ",
    addCartBtn: "ঝুড়িতে যোগ করুন",
    outStock: "স্টক শেষ (Stock Out)",
    inStock: "স্টকে আছে",
    
    // CartDrawer
    cartHeader: "আপনার বাজার ঝুড়ি",
    cartEmpty: "আপনার ঝুড়ি খালি আছে!",
    cartEmptyDesc: "খাঁটি পণ্য সাশ্রয়ী মূল্যে কিনতে ঝুড়িতে পণ্য যোগ করুন।",
    removeBtn: "মুছে ফেলুন",
    subtotal: "উপ-মোট:",
    totalSavings: "মোট সাশ্রয়:",
    deliveryCharge: "ডেলিভারি চার্জ:",
    free: "ফ্রি (Free)",
    deliveryHint: "৳১,০০০ বা তার বেশি অর্ডারে ফ্রি ডেলিভারি! (৳{rest} বাকি)",
    total: "সর্বমোট:",
    checkoutBtn: "অর্ডার করতে এগিয়ে যান",
    
    // CheckoutForm
    detailsHeader: "ডেলিভারি তথ্য",
    errorEmpty: "সবগুলো ঘর পূরণ করা আবশ্যক।",
    labelName: "গ্রাহকের নাম *",
    placeholderName: "আপনার নাম লিখুন...",
    labelPhone: "মোবাইল নম্বর (ওটিপির জন্য) *",
    labelAddress: "ডেলিভারি ঠিকানা *",
    placeholderAddress: "আপনার বাসার নম্বর, রোড নম্বর ও এলাকার নাম...",
    labelSlot: "ডেলিভারি সময়সূচী *",
    slot1: "11:00 AM – 2:00 PM (দুপুরের শিফট)",
    slot2: "2:00 PM – 5:00 PM (বিকেলের শিফট)",
    slot3: "5:00 PM – 8:00 PM (সন্ধ্যার শিফট)",
    codMethod: "পেমেন্ট পদ্ধতি: ক্যাশ অন ডেলিভারি (COD)",
    submitBtn: "ওটিপি পাঠান ও অর্ডার করুন",
    orderSummary: "অর্ডার সারসংক্ষেপ",
    otpHeader: "মোবাইল নম্বর যাচাইকরণ",
    otpDesc: "আমরা আপনার নম্বরে একটি ৬-ডিজিটের ওটিপি (OTP) কোড পাঠিয়েছি। দয়া করে নিচে কোডটি দিন।",
    otpBtnCancel: "বাতিল করুন",
    otpBtnVerify: "অর্ডার সম্পন্ন করুন",
    otpVerifyLoading: "যাচাই হচ্ছে...",
    otpInvalid: "দয়া করে সঠিক ৬-ডিজিটের কোড দিন।",
    
    // Orders
    successHeader: "অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে!",
    successDesc: "বাজ ভাই আপনার অর্ডারটি প্রস্তুত করছে। সঠিক সময়ে রংপুর সিটিতে বাজার পৌঁছে দেওয়া হবে।",
    ordersTitle: "আপনার অর্ডার ট্র্যাকিং তথ্য",
    ordersDesc: "নিচে আপনার অর্ডারের বর্তমান অবস্থা এবং বিলের সারসংক্ষেপ দেওয়া হলো।",
    continueBtn: "বাজার অব্যাহত রাখুন",
    loadingOrder: "অর্ডার তথ্য লোড হচ্ছে...",
    orderNo: "অর্ডার নং:",
    orderDate: "তারিখ:",
    deliveryAddressLabel: "ডেলিভারি ঠিকানা:",
    phoneLabel: "ফোন:",
    addressLabel: "ঠিকানা:",
    slotLabel: "সময়সূচী:",
    itemsLabel: "পণ্যের বিবরণ (Snapshots):",
    methodLabel: "পেমেন্ট পদ্ধতি:",
    savingsLabel: "সঞ্চয় করেছেন (Savings):",
    amountLabel: "পরিশোধযোগ্য মূল্য:",
    trackerHeader: "ডেলিভারি ট্র্যাকিং",
    
    step1: "অর্ডার নিশ্চিত করা হয়েছে",
    step2: "প্যাকিং চলছে",
    step3: "ডেলিভারি রাইডার রওনা হয়েছেন",
    step4: "ডেলিভারি সম্পন্ন",
    
    buzzStep1: "অর্ডার নিশ্চিত হয়েছে! আমি পণ্যগুলো গুছিয়ে প্যাক করার কাজ শুরু করতে যাচ্ছি! 📦",
    buzzStep2: "পণ্যগুলো ঝুড়িতে গুছিয়ে প্যাকিং করছি। একটু পরেই রাইডার ভাই নিয়ে বের হবেন! 🛒",
    buzzStep3: "সাবাস! রাইডার ভাই রংপুর সিটি রোডে রওনা হয়েছেন। সঠিক সময়ে আপনার কাছে পৌঁছে যাবে! 🏍️",
    buzzStep4: "ডেলিভারি সম্পন্ন হয়েছে! পণ্যগুলো সম্পর্কে কোনো মতামত থাকলে অবশ্যই জানাবেন। আমাদের সাথে থাকার জন্য ধন্যবাদ! 🍯",
    
    // Trust Badges
    prop1Title: "১০০% আসল পণ্য",
    prop1Desc: "সরাসরি ব্র্যান্ড এবং আমদানিকারকদের থেকে সংগৃহীত অরিジナル গ্রোসারি পণ্য।",
    prop2Title: "বাজার সেরা মূল্য",
    prop2Desc: "কোনো মধ্যস্বত্বভোগী নেই, তাই আমরা বাজারে সবচেয়ে প্রতিযোগিতামূলক দাম নিশ্চিত করি।",
    prop3Title: "নির্ধারিত ডেলিভারি শিফট",
    prop3Desc: "আপনার সুবিধামত সময়ের শিফট বেছে নিন, বাজ ভাই সময়মত পৌঁছে দেবে!",
    freeDeliveryThreshold: "রংপুর সিটি ফ্রি হোম ডেলিভারি (৳১,০০০+ অর্ডারে)"
  },
  EN: {
    // Header
    home: "Home",
    orders: "Order Tracking",
    cartBtn: "Basket",
    langToggle: "বাংলা",
    
    // HomeHero
    heroSub: "Rangpur's Local Online Market",
    heroTitleMain: "Easy, Affordable & Genuine",
    heroTitleSub: "Monthly Grocery",
    heroTitleEnd: "Solutions!",
    heroDesc: "No more crowded markets and adulterated goods. Receive your genuine daily essentials directly from brands to your doorstep in scheduled waves.",
    btnShop: "Start Shopping",
    btnCategories: "View Categories",
    
    // MascotWidget
    mascotName: "Buzz-bhai (BUZZ)",
    mascotMsg0: "Welcome! I am ready to make your monthly grocery easy and affordable. 🍯",
    mascotMsg1: "Did you know? BazaarBee saves you an average of 15% on each monthly grocery list! ৳",
    mascotMsg2: "We will deliver in your preferred wave (e.g. 11:00 AM – 2:00 PM). 🚚",
    mascotMsg3: "All our products are 100% original and genuine. No fake products allowed! 🛡️",
    mascotMsg4: "Choose our Cash on Delivery (COD) payment method after checkout. 🤝",
    mascotMsg5: "Did you forget to add tea, sugar, or flour to your list today? Add them to the basket! 🐝",
    
    // SearchBar
    searchPlaceholder: "Search soyabean oil, sugar, flour, tea...",
    searchBtn: "Search",
    searchResultsTitle: "Search Results",
    foundCount: "products found",
    searchEmpty: "Sorry! No products found.",
    searchEmptyDesc: "Try another keyword or view the categories menu.",
    
    // Categories
    categoriesTitle: "Categories",
    catEmpty: "Coming Soon!",
    catEmptyDesc: "We are currently adding products for this category in Rangpur City.",
    foundInCat: "Found {count} authentic products in this section.",
    
    // ProductCard
    discountBadge: "Off",
    saveLabel: "Save",
    quantityLabel: "Qty",
    addCartBtn: "Add to Basket",
    outStock: "Out of Stock",
    inStock: "In Stock",
    
    // CartDrawer
    cartHeader: "Your Shopping Basket",
    cartEmpty: "Your basket is empty!",
    cartEmptyDesc: "Add genuine groceries to your basket to buy them at fair prices.",
    removeBtn: "Remove",
    subtotal: "Subtotal:",
    totalSavings: "Total Savings:",
    deliveryCharge: "Delivery Fee:",
    free: "Free",
    deliveryHint: "Free delivery on orders over ৳1,000! (৳{rest} remaining)",
    total: "Total:",
    checkoutBtn: "Proceed to Checkout",
    
    // CheckoutForm
    detailsHeader: "Delivery Details",
    errorEmpty: "All fields are required.",
    labelName: "Customer Name *",
    placeholderName: "Enter your name...",
    labelPhone: "Mobile Number (for OTP) *",
    labelAddress: "Delivery Address *",
    placeholderAddress: "House number, road number, area name...",
    labelSlot: "Delivery Slot *",
    slot1: "11:00 AM – 2:00 PM (Noon Shift)",
    slot2: "2:00 PM – 5:00 PM (Afternoon Shift)",
    slot3: "5:00 PM – 8:00 PM (Evening Shift)",
    codMethod: "Payment Method: Cash on Delivery (COD)",
    submitBtn: "Send OTP & Order",
    orderSummary: "Order Summary",
    otpHeader: "Mobile Verification",
    otpDesc: "We sent a 6-digit verification OTP code to your phone **{phone}**. Enter it below.",
    otpBtnCancel: "Cancel",
    otpBtnVerify: "Confirm & Order",
    otpVerifyLoading: "Verifying...",
    otpInvalid: "Please enter a valid 6-digit OTP code.",
    
    // Orders
    successHeader: "Order placed successfully!",
    successDesc: "Buzz-bhai is preparing your package. It will be delivered in your slot in Rangpur City.",
    ordersTitle: "Your Order Status",
    ordersDesc: "Below is your active order status and invoice snapshot.",
    continueBtn: "Continue Shopping",
    loadingOrder: "Loading order details...",
    orderNo: "Order No:",
    orderDate: "Date:",
    deliveryAddressLabel: "Shipping Address:",
    phoneLabel: "Phone:",
    addressLabel: "Address:",
    slotLabel: "Scheduled Wave:",
    itemsLabel: "Purchase Items Snapshot:",
    methodLabel: "Payment Method:",
    savingsLabel: "Total Saved:",
    amountLabel: "Total Paid:",
    trackerHeader: "Delivery Tracking",
    
    step1: "Order Confirmed",
    step2: "Packaging Items",
    step3: "Rider Out for Delivery",
    step4: "Delivered",
    
    buzzStep1: "Order confirmed! I am starting to pack your monthly groceries! 📦",
    buzzStep2: "Packing your goods in the delivery box. Rider-bhai will pick it up soon! 🛒",
    buzzStep3: "Great! The rider is out on the roads in Rangpur City. It will arrive on time! 🏍️",
    buzzStep4: "Delivered successfully! Please let us know if you have any feedback. Thank you! 🍯",
    
    // Trust Badges
    prop1Title: "100% Genuine Products",
    prop1Desc: "Authentic branded essentials sourced directly from manufacturers.",
    prop2Title: "Fair Pricing",
    prop2Desc: "No middlemen means we guarantee the most competitive rates in Rangpur.",
    prop3Title: "Scheduled Wave Delivery",
    prop3Desc: "Choose your convenient time slot, and Buzz-bhai will deliver right on schedule!",
    freeDeliveryThreshold: "Free home delivery in Rangpur City (on orders over ৳1,000)"
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('BN');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('bazaarbee_lang');
    if (stored === 'EN' || stored === 'BN') {
      setLanguage(stored);
    }
    setIsLoaded(true);
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === 'BN' ? 'EN' : 'BN';
      localStorage.setItem('bazaarbee_lang', next);
      return next;
    });
  };

  const t = (key) => {
    return DICTIONARY[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, isLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
