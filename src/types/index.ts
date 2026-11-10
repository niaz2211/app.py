export interface ContestPrize {
  id: string;
  brand: string;
  model: string;
  marketPrice: string; // e.g., "১,৭৫,০০০ টাকা"
  entryFee: string; // e.g., "৫০ টাকা"
  image: string;
  endDate: string; // ISO date string or timestamp
  totalParticipants: number;
  maxEntries?: number;
  status: 'active' | 'upcoming' | 'completed';
  featured: boolean;
  specs: {
    display: string;
    ramRom: string;
    camera: string;
    battery: string;
    processor: string;
  };
  winnerId?: string;
  winnerName?: string;
}

export interface ContestEntry {
  id: string;
  ticketNumber: string;
  contestId: string;
  contestTitle: string;
  userId: string;
  userName: string;
  userPhone: string;
  timestamp: string;
  isFreeDemo: boolean;
  paymentMethod?: 'free' | 'bkash' | 'nagad' | 'rocket' | 'binance' | 'wallet_balance';
  senderAccount?: string;
  trxId?: string;
  paidAmount?: string;
  status: 'confirmed' | 'pending' | 'winner' | 'rejected';
}

export interface DepositRequest {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  gateway: 'bkash' | 'nagad' | 'rocket' | 'binance';
  senderAccount: string; // sender phone or Binance Pay ID
  targetAccount: string; // platform receiving phone or Binance ID
  amount: number; // e.g. 50, 100, 200, 500
  trxId: string; // Transaction ID or Hash
  status: 'pending' | 'approved' | 'rejected';
  timestamp: string;
  adminNote?: string;
}

export interface Winner {
  id: string;
  contestId: string;
  contestTitle: string;
  winnerName: string;
  phoneMasked: string;
  location: string;
  ticketNumber: string;
  wonDate: string;
  prizeModel: string;
  prizeImage: string;
  userPhoto: string;
  story: string;
  rating: number;
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  password?: string;
  role: 'admin' | 'user';
  address: string;
  district: string;
  joinedDate: string;
  status: 'active' | 'blocked' | 'pending';
  totalEntriesCount: number;
  balance?: number; // Account balance in Taka
  lastLogin?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'info' | 'urgent' | 'announcement';
  active: boolean;
}

export interface AdminActivityLog {
  id: string;
  action: string;
  details: string;
  adminEmail: string;
  timestamp: string;
  ipMasked?: string;
}

export interface HeroMobileCustomization {
  brand: string;
  model: string;
  marketPrice: string;
  entryFee: string;
  image: string;
  badge: string; // e.g. "🏆 গ্র্যান্ড প্রাইজ" or "🔥 মেগা ড্র" or "📱 বাজেট মোবাইল"
  display: string;
  camera: string;
  ramRom: string;
  battery: string;
  processor: string;
  totalParticipants?: number;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroPhoneImage: string;
  helplinePhone: string;
  supportEmail: string;
  officeAddress: string;
  isPaidEnabled: boolean;
  entryFeeAmount: string; // e.g. "৫০"
  bkashNumber: string;
  nagadNumber: string;
  rocketNumber: string;
  binancePayId: string;
  binanceUsdtAddress: string;
  heroCustomMobile?: HeroMobileCustomization;
  legalNoticeBanner: string;
  marqueeNotice: string;
  facebookUrl: string;
  youtubeUrl: string;
  adminEmail: string;
  adminPassword: string;
  // Countdown Timer Customization
  countdownDays?: number;
  countdownHours?: number;
  countdownMinutes?: number;
  countdownSeconds?: number;
  countdownTargetDate?: string;
  countdownTitle?: string;
  // Lucky Wheel Toggle
  luckyWheelEnabled?: boolean;
  // Government Legal Documents
  legalDocuments?: LegalDocument[];
  // Client Custom Firebase Project Configuration
  customFirebaseConfig?: ClientFirebaseConfig | null;
  useCustomFirebase?: boolean;
  // Auto Approve User Sign-up Toggle
  autoApproveUserRegistration?: boolean;
  // Free Entry Policy (false means no free entries allowed, all must be paid)
  allowFreeEntry?: boolean;
  // Customizable Animation Video
  animationVideo?: AnimationVideoConfig;
}

export interface AnimationVideoConfig {
  enabled: boolean;
  title: string;
  subtitle: string;
  badge: string;
  videoUrl: string;
  posterUrl?: string;
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
}

export interface ClientFirebaseConfig {
  projectId: string;
  apiKey: string;
  authDomain: string;
  appId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  firestoreDatabaseId?: string;
  measurementId?: string;
  connectedAt?: string;
}

export interface LegalDocument {
  id: string;
  title: string;
  documentType: 'trade_license' | 'tin' | 'bin_vat' | 'rjsc' | 'other';
  documentNumber: string;
  issuingAuthority: string;
  issueDate: string;
  expiryDate?: string;
  verified: boolean;
  fileUrl: string;
  description: string;
}
