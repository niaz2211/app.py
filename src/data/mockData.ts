import { ContestPrize, Winner, Notice, SiteSettings, UserProfile, AdminActivityLog, DepositRequest, LegalDocument } from '../types';

export const initialLegalDocuments: LegalDocument[] = [
  {
    id: 'doc-trade',
    title: 'সিটি কর্পোরেশন ই-ট্রেড লাইসেন্স',
    documentType: 'trade_license',
    documentNumber: 'TRAD/DSCC/028491/2024',
    issuingAuthority: 'ঢাকা দক্ষিণ সিটি কর্পোরেশন (অঞ্চল-৫)',
    issueDate: '০১ জুলাই ২০২৪',
    expiryDate: '৩০ জুন ২০২৫ (নবায়নকৃত)',
    verified: true,
    fileUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80',
    description: 'ডিজিটাল ই-কমার্স, মেগা ক্যাম্পেইন ও প্রোমোশনাল কনটেস্ট পরিচালনার জন্য গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত বৈধ ট্রেড লাইসেন্স।'
  },
  {
    id: 'doc-tin',
    title: 'ই-টিআইএন সনদপত্র (e-TIN Certificate)',
    documentType: 'tin',
    documentNumber: '৭৪৮৯২০১৯৩৪২৮ / অঞ্চল-৫',
    issuingAuthority: 'জাতীয় রাজস্ব বোর্ড (NBR), বাংলাদেশ',
    issueDate: '১২ জানুয়ারি ২০২৩',
    expiryDate: 'আজীবন কার্যকর',
    verified: true,
    fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1000&q=80',
    description: 'জাতীয় রাজস্ব বোর্ড (NBR) কর্তৃক নিবন্ধিত ও নিয়মিত ট্যাক্স প্রদানকারী প্রতিষ্ঠান।'
  },
  {
    id: 'doc-bin',
    title: 'বিআইএন / মূসক নিবন্ধন সনদ (BIN / VAT Registration)',
    documentType: 'bin_vat',
    documentNumber: '০০২৯১০৪৮১-০১০১',
    issuingAuthority: 'কাস্টমস, এক্সাইজ ও ভ্যাট কমিশনারেট (ঢাকা দক্ষিণ), এনবিআর',
    issueDate: '০৫ মার্চ ২০২৩',
    expiryDate: 'নিয়মিত হালনাগাদকৃত',
    verified: true,
    fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80',
    description: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের মূসক ও ভ্যাট বিধিমালা অনুযায়ী অনুমোদিত ও নিবন্ধিত।'
  },
  {
    id: 'doc-rjsc',
    title: 'কোম্পানি ইনকর্পোরেশন ও নিবন্ধন সনদ',
    documentType: 'rjsc',
    documentNumber: 'C-194820/2023',
    issuingAuthority: 'রেজিস্ট্রার অব জয়েন্ট স্টক কোম্পানিজ অ্যান্ড ফার্মস (RJSC)',
    issueDate: '১৫ নভেম্বর ২০২৩',
    expiryDate: 'আজীবন নিবন্ধিত',
    verified: true,
    fileUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
    description: 'বাণিজ্য মন্ত্রণালয়ের অধীন জয়েন্ট স্টক কোম্পানিজ নিবন্ধিত বৈধ ডিজিটাল ব্র্যান্ড এন্টারপ্রাইজ।'
  }
];

export const initialSiteSettings: SiteSettings = {
  siteName: '৫০ টাকায় মোবাইল জিতুন',
  tagline: 'আপনার স্বপ্নের মোবাইল জেতার বিশ্বস্ত ও স্বচ্ছ প্ল্যাটফর্ম',
  heroHeadline: 'আপনার স্বপ্নের মোবাইল জিতুন!',
  heroSubheadline: 'স্যামসাং গ্যালাক্সি S25 আল্ট্রা এবং আইফোন ১৬ প্রো ম্যাক্স এর মতো প্রিমিয়াম ফ্ল্যাগশিপ স্মার্টফোন এখন আপনার হাতের নাগালে। অংশগ্রহণ করে জিতে নিন আপনার স্বপ্নের মোবাইল!',
  heroPhoneImage: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=80',
  helplinePhone: '+৮৮০ ১৭৯৯-৯৮৮৭৭৬',
  supportEmail: 'niazuddinmd1@gmail.com',
  officeAddress: 'লেভেল ৭, সফটওয়্যার টেকনোলজি পার্ক, কাওরান বাজার, ঢাকা-১২১৫',
  isPaidEnabled: true, // Activated for real official 50 Tk contest
  entryFeeAmount: '৫০',
  bkashNumber: '01863440490',
  nagadNumber: '01863440490',
  rocketNumber: '01863440490',
  binancePayId: '89420184 (Binance Pay)',
  binanceUsdtAddress: 'TXvN71u3sPZqQ9K2wR5M4J8yT90184Trx20',
  countdownDays: 3,
  countdownHours: 14,
  countdownMinutes: 42,
  countdownSeconds: 18,
  countdownTitle: 'লাইভ মেগা ড্র শেষ হতে বাকি:',
  luckyWheelEnabled: true,
  legalDocuments: initialLegalDocuments,
  heroCustomMobile: {
    brand: 'Samsung',
    model: 'Galaxy S25 Ultra 5G',
    marketPrice: '১,৭৫,০০০ টাকা',
    entryFee: '৫০ টাকা',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=80',
    badge: '🏆 গ্র্যান্ড প্রাইজ',
    display: '৬.৮ ইঞ্চি Dynamic AMOLED 2X, 120Hz',
    ramRom: '১২ জিবি র‍্যাম + ৫১২ জিবি স্টোরেজ',
    camera: '২০০ মেগাপিক্সেল কোয়াড আল্ট্রা ক্যামেরা',
    battery: '৫০০০ mAh ব্যাটারি, ৪৫W ফাস্ট চার্জার',
    processor: 'Snapdragon 8 Elite (3nm)',
    totalParticipants: 1842
  },
  legalNoticeBanner: '৫০ টাকায় মেগা মোবাইল কনটেস্টে স্বাগতম! বিকাশ, নগদ, রকেট ও বাইন্যান্সের মাধ্যমে ফি পরিশোধ করে অফিশিয়াল টিকিট সংগ্রহ করুন। ১০০% নিরাপদ ও স্বচ্ছ প্ল্যাটফর্ম।',
  marqueeNotice: '🔥 নতুন মেগা ড্র! স্যামসাং গ্যালাক্সি S25 আল্ট্রা ও আইফোন ১৬ প্রো ম্যাক্স প্রতিযোগিতায় আজই টিকিট সংগ্রহ করুন!',
  facebookUrl: 'https://facebook.com',
  youtubeUrl: 'https://youtube.com',
  adminEmail: 'niazuddinmd1@gmail.com',
  adminPassword: '67373',
  autoApproveUserRegistration: true,
  allowFreeEntry: false, // Strict: No free entries permitted!
  animationVideo: {
    enabled: true,
    title: 'ফ্ল্যাগশিপ মোবাইল ও লাইভ ড্র ৩ডি অ্যানিমেশন',
    subtitle: 'দেখুন কীভাবে সম্পূর্ণ নিরপেক্ষ কম্পিউটারাইজড সিস্টেমে প্রতি সপ্তাহের আকর্ষণীয় স্যামসাং ও আইফোন মেগা ড্র সম্পন্ন হয়।',
    badge: '🎥 এক্সক্লুসিভ লাইভ ড্র অ্যানিমেশন',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-device-in-a-studio-41775-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1200&q=80',
    autoplay: true,
    loop: true,
    muted: true,
  },
};

// Calculate end dates in the near future (e.g., 2 to 7 days from now)
const now = new Date();
const addDays = (days: number) => {
  const d = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  return d.toISOString();
};

export const initialPrizes: ContestPrize[] = [
  {
    id: 'samsung-s25-ultra',
    brand: 'Samsung',
    model: 'Galaxy S25 Ultra 5G',
    marketPrice: '১,৭৫,০০০ টাকা',
    entryFee: '৫০ টাকা',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=80',
    endDate: addDays(3),
    totalParticipants: 1842,
    maxEntries: 2500,
    status: 'active',
    featured: true,
    specs: {
      display: '৬.৮ ইঞ্চি Dynamic AMOLED 2X, 120Hz',
      ramRom: '১২ জিবি র‍্যাম + ৫১২ জিবি স্টোরেজ',
      camera: '২০০ মেগাপিক্সেল কোয়াড আল্ট্রা ক্যামেরা',
      battery: '৫০০০ mAh ব্যাটারি, ৪৫W ফাস্ট চার্জার',
      processor: 'Snapdragon 8 Elite (3nm Processor)'
    }
  },
  {
    id: 'iphone-16-pro-max',
    brand: 'Apple',
    model: 'iPhone 16 Pro Max',
    marketPrice: '১,৯৫,০০০ টাকা',
    entryFee: '৫০ টাকা',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=80',
    endDate: addDays(5),
    totalParticipants: 2410,
    maxEntries: 3000,
    status: 'active',
    featured: true,
    specs: {
      display: '৬.৯ ইঞ্চি Super Retina XDR OLED, 120Hz ProMotion',
      ramRom: '৮ জিবি র‍্যাম + ২৫৬ জিবি স্টোরেজ',
      camera: '৪৮ মেগাপিক্সেল ফিউশন ক্যামেরা + ৫x টেলিফটো',
      battery: 'অসাধারণ ব্যাটারি লাইফ (৩৩ ঘণ্টা ভিডিও প্লেব্যাক)',
      processor: 'Apple A18 Pro Bionic Chip'
    }
  },
  {
    id: 'xiaomi-14-ultra',
    brand: 'Xiaomi',
    model: 'Xiaomi 14 Ultra (Leica Edition)',
    marketPrice: '১,৩৫,০০০ টাকা',
    entryFee: '৫০ টাকা',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80',
    endDate: addDays(4),
    totalParticipants: 1120,
    maxEntries: 2000,
    status: 'active',
    featured: false,
    specs: {
      display: '৬.৭৩ ইঞ্চি LTPO AMOLED, 120Hz, 3000 nits',
      ramRom: '১৬ জিবি র‍্যাম + ৫১২ জিবি স্টোরেজ',
      camera: '৫০ এমপি ১-ইঞ্চি সেন্সর Leica Quad Camera',
      battery: '৫০০০ mAh ব্যাটারি, ৯০W ওয়্যারলেস ও ক্যাবল চার্জ',
      processor: 'Snapdragon 8 Gen 3 (Flagship)'
    }
  },
  {
    id: 'oneplus-13-flagship',
    brand: 'OnePlus',
    model: 'OnePlus 13 Pro 5G',
    marketPrice: '৯৮,০০০ টাকা',
    entryFee: '৫০ টাকা',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
    endDate: addDays(7),
    totalParticipants: 890,
    maxEntries: 1500,
    status: 'active',
    featured: false,
    specs: {
      display: '৬.৮২ ইঞ্চি ২K Oriental Screen, 120Hz',
      ramRom: '১২ জিবি র‍্যাম + ২৫৬ জিবি স্টোরেজ',
      camera: '৫০ এমপি Hasselblad Triple Camera',
      battery: '৬০০০ mAh Glacier ব্যাটারি, ১০০W SuperVOOC',
      processor: 'Snapdragon 8 Elite'
    }
  },
  {
    id: 'vivo-x100-pro',
    brand: 'Vivo',
    model: 'Vivo X100 Pro ZEISS',
    marketPrice: '১,১৫,০০০ টাকা',
    entryFee: '৫০ টাকা',
    image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=900&q=80',
    endDate: addDays(6),
    totalParticipants: 750,
    maxEntries: 1500,
    status: 'upcoming',
    featured: false,
    specs: {
      display: '৬.৭৮ ইঞ্চি AMOLED, 120Hz, 3000 nits peak',
      ramRom: '১৬ জিবি র‍্যাম + ৫১২ জিবি স্টোরেজ',
      camera: '৫০ এমপি ZEISS 1-ইঞ্চি সেন্সর ও এআই প্রোট্রেট',
      battery: '৫৪০০ mAh ব্যাটারি, ১০০W FlashCharge',
      processor: 'MediaTek Dimensity 9300'
    }
  }
];

export const initialWinners: Winner[] = [
  {
    id: 'w-1',
    contestId: 'samsung-s24-ultra',
    contestTitle: 'Samsung Galaxy S24 Ultra মেগা ড্র',
    winnerName: 'মোঃ তানভীর আহমেদ',
    phoneMasked: '০১৭১১-****৮৯',
    location: 'মিরপুর-১০, ঢাকা',
    ticketNumber: 'TKT-78291',
    wonDate: '২৮ অক্টোবর ২০২৪',
    prizeModel: 'Samsung Galaxy S24 Ultra (512GB)',
    prizeImage: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80',
    userPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    story: 'প্রথমটায় বিশ্বাসই করতে পারছিলাম না যে আমি সত্যি সত্যিই ফোনটা পেয়েছি! কুরিয়ারে যখন ফোনটা হাতে পেলাম, আমার পুরো পরিবার খুশি হয়েছে। সম্পূর্ণ সৎ ও স্বচ্ছ প্ল্যাটফর্ম।',
    rating: 5,
  },
  {
    id: 'w-2',
    contestId: 'iphone-15-pro',
    contestTitle: 'iPhone 15 Pro Max মেগা উৎসব',
    winnerName: 'ফারহানা ইসলাম তন্বী',
    phoneMasked: '০১৮২২-****১২',
    location: 'জিইসি মোড়, চট্টগ্রাম',
    ticketNumber: 'TKT-45210',
    wonDate: '১৫ অক্টোবর ২০২৪',
    prizeModel: 'iPhone 15 Pro Max (Natural Titanium)',
    prizeImage: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
    userPhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    story: 'আমি ডেমো এন্ট্রি দিয়েছিলাম মাত্র। লাইভ নোটিফিকেশনে যখন দেখলাম আমার নাম ও টিকিট কোড উঠেছে, আমি আনন্দে লাফিয়ে উঠেছিলাম! মাত্র ৩ দিনে ঢাকায় এসে অফিসে গিফট গ্রহণ করেছি।',
    rating: 5,
  },
  {
    id: 'w-3',
    contestId: 'xiaomi-13-ultra',
    contestTitle: 'Xiaomi 13 Ultra ক্যামেরা মেগা ড্র',
    winnerName: 'সাকিব আল হাসান (রাকিব)',
    phoneMasked: '০১৯১১-****৪৫',
    location: 'জিন্দাবাজার, সিলেট',
    ticketNumber: 'TKT-90184',
    wonDate: '০২ অক্টোবর ২০২৪',
    prizeModel: 'Xiaomi 13 Ultra Leica Black',
    prizeImage: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80',
    userPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    story: 'সিলেটে কুরিয়ারের মাধ্যমে সুন্দর প্যাকেজিং এ মোবাইল পেয়েছি। কোনো বাড়তি ফি বা ভ্যাট দিতে হয়নি। সবাইকে ধন্যবাদ!',
    rating: 5,
  }
];

export const initialNotices: Notice[] = [
  {
    id: 'n-1',
    title: 'অফিশিয়াল মেগা মোবাইল ড্র সংক্রান্ত ঘোষণা',
    content: 'সকল ব্যবহারকারীদের জন্য ৫০ টাকায় প্রিমিয়াম টিকিট সংগ্রহ ও আকর্ষণীয় লাকি ড্র চালু হয়েছে। বিকাশ, নগদ ও রকেটের মাধ্যমে ফি পরিশোধ করে দ্রুত ট্রানজেকশন আইডি দিয়ে টিকিট নিশ্চিত করুন।',
    date: '০৫ নভেম্বর ২০২৪',
    type: 'announcement',
    active: true,
  },
  {
    id: 'n-2',
    title: 'প্রতারক চক্র হতে সতর্ক থাকুন!',
    content: 'আমাদের অফিশিয়াল ওয়েবসাইট ও হেল্পলাইনে দেওয়া নম্বর ব্যতীত অন্য কোনো ব্যক্তিগত নম্বরে অর্থ পাঠাবেন না। যেকোনো প্রয়োজনে সরাসরি আমাদের হেল্পলাইনে যোগাযোগ করুন।',
    date: '০১ নভেম্বর ২০২৪',
    type: 'urgent',
    active: true,
  },
  {
    id: 'n-3',
    title: 'স্যামসাং গ্যালাক্সি S25 আল্ট্রা মেগা ড্র লাইভ',
    content: 'চলতি সপ্তাহের সবচেয়ে বড় আকর্ষণ স্যামসাং S25 আল্ট্রা কনটেস্টে অংশ নিয়ে আপনার টিকিট কোড সংগ্রহ করুন। ড্র শেষ হতে আর মাত্র ৩ দিন বাকি!',
    date: '২৮ অক্টোবর ২০২৪',
    type: 'announcement',
    active: true,
  }
];

export const initialFaqs = [
  {
    question: '“৫০ টাকায় মোবাইল জিতুন” আসলে কী ধরনের প্ল্যাটফর্ম?',
    answer: 'এটি একটি প্রিমিয়াম অনলাইন প্রমোশনাল ও স্মার্টফোন রিওয়ার্ড প্রতিযোগিতা পোর্টাল। দেশের যেকোনো নাগরিক মাত্র ৫০ টাকায় টিকিট সংগ্রহ করে তার পছন্দের ফ্ল্যাগশিপ মোবাইল জিতে নেওয়ার সুযোগ পান।'
  },
  {
    question: 'আমি কীভাবে ৫০ টাকায় টিকিট কিনতে পারব?',
    answer: '১. ওয়েবসাইটে আপনার মোবাইল নম্বর ও নাম দিয়ে অ্যাকাউন্ট খুলুন বা লগইন করুন।\n২. যে মোবাইলটি জিততে চান সেটির "৫০ টাকায় টিকিট নিন" বাটনে ক্লিক করুন।\n৩. প্রদত্ত বিকাশ, নগদ বা রকেটে ৫০ টাকা সেন্ড মানি করে ট্রানজেকশন আইডি (TrxID) দিয়ে সাবমিট করুন।\n৪. অ্যাডমিন ভেরিফাই করার পর আপনার টিকিটটি নিশ্চিত হবে!'
  },
  {
    question: 'টিকিট পাওয়ার পর ড্র কখন অনুষ্ঠিত হবে?',
    answer: 'প্রতিটি মোবাইলের জন্য নির্ধারিত সময়সীমা বা টিকিট কোটা পূর্ণ হওয়ার সাথে সাথে স্বয়ংক্রিয় সফটওয়্যার লাইভ ড্র এর মাধ্যমে বিজয়ী নির্বাচন করা হয় এবং ওয়েবসাইট ও ফেসবুক পেজে ফলাফল ঘোষণা করা হয়।'
  },
  {
    question: 'বিজয়ীদের কীভাবে নির্বাচন করা হয়?',
    answer: 'প্রতিযোগিতার মেয়াদ শেষ হওয়ার পর অংশগ্রহণকারী সকল বৈধ টিকিট নম্বরের মধ্য থেকে স্বয়ংক্রিয়ভাবে নিরপেক্ষ ক্রিপ্টোগ্রাফিক অ্যালগরিদমের মাধ্যমে লাইভ ড্র হয়। কোনো প্রকার পক্ষপাতিত্বের সুযোগ নেই।'
  },
  {
    question: 'পুরস্কার পাওয়ার পর মোবাইল কীভাবে আমার হাতে পৌঁছাবে?',
    answer: 'বিজয়ী ঘোষিত হলে আমাদের অফিশিয়াল হেল্পলাইন থেকে সরাসরি বিজয়ীর সাথে যোগাযোগ করা হয়। বিজয়ী চাইলে ঢাকায় আমাদের প্রধান কার্যালয়ে এসে সরাসরি নিতে পারেন অথবা নিরাপদ কুরিয়ারের মাধ্যমে নিজ বাড়িতে সম্পূর্ণ বিনামূল্যে ডেলিভারি গ্রহণ করতে পারেন।'
  },
  {
    question: 'একটি অ্যাকাউন্ট থেকে কয়টি টিকিট নেওয়া যাবে?',
    answer: 'প্রতিটি সচল প্রতিযোগিতায় আপনি আপনার প্রয়োজনমতো টিকিট সংগ্রহ করতে পারবেন। যত বেশি টিকিট সংগ্রহ করবেন, বিজয়ী হওয়ার সম্ভাবনা তত বৃদ্ধি পাবে।'
  }
];

export const initialUsers: UserProfile[] = [
  {
    id: 'admin-master',
    name: 'প্রধান অ্যাডমিনিস্ট্রেটর',
    phone: '০১৭৯৯-৯৮৮৭৭৬',
    email: 'niazuddinmd1@gmail.com',
    password: '67373',
    role: 'admin',
    address: 'কাওরান বাজার, ঢাকা',
    district: 'ঢাকা',
    joinedDate: '০১ নভেম্বর ২০২৪',
    status: 'active',
    totalEntriesCount: 0,
    lastLogin: 'আজ',
  },
  {
    id: 'usr-1',
    name: 'তানজিমুল হাসান',
    phone: '০১৭০১-১২৩৪৫৬',
    email: 'tanzim@gmail.com',
    password: '123456',
    role: 'user',
    address: 'বাড়ি ১২, রোড ৪, ধানমন্ডি',
    district: 'ঢাকা',
    joinedDate: '০১ নভেম্বর ২০২৪',
    status: 'active',
    totalEntriesCount: 3,
  },
  {
    id: 'usr-2',
    name: 'নুসরাত জাহান মিম',
    phone: '০১৮১২-৯৮৭৬৫৪',
    email: 'mim.nusrat@yahoo.com',
    password: '123456',
    role: 'user',
    address: 'আগ্রাবাদ সি/এ',
    district: 'চট্টগ্রাম',
    joinedDate: '০২ নভেম্বর ২০২৪',
    status: 'active',
    totalEntriesCount: 2,
  },
  {
    id: 'usr-3',
    name: 'কামরুল ইসলাম',
    phone: '০১৯১৫-৫৫৪৪৩৩',
    email: 'kamrul.islam@gmail.com',
    password: '123456',
    role: 'user',
    address: 'উপশহর ব্লক-বি',
    district: 'রাজশাহী',
    joinedDate: '০৩ নভেম্বর ২০২৪',
    status: 'active',
    totalEntriesCount: 1,
  },
  {
    id: 'usr-pending-1',
    name: 'রাশেদুল হক',
    phone: '০১৭৫২-৯৯৮৮৭৭',
    email: 'rashedul.haque@gmail.com',
    password: '123456',
    role: 'user',
    address: 'মেডিক্যাল মোড়, বগুড়া',
    district: 'বগুড়া',
    joinedDate: 'আজকে (নতুন সাইন-আপ)',
    status: 'pending',
    totalEntriesCount: 0,
    balance: 0,
  }
];

export const initialAdminLogs: AdminActivityLog[] = [
  {
    id: 'log-1',
    action: 'সিস্টেম স্টার্টআপ',
    details: 'ওয়েবসাইট ইনিশিয়ালাইজড ও ৫০ টাকা মেগা কনটেস্ট সক্রিয় করা হয়েছে।',
    adminEmail: 'niazuddinmd1@gmail.com',
    timestamp: 'আজ সকাল ০৮:৩০',
  },
  {
    id: 'log-2',
    action: 'পেমেন্ট গেটওয়ে চেক',
    details: 'বিকাশ, নগদ, রকেট ও বাইন্যান্স মার্চেন্ট অ্যাকাউন্ট সংযোগ সক্রিয় ও যাচাইকৃত।',
    adminEmail: 'niazuddinmd1@gmail.com',
    timestamp: 'আজ সকাল ০৯:১৫',
  },
  {
    id: 'log-3',
    action: 'নোটিস আপডেট',
    details: 'অফিশিয়াল মেগা ড্র ও নিরাপত্তা সতর্কতা নোটিস প্রকাশিত হয়েছে।',
    adminEmail: 'niazuddinmd1@gmail.com',
    timestamp: 'আজ সকাল ১০:০০',
  }
];

export const initialDeposits: DepositRequest[] = [
  {
    id: 'dep-1',
    userId: 'usr-1',
    userName: 'তানজিমুল হাসান',
    userPhone: '০১৭০১-১২৩৪৫৬',
    gateway: 'bkash',
    senderAccount: '০১৭০১-১২৩৪৫৬',
    targetAccount: '01863440490',
    amount: 100,
    trxId: 'BK90184719',
    status: 'approved',
    timestamp: 'আজ দুপুর ১২:৩০',
    adminNote: 'ভেরিফায়েড ও ব্যালেন্স যুক্ত করা হয়েছে'
  },
  {
    id: 'dep-2',
    userId: 'usr-2',
    userName: 'নুসরাত জাহান মিম',
    userPhone: '০১৮১২-৯৮৭৬৫৪',
    gateway: 'nagad',
    senderAccount: '০১৮১২-৯৮৭৬৫৪',
    targetAccount: '01863440490',
    amount: 50,
    trxId: 'NG77192834',
    status: 'approved',
    timestamp: 'আজ দুপুর ০১:১৫',
    adminNote: 'স্বয়ংক্রিয় অনুমোদন'
  },
  {
    id: 'dep-3',
    userId: 'usr-3',
    userName: 'কামরুল ইসলাম',
    userPhone: '০১৯১৫-৫৫৪৪৩৩',
    gateway: 'binance',
    senderAccount: '82194819 (Binance Pay)',
    targetAccount: '89420184 (Binance Pay)',
    amount: 50,
    trxId: 'BINANCE-TX-998811',
    status: 'pending',
    timestamp: 'আজ দুপুর ০২:৪৫',
    adminNote: 'যাচাইকরণ প্রক্রিয়াধীন'
  }
];
