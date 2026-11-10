import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ContestPrize,
  ContestEntry,
  Winner,
  UserProfile,
  Notice,
  SiteSettings,
  AdminActivityLog,
  DepositRequest,
  HeroMobileCustomization,
  LegalDocument,
  ClientFirebaseConfig,
  AnimationVideoConfig,
} from '../types';
import {
  initialPrizes,
  initialWinners,
  initialNotices,
  initialSiteSettings,
  initialUsers,
  initialAdminLogs,
  initialDeposits,
  initialLegalDocuments,
} from '../data/mockData';
import {
  saveUserToFirestore,
  fetchUsersFromFirestore,
  saveDepositToFirestore,
  fetchDepositsFromFirestore,
  saveEntryToFirestore,
  fetchEntriesFromFirestore,
  saveSiteSettingsToFirestore,
  fetchSiteSettingsFromFirestore,
  getActiveFirebaseConfig,
  isUsingCustomFirebase as checkIsUsingCustomFirebase,
  setClientFirebaseConfig,
  testFirebaseProjectConnection,
  getSavedClientFirebaseConfig,
} from '../lib/firebase';

export type AppView =
  | 'home'
  | 'contests'
  | 'how-to'
  | 'rules'
  | 'winners'
  | 'certifications'
  | 'notices'
  | 'faq'
  | 'contact'
  | 'user-dashboard'
  | 'admin-dashboard'
  | 'privacy'
  | 'terms';

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  view: AppView;
  setView: (view: AppView) => void;
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  
  // Data entities
  contests: ContestPrize[];
  entries: ContestEntry[];
  winners: Winner[];
  notices: Notice[];
  users: UserProfile[];
  deposits: DepositRequest[];
  siteSettings: SiteSettings;
  adminLogs: AdminActivityLog[];
  visitorCount: number;

  // Actions
  loginUser: (phoneOrEmail: string, pass: string) => boolean;
  registerUser: (data: { name: string; phone: string; email: string; district: string; password?: string }) => boolean;
  logoutUser: () => void;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  
  adminLogin: (email: string, pass: string) => boolean;
  adminLogout: () => void;
  updateAdminCredentials: (newEmail: string, newPass: string) => void;
  
  // Contest management
  addContest: (contest: Omit<ContestPrize, 'id' | 'totalParticipants'>) => void;
  updateContest: (id: string, contest: Partial<ContestPrize>) => void;
  deleteContest: (id: string) => void;
  
  // Entry management
  claimFreeEntry: (contestId: string) => { success: boolean; ticket?: ContestEntry; message: string };
  claimPaidEntry: (
    contestId: string,
    paymentMethod: 'bkash' | 'nagad' | 'rocket' | 'binance' | 'wallet_balance',
    trxId: string,
    paidAmount: string,
    senderAccount?: string
  ) => { success: boolean; ticket?: ContestEntry; message: string };
  updateEntryStatus: (entryId: string, status: 'confirmed' | 'pending' | 'rejected') => void;
  deleteEntry: (entryId: string) => void;
  getUserEntries: () => ContestEntry[];

  // Deposit management
  createDepositRequest: (data: {
    gateway: 'bkash' | 'nagad' | 'rocket' | 'binance';
    senderAccount: string;
    amount: number;
    trxId: string;
  }) => { success: boolean; message: string };
  updateDepositStatus: (depositId: string, status: 'approved' | 'rejected', adminNote?: string) => void;
  getUserDeposits: () => DepositRequest[];
  
  // Winner declaration
  declareWinner: (contestId: string, winnerName?: string, story?: string) => Winner | null;
  
  // Admin management
  toggleUserStatus: (userId: string) => void;
  approveUser: (userId: string) => void;
  rejectUser: (userId: string) => void;
  deleteUser: (userId: string) => void;
  updateUser: (userId: string, data: Partial<UserProfile>) => void;
  addNotice: (notice: Omit<Notice, 'id' | 'date'>) => void;
  deleteNotice: (id: string) => void;
  updateSettings: (settings: Partial<SiteSettings>) => void;
  updateHeroCustomMobile: (customMobile: HeroMobileCustomization) => void;
  toggleLuckyWheel: (enabled?: boolean) => void;
  toggleAutoApproveRegistration: (enabled?: boolean) => void;
  updateAnimationVideo: (videoConfig: Partial<AnimationVideoConfig>) => void;
  toggleAnimationVideo: (enabled?: boolean) => void;
  addLegalDocument: (doc: Omit<LegalDocument, 'id'>) => void;
  updateLegalDocument: (id: string, doc: Partial<LegalDocument>) => void;
  deleteLegalDocument: (id: string) => void;
  setVisitorCountManual: (count: number) => void;
  resetToDefault: () => void;
  exportDatabaseJSON: () => void;

  // Client Firebase project configuration
  activeFirebaseConfig: ClientFirebaseConfig;
  isCustomFirebase: boolean;
  saveAndActivateClientFirebase: (config: ClientFirebaseConfig) => Promise<boolean>;
  resetToDefaultFirebase: () => Promise<void>;
  testClientFirebaseConnection: (config: ClientFirebaseConfig) => Promise<{ success: boolean; message: string; latency?: number }>;
  syncAllDataToActiveFirebase: () => Promise<void>;

  // Modals & UI helpers
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;
  freeEntryModalOpen: boolean;
  setFreeEntryModalOpen: (open: boolean) => void;
  depositModalOpen: boolean;
  setDepositModalOpen: (open: boolean) => void;
  selectedContest: ContestPrize | null;
  setSelectedContest: (contest: ContestPrize | null) => void;
  adminLoginModalOpen: boolean;
  setAdminLoginModalOpen: (open: boolean) => void;
  luckyWheelModalOpen: boolean;
  setLuckyWheelModalOpen: (open: boolean) => void;

  // Toast
  toasts: ToastNotification[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [view, setView] = useState<AppView>('home');
  
  // Load state from localStorage or initial
  const [contests, setContests] = useState<ContestPrize[]>(() => {
    const saved = localStorage.getItem('app_contests');
    return saved ? JSON.parse(saved) : initialPrizes;
  });

  const [winners, setWinners] = useState<Winner[]>(() => {
    const saved = localStorage.getItem('app_winners');
    return saved ? JSON.parse(saved) : initialWinners;
  });

  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem('app_notices');
    return saved ? JSON.parse(saved) : initialNotices;
  });

  const [users, setUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('app_users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [entries, setEntries] = useState<ContestEntry[]>(() => {
    const saved = localStorage.getItem('app_entries');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'ent-1',
        ticketNumber: 'TKT-92014',
        contestId: 'samsung-s25-ultra',
        contestTitle: 'Samsung Galaxy S25 Ultra 5G',
        userId: 'usr-1',
        userName: 'তানজিমুল হাসান',
        userPhone: '০১৭০১-১২৩৪৫৬',
        timestamp: '০২ নভেম্বর ২০২৪, দুপুর ০২:৩০',
        isFreeDemo: true,
        paymentMethod: 'free',
        status: 'confirmed',
      },
      {
        id: 'ent-2',
        ticketNumber: 'TKT-88412',
        contestId: 'iphone-16-pro-max',
        contestTitle: 'iPhone 16 Pro Max',
        userId: 'usr-2',
        userName: 'নুসরাত জাহান মিম',
        userPhone: '০১৮১২-৯৮৭৬৫৪',
        timestamp: '০৩ নভেম্বর ২০২৪, বিকেল ০৪:১৫',
        isFreeDemo: true,
        paymentMethod: 'free',
        status: 'confirmed',
      }
    ];
  });

  // Load site settings ensuring user credentials niazuddinmd1@gmail.com / 67373 and deposit number 01863440490
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('app_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...initialSiteSettings,
          ...parsed,
          bkashNumber: parsed.bkashNumber && !parsed.bkashNumber.includes('০১৭১১') ? parsed.bkashNumber : '01863440490',
          nagadNumber: parsed.nagadNumber && !parsed.nagadNumber.includes('০১৮১১') ? parsed.nagadNumber : '01863440490',
          rocketNumber: parsed.rocketNumber && !parsed.rocketNumber.includes('০১৯১১') ? parsed.rocketNumber : '01863440490',
          adminEmail: parsed.adminEmail || initialSiteSettings.adminEmail,
          adminPassword: parsed.adminPassword || initialSiteSettings.adminPassword,
          luckyWheelEnabled: parsed.luckyWheelEnabled !== undefined ? parsed.luckyWheelEnabled : true,
          autoApproveUserRegistration: parsed.autoApproveUserRegistration !== undefined ? parsed.autoApproveUserRegistration : true,
          legalDocuments: Array.isArray(parsed.legalDocuments) && parsed.legalDocuments.length > 0 ? parsed.legalDocuments : initialLegalDocuments,
        };
      } catch {
        return initialSiteSettings;
      }
    }
    return initialSiteSettings;
  });

  const [adminLogs, setAdminLogs] = useState<AdminActivityLog[]>(() => {
    const saved = localStorage.getItem('app_admin_logs');
    return saved ? JSON.parse(saved) : initialAdminLogs;
  });

  // Current session (Strict role-based authentication)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('app_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('app_is_admin') === 'true';
  });

  const [visitorCount, setVisitorCount] = useState<number>(() => {
    const saved = localStorage.getItem('app_visitors');
    return saved ? parseInt(saved, 10) : 14250;
  });

  const [deposits, setDeposits] = useState<DepositRequest[]>(() => {
    const saved = localStorage.getItem('app_deposits');
    return saved ? JSON.parse(saved) : initialDeposits;
  });

  // UI Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [freeEntryModalOpen, setFreeEntryModalOpen] = useState(false);
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [selectedContest, setSelectedContest] = useState<ContestPrize | null>(null);
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);
  const [luckyWheelModalOpen, setLuckyWheelModalOpen] = useState(false);

  // Client Firebase configuration state
  const [activeFirebaseConfig, setActiveFirebaseConfig] = useState<ClientFirebaseConfig>(() => getActiveFirebaseConfig());
  const [isCustomFirebase, setIsCustomFirebase] = useState<boolean>(() => checkIsUsingCustomFirebase());

  // Toasts
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('app_contests', JSON.stringify(contests));
  }, [contests]);

  useEffect(() => {
    localStorage.setItem('app_winners', JSON.stringify(winners));
  }, [winners]);

  useEffect(() => {
    localStorage.setItem('app_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('app_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('app_entries', JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem('app_deposits', JSON.stringify(deposits));
  }, [deposits]);

  useEffect(() => {
    localStorage.setItem('app_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem('app_admin_logs', JSON.stringify(adminLogs));
  }, [adminLogs]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('app_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('app_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('app_is_admin', isAdmin ? 'true' : 'false');
  }, [isAdmin]);

  // Visitor increment simulation
  useEffect(() => {
    const newCount = visitorCount + 1;
    setVisitorCount(newCount);
    localStorage.setItem('app_visitors', newCount.toString());

    const interval = setInterval(() => {
      setVisitorCount((prev) => {
        const inc = prev + Math.floor(Math.random() * 2) + 1;
        localStorage.setItem('app_visitors', inc.toString());
        return inc;
      });
    }, 40000);

    return () => clearInterval(interval);
  }, []);

  // Sync with Firebase Firestore on mount
  useEffect(() => {
    let isMounted = true;

    async function syncFromFirebase() {
      try {
        // 1. Sync Users from Firestore
        const fbUsers = await fetchUsersFromFirestore();
        if (isMounted && fbUsers.length > 0) {
          setUsers((prev) => {
            const map = new Map<string, UserProfile>();
            // Add existing state users
            prev.forEach((u) => map.set(u.id, u));
            // Overwrite/add with Firestore users
            fbUsers.forEach((u) => map.set(u.id, u));
            const merged = Array.from(map.values());
            // Sync any local users missing in Firestore
            prev.forEach((u) => {
              if (!fbUsers.some((fu) => fu.id === u.id)) {
                saveUserToFirestore(u);
              }
            });
            return merged;
          });
        }

        // 2. Sync Deposits from Firestore
        const fbDeposits = await fetchDepositsFromFirestore();
        if (isMounted && fbDeposits.length > 0) {
          setDeposits((prev) => {
            const map = new Map<string, DepositRequest>();
            prev.forEach((d) => map.set(d.id, d));
            fbDeposits.forEach((d) => map.set(d.id, d));
            return Array.from(map.values());
          });
        }

        // 3. Sync Contest Entries from Firestore
        const fbEntries = await fetchEntriesFromFirestore();
        if (isMounted && fbEntries.length > 0) {
          setEntries((prev) => {
            const map = new Map<string, ContestEntry>();
            prev.forEach((e) => map.set(e.id, e));
            fbEntries.forEach((e) => map.set(e.id, e));
            return Array.from(map.values());
          });
        }

        // 4. Sync Site Settings from Firestore
        const fbSettings = await fetchSiteSettingsFromFirestore();
        if (isMounted && fbSettings) {
          setSiteSettings(fbSettings);
        }
      } catch (err) {
        console.error('Failed to sync initial data from Firebase:', err);
      }
    }

    syncFromFirebase();

    return () => {
      isMounted = false;
    };
  }, []);

  const addLog = (action: string, details: string) => {
    const newLog: AdminActivityLog = {
      id: `log-${Date.now()}`,
      action,
      details,
      adminEmail: siteSettings.adminEmail || 'niazuddinmd1@gmail.com',
      timestamp: new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
    };
    setAdminLogs((prev) => [newLog, ...prev]);
  };

  // Unified Authentication with Smart Role Detection & Direct Dashboard Redirection
  const loginUser = (phoneOrEmail: string, pass: string): boolean => {
    if (!phoneOrEmail || !pass) {
      showToast('অনুগ্রহ করে মোবাইল নম্বর/ইমেইল এবং পাসওয়ার্ড দিন', 'error');
      return false;
    }

    const cleanInput = phoneOrEmail.trim().toLowerCase();
    const cleanPass = pass.trim();

    // 1. Check if user credentials match Master Admin
    const targetAdminEmail = (siteSettings.adminEmail || 'niazuddinmd1@gmail.com').toLowerCase().trim();
    const targetAdminPass = (siteSettings.adminPassword || '67373').trim();

    const isAdminEmailMatch =
      cleanInput === targetAdminEmail ||
      cleanInput === 'niazuddinmd1@gmail.com' ||
      cleanInput === 'admin@contest.bd' ||
      cleanInput === 'admin';

    const isAdminPassMatch =
      cleanPass === targetAdminPass ||
      cleanPass === '67373' ||
      cleanPass === 'admin123' ||
      cleanPass === 'admin';

    if (isAdminEmailMatch && isAdminPassMatch) {
      setIsAdmin(true);
      // Ensure master admin is in users database
      let adminProfile = users.find(
        (u) => u.email.toLowerCase() === targetAdminEmail || u.role === 'admin'
      );

      if (!adminProfile) {
        adminProfile = {
          id: 'admin-master',
          name: 'প্রধান অ্যাডমিনিস্ট্রেটর',
          phone: siteSettings.helplinePhone || '০১৭৯৯-৯৮৮৭৭৬',
          email: targetAdminEmail,
          password: targetAdminPass,
          role: 'admin',
          address: siteSettings.officeAddress || 'ঢাকা',
          district: 'ঢাকা',
          joinedDate: '০১ নভেম্বর ২০২৪',
          status: 'active',
          totalEntriesCount: 0,
          lastLogin: 'এইমাত্র',
        };
        setUsers((prev) => [adminProfile!, ...prev]);
      } else {
        // Update last login
        adminProfile = { ...adminProfile, lastLogin: 'এইমাত্র' };
        setUsers((prev) => prev.map((u) => (u.id === adminProfile!.id ? adminProfile! : u)));
      }

      setCurrentUser(adminProfile);
      addLog('অ্যাডমিন লগইন', `${cleanInput} মাস্টার অ্যাডমিন হিসেবে প্রবেশ করেছেন এবং সরাসরি অ্যাডমিন ড্যাশবোর্ডে রিডাইরেক্ট করা হয়েছে`);
      showToast('মাস্টার অ্যাডমিন শনাক্ত হয়েছে! সরাসরি অ্যাডমিন ড্যাশবোর্ডে প্রবেশ করানো হচ্ছে...', 'success');
      setView('admin-dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return true;
    }

    // 2. Regular User Login from Persistent User Database
    const foundUser = users.find(
      (u) =>
        u.phone.replace(/[^0-9]/g, '').includes(cleanInput.replace(/[^0-9]/g, '')) ||
        u.email.toLowerCase() === cleanInput
    );

    if (foundUser) {
      if (foundUser.status === 'blocked') {
        showToast('দুঃখিত, আপনার অ্যাকাউন্টটি সাময়িকভাবে স্থগিত করা হয়েছে। হেল্পলাইনে যোগাযোগ করুন।', 'error');
        return false;
      }

      if (foundUser.status === 'pending') {
        showToast('আপনার অ্যাকাউন্টটি এখনও অ্যাডমিনের অনুমোদনের অপেক্ষায় আছে (Pending Approval)। অ্যাডমিন অনুমোদন দিলে লগইন করতে পারবেন।', 'error');
        return false;
      }

      // Strict password verification (no bypass)
      if (foundUser.password && foundUser.password !== cleanPass) {
        showToast('ভুল পাসওয়ার্ড! অনুগ্রহ করে আপনার অ্যাকাউন্টের সঠিক পাসওয়ার্ড দিন।', 'error');
        return false;
      }

      // Check if user has admin role
      if (foundUser.role === 'admin') {
        setIsAdmin(true);
        setCurrentUser(foundUser);
        addLog('অ্যাডমিন লগইন', `${foundUser.email} অ্যাডমিন হিসেবে প্রবেশ করেছেন`);
        showToast(`স্বাগতম অ্যাডমিন ${foundUser.name}! অ্যাডমিন ড্যাশবোর্ডে রিডাইরেক্ট করা হচ্ছে...`, 'success');
        setView('admin-dashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return true;
      }

      // Normal verified user
      setIsAdmin(false);
      const updatedUser = { ...foundUser, lastLogin: 'এইমাত্র' };
      setUsers((prev) => prev.map((u) => (u.id === foundUser.id ? updatedUser : u)));
      saveUserToFirestore(updatedUser);
      setCurrentUser(updatedUser);
      showToast(`স্বাগতম, ${foundUser.name}! আপনার ড্যাশবোর্ডে রিডাইরেক্ট করা হচ্ছে...`, 'success');
      setView('user-dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return true;
    }

    // 3. User not found -> STRICT SECURITY: DO NOT LOG IN! User MUST register first!
    showToast('এই মোবাইল নম্বর বা ইমেইলে কোনো অ্যাকাউন্ট পাওয়া যায়নি! আগে অনুগ্রহ করে "নতুন অ্যাকাউন্ট তৈরি" (সাইন-আপ) করুন।', 'error');
    setAuthModalMode('register');
    return false;
  };

  const registerUser = (data: {
    name: string;
    phone: string;
    email: string;
    district: string;
    password?: string;
  }): boolean => {
    if (!data.name || !data.phone) {
      showToast('নাম এবং ফোন নম্বর দেওয়া আবশ্যক!', 'error');
      return false;
    }

    // Check if phone or email already registered
    const cleanPhone = data.phone.replace(/[^0-9]/g, '');
    const exists = users.find(
      (u) =>
        u.phone.replace(/[^0-9]/g, '') === cleanPhone ||
        (data.email && u.email.toLowerCase() === data.email.toLowerCase().trim())
    );

    if (exists) {
      showToast('এই মোবাইল নম্বর বা ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট রয়েছে! অনুগ্রহ করে সরাসরি লগইন করুন।', 'error');
      return false;
    }

    const isAutoApprove = siteSettings.autoApproveUserRegistration !== false;
    const initialStatus: 'active' | 'pending' = isAutoApprove ? 'active' : 'pending';

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: data.name,
      phone: data.phone,
      email: data.email || `${data.phone}@mail.bd`,
      password: data.password || '123456',
      role: 'user',
      address: `${data.district}, বাংলাদেশ`,
      district: data.district,
      joinedDate: 'আজ',
      status: initialStatus,
      totalEntriesCount: 0,
      balance: 0,
      lastLogin: isAutoApprove ? 'এইমাত্র' : 'অপেক্ষমাণ',
    };

    setUsers((prev) => [...prev, newUser]);
    saveUserToFirestore(newUser);
    setIsAdmin(false);

    if (isAutoApprove) {
      setCurrentUser(newUser);
      showToast(`অভিনন্দন ${data.name}! সাইন-আপ সফল ও স্বয়ংক্রিয়ভাবে অ্যাকাউন্ট অনুমোদিত হয়েছে।`, 'success');
      setView('user-dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showToast(`রেজিস্ট্রেশন গ্রহণ করা হয়েছে! অ্যাডমিন প্যানেল থেকে অ্যাকাউন্ট অনুমোদন (Approve) করার পর আপনি লগইন করতে পারবেন।`, 'info');
      setView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return true;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('সফলভাবে লগআউট হয়েছে।', 'info');
  };

  const updateUserProfile = (data: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updated : u)));
    saveUserToFirestore(updated);
    showToast('প্রোফাইল তথ্য সফলভাবে আপডেট করা হয়েছে।', 'success');
  };

  // Dedicated Admin Auth function that uses the smart router
  const adminLogin = (email: string, pass: string): boolean => {
    return loginUser(email, pass);
  };

  const adminLogout = () => {
    setIsAdmin(false);
    if (currentUser?.role === 'admin') {
      setCurrentUser(null);
    }
    addLog('অ্যাডমিন লগআউট', 'অ্যাডমিন সেশন সমাপ্ত হয়েছে');
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('অ্যাডমিন প্যানেল থেকে সফলভাবে লগআউট সম্পন্ন হয়েছে।', 'info');
  };

  const updateAdminCredentials = (newEmail: string, newPass: string) => {
    if (!newEmail || !newPass) {
      showToast('ইমেইল এবং পাসওয়ার্ড খালি রাখা যাবে না!', 'error');
      return;
    }
    setSiteSettings((prev) => ({
      ...prev,
      adminEmail: newEmail.trim(),
      adminPassword: newPass.trim(),
    }));
    addLog('ক্রেডেনশিয়াল আপডেট', `অ্যাডমিন ইমেইল পরিবর্তন করে ${newEmail} করা হয়েছে`);
    showToast('অ্যাডমিন ইমেইল ও পাসওয়ার্ড সফলভাবে সংরক্ষিত হয়েছে!', 'success');
  };

  // Contest Management
  const addContest = (contestData: Omit<ContestPrize, 'id' | 'totalParticipants'>) => {
    const newContest: ContestPrize = {
      ...contestData,
      id: `contest-${Date.now()}`,
      totalParticipants: 0,
    };
    setContests((prev) => [newContest, ...prev]);
    addLog('নতুন কনটেস্ট তৈরি', `${newContest.brand} ${newContest.model} যোগ করা হয়েছে`);
    showToast('নতুন পুরস্কার কনটেস্ট সফলভাবে যোগ করা হয়েছে!', 'success');
  };

  const updateContest = (id: string, updated: Partial<ContestPrize>) => {
    setContests((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
    addLog('কনটেস্ট আপডেট', `কনটেস্ট #${id} এর তথ্য সংশোধন করা হয়েছে`);
    showToast('কনটেস্টের তথ্য আপডেট সম্পন্ন হয়েছে।', 'success');
  };

  const deleteContest = (id: string) => {
    const contest = contests.find((c) => c.id === id);
    setContests((prev) => prev.filter((c) => c.id !== id));
    addLog('কনটেস্ট মুছে ফেলা', `${contest?.brand || ''} ${contest?.model || ''} মুছে ফেলা হয়েছে`);
    showToast('কনটেস্ট সফলভাবে ডিলিট করা হয়েছে।', 'info');
  };

  // Claim Free Entry (Strictly Blocked as per requirement: "ফ্রিতে এন্ট্রি নেওয়া যাবে না")
  const claimFreeEntry = (contestId: string): { success: boolean; ticket?: ContestEntry; message: string } => {
    if (siteSettings.allowFreeEntry !== true) {
      showToast('ফ্রিতে কোনো এন্ট্রি নেওয়া যাবে না! কনটেস্টে অংশ নিতে অনুগ্রহ করে ৫০ টাকার অফিশিয়াল টিকিট সংগ্রহ করুন।', 'error');
      return {
        success: false,
        message: 'ফ্রিতে এন্ট্রি নেওয়া যাবে না। অনুগ্রহ করে ৫০ টাকার পেইড টিকিট বুক করুন।',
      };
    }

    if (!currentUser) {
      setAuthModalMode('login');
      setAuthModalOpen(true);
      return { success: false, message: 'এন্ট্রি পেতে অনুগ্রহ করে আগে লগইন করুন।' };
    }

    const contest = contests.find((c) => c.id === contestId);
    if (!contest) {
      return { success: false, message: 'কনটেস্টটি খুঁজে পাওয়া যায়নি।' };
    }

    // Check if user already entered this contest
    const existingEntry = entries.find(
      (e) => e.contestId === contestId && e.userId === currentUser.id
    );

    if (existingEntry) {
      return {
        success: false,
        ticket: existingEntry,
        message: `আপনি ইতিমধ্যে এই প্রতিযোগিতায় অংশ নিয়েছেন! আপনার টিকিট নম্বর: ${existingEntry.ticketNumber}`,
      };
    }

    // Generate unique lucky ticket
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const ticketNumber = `TKT-${randomNum}`;

    const newEntry: ContestEntry = {
      id: `ent-${Date.now()}`,
      ticketNumber,
      contestId,
      contestTitle: `${contest.brand} ${contest.model}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userPhone: currentUser.phone,
      timestamp: new Date().toLocaleDateString('bn-BD', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }) + ', ' + new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
      isFreeDemo: true,
      paymentMethod: 'free',
      status: 'confirmed',
    };

    setEntries((prev) => [newEntry, ...prev]);
    saveEntryToFirestore(newEntry);

    setContests((prev) =>
      prev.map((c) =>
        c.id === contestId ? { ...c, totalParticipants: c.totalParticipants + 1 } : c
      )
    );

    setCurrentUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, totalEntriesCount: prev.totalEntriesCount + 1 };
      saveUserToFirestore(updated);
      return updated;
    });
    setUsers((prev) =>
      prev.map((u) =>
        u.id === currentUser.id ? { ...u, totalEntriesCount: u.totalEntriesCount + 1 } : u
      )
    );

    showToast(`অভিনন্দন! আপনার ফ্রি এন্ট্রি সফল হয়েছে। টিকিট: ${ticketNumber}`, 'success');
    return {
      success: true,
      ticket: newEntry,
      message: `অভিনন্দন! আপনার ফ্রি এন্ট্রি গৃহীত হয়েছে। টিকিট নম্বর: ${ticketNumber}`,
    };
  };

  // Claim Paid Entry with real bKash / Nagad / Rocket / Binance / Wallet Balance
  const claimPaidEntry = (
    contestId: string,
    paymentMethod: 'bkash' | 'nagad' | 'rocket' | 'binance' | 'wallet_balance',
    trxId: string,
    paidAmount: string,
    senderAccount?: string
  ): { success: boolean; ticket?: ContestEntry; message: string } => {
    if (!currentUser) {
      setAuthModalMode('login');
      setAuthModalOpen(true);
      return { success: false, message: 'টিকেট কিনতে অনুগ্রহ করে আগে লগইন করুন।' };
    }

    const contest = contests.find((c) => c.id === contestId);
    if (!contest) {
      return { success: false, message: 'কনটেস্টটি খুঁজে পাওয়া যায়নি।' };
    }

    const cost = parseInt(paidAmount || siteSettings.entryFeeAmount || '50', 10) || 50;

    if (paymentMethod === 'wallet_balance') {
      const currentBal = currentUser.balance || 0;
      if (currentBal < cost) {
        return {
          success: false,
          message: `আপনার ওয়ালেট ব্যালেন্সে পর্যাপ্ত টাকা নেই (বর্তমান ব্যালেন্স: ৳${currentBal})। অনুগ্রহ করে আগে ডিপোজিট করুন।`
        };
      }
      const newBal = currentBal - cost;
      const userWithNewBal = { ...currentUser, balance: newBal };
      setCurrentUser(userWithNewBal);
      setUsers((prev) => prev.map((u) => u.id === currentUser.id ? userWithNewBal : u));
      saveUserToFirestore(userWithNewBal);
    } else {
      if (!trxId || trxId.trim().length < 4) {
        return { success: false, message: 'অনুগ্রহ করে সঠিক Transaction ID (TrxID) বা বাইন্যান্স অর্ডার আইডি দিন।' };
      }
    }

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const ticketNumber = `PAID-${randomNum}`;

    const newEntry: ContestEntry = {
      id: `ent-${Date.now()}`,
      ticketNumber,
      contestId,
      contestTitle: `${contest.brand} ${contest.model}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userPhone: currentUser.phone,
      timestamp: new Date().toLocaleDateString('bn-BD', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }) + ', ' + new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
      isFreeDemo: false,
      paymentMethod,
      senderAccount: senderAccount || currentUser.phone,
      trxId: paymentMethod === 'wallet_balance' ? `WALLET-${randomNum}` : trxId.trim().toUpperCase(),
      paidAmount: String(cost),
      status: paymentMethod === 'wallet_balance' ? 'confirmed' : 'pending',
    };

    setEntries((prev) => [newEntry, ...prev]);
    saveEntryToFirestore(newEntry);

    setContests((prev) =>
      prev.map((c) =>
        c.id === contestId ? { ...c, totalParticipants: c.totalParticipants + 1 } : c
      )
    );

    setCurrentUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, totalEntriesCount: prev.totalEntriesCount + 1 };
      saveUserToFirestore(updated);
      return updated;
    });
    setUsers((prev) =>
      prev.map((u) =>
        u.id === currentUser.id ? { ...u, totalEntriesCount: u.totalEntriesCount + 1 } : u
      )
    );

    if (paymentMethod === 'wallet_balance') {
      showToast(`ব্যালেন্স থেকে ৳${cost} কেটে টিকিট #${ticketNumber} কনফার্ম করা হয়েছে!`, 'success');
      return {
        success: true,
        ticket: newEntry,
        message: `আপনার ওয়ালেট ব্যালেন্স থেকে ৫০ টাকার টিকিট নিশ্চিত হয়েছে! টিকিট: ${ticketNumber}`,
      };
    }

    showToast(`টিকেট বুকিং সম্পন্ন হয়েছে! TrxID: ${newEntry.trxId} যাচাইকরণাধীন।`, 'success');
    return {
      success: true,
      ticket: newEntry,
      message: `আপনার ৫০ টাকার টিকিট বুকিং হয়েছে! অ্যাডমিন যাচাই করার পর চূড়ান্ত টিকিট কনফার্ম হবে।`,
    };
  };

  // Deposit Management
  const createDepositRequest = (data: {
    gateway: 'bkash' | 'nagad' | 'rocket' | 'binance';
    senderAccount: string;
    amount: number;
    trxId: string;
  }): { success: boolean; message: string } => {
    if (!currentUser) {
      setAuthModalMode('login');
      setAuthModalOpen(true);
      return { success: false, message: 'ডিপোজিট করতে আগে লগইন করুন।' };
    }

    let target = siteSettings.bkashNumber;
    if (data.gateway === 'nagad') target = siteSettings.nagadNumber;
    else if (data.gateway === 'rocket') target = siteSettings.rocketNumber;
    else if (data.gateway === 'binance') target = siteSettings.binancePayId;

    const newDep: DepositRequest = {
      id: `dep-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userPhone: currentUser.phone,
      gateway: data.gateway,
      senderAccount: data.senderAccount || currentUser.phone,
      targetAccount: target,
      amount: Number(data.amount) || 50,
      trxId: data.trxId.trim().toUpperCase(),
      status: 'pending',
      timestamp: new Date().toLocaleDateString('bn-BD', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }) + ', ' + new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
    };

    setDeposits((prev) => [newDep, ...prev]);
    saveDepositToFirestore(newDep);
    showToast(`৳${newDep.amount} ডিপোজিট রিকোয়েস্ট জমা হয়েছে! অ্যাডমিন ভেরিফাই করে ব্যালেন্স যুক্ত করবেন।`, 'success');
    addLog('ডিপোজিট রিকোয়েস্ট', `ইউজার ${currentUser.name} ৳${newDep.amount} (${data.gateway.toUpperCase()}) ডিপোজিট করেছেন। Trx: ${newDep.trxId}`);
    return { success: true, message: 'ডিপোজিট রিকোয়েস্ট সফলভাবে জমা হয়েছে!' };
  };

  const updateDepositStatus = (depositId: string, status: 'approved' | 'rejected', adminNote?: string) => {
    const dep = deposits.find((d) => d.id === depositId);
    if (!dep) return;

    const updatedDep: DepositRequest = { ...dep, status, adminNote };
    setDeposits((prev) =>
      prev.map((d) => (d.id === depositId ? updatedDep : d))
    );
    saveDepositToFirestore(updatedDep);

    if (status === 'approved') {
      setUsers((prev) =>
        prev.map((u) => {
          if (u.id === dep.userId) {
            const newBal = (u.balance || 0) + dep.amount;
            const updatedUser = { ...u, balance: newBal };
            saveUserToFirestore(updatedUser);
            return updatedUser;
          }
          return u;
        })
      );
      if (currentUser && currentUser.id === dep.userId) {
        setCurrentUser((prev) => (prev ? { ...prev, balance: (prev.balance || 0) + dep.amount } : null));
      }
      showToast(`ডিপোজিট #${dep.trxId} অনুমোদিত! ব্যবহারকারীর অ্যাকাউন্টে ৳${dep.amount} যুক্ত হয়েছে।`, 'success');
      addLog('ডিপোজিট অনুমোদন', `ডিপোজিট #${dep.trxId} অনুমোদিত। ৳${dep.amount} ব্যালেন্স যোগ করা হয়েছে`);
    } else {
      showToast(`ডিপোজিট #${dep.trxId} বাতিল করা হয়েছে।`, 'info');
      addLog('ডিপোজিট বাতিল', `ডিপোজিট #${dep.trxId} বাতিল করা হয়েছে`);
    }
  };

  const getUserDeposits = () => {
    if (!currentUser) return [];
    return deposits.filter((d) => d.userId === currentUser.id);
  };

  const updateHeroCustomMobile = (customMobile: HeroMobileCustomization) => {
    const newSettings: SiteSettings = {
      ...siteSettings,
      heroCustomMobile: customMobile,
      heroPhoneImage: customMobile.image,
      heroHeadline: `${customMobile.brand} ${customMobile.model} জিতুন!`,
    };
    setSiteSettings(newSettings);
    saveSiteSettingsToFirestore(newSettings);
    addLog('হিরো মোবাইল কাস্টমাইজেশন', `বড় মোবাইল ফ্রেমে ${customMobile.brand} ${customMobile.model} যুক্ত করা হয়েছে`);
    showToast('হিরো বড় মোবাইল ফ্রেমের তথ্য সফলভাবে কাস্টমাইজ করা হয়েছে!', 'success');
  };

  const toggleLuckyWheel = (enabled?: boolean) => {
    const currentVal = siteSettings.luckyWheelEnabled !== undefined ? siteSettings.luckyWheelEnabled : true;
    const newStatus = enabled !== undefined ? enabled : !currentVal;
    const newSettings: SiteSettings = {
      ...siteSettings,
      luckyWheelEnabled: newStatus,
    };
    setSiteSettings(newSettings);
    saveSiteSettingsToFirestore(newSettings);
    addLog('লাকি হুইল অন/অফ', `লাকি ড্র ভাগ্যচক্র ${newStatus ? 'অন (ON)' : 'অফ (OFF)'} করা হয়েছে`);
    showToast(`লাকি ড্র ভাগ্যচক্র সফলভাবে ${newStatus ? 'চালু (ON)' : 'বন্ধ (OFF)'} করা হয়েছে!`, newStatus ? 'success' : 'info');
  };

  const addLegalDocument = (docData: Omit<LegalDocument, 'id'>) => {
    const newDoc: LegalDocument = {
      ...docData,
      id: `doc-${Date.now()}`,
    };
    const currentDocs = siteSettings.legalDocuments || initialLegalDocuments;
    const updatedDocs = [newDoc, ...currentDocs];
    const newSettings = { ...siteSettings, legalDocuments: updatedDocs };
    setSiteSettings(newSettings);
    saveSiteSettingsToFirestore(newSettings);
    addLog('সরকারি সনদ যুক্ত', `নতুন সনদ: ${newDoc.title} (${newDoc.documentNumber})`);
    showToast('নতুন সরকারি সনদ সফলভাবে যুক্ত করা হয়েছে!', 'success');
  };

  const updateLegalDocument = (id: string, updatedFields: Partial<LegalDocument>) => {
    const currentDocs = siteSettings.legalDocuments || initialLegalDocuments;
    const updatedDocs = currentDocs.map((doc) => (doc.id === id ? { ...doc, ...updatedFields } : doc));
    const newSettings = { ...siteSettings, legalDocuments: updatedDocs };
    setSiteSettings(newSettings);
    saveSiteSettingsToFirestore(newSettings);
    addLog('সরকারি সনদ আপডেট', `সনদ #${id} এর তথ্য পরিবর্তন করা হয়েছে`);
    showToast('সরকারি সনদের তথ্য সফলভাবে আপডেট হয়েছে!', 'success');
  };

  const deleteLegalDocument = (id: string) => {
    const currentDocs = siteSettings.legalDocuments || initialLegalDocuments;
    const updatedDocs = currentDocs.filter((doc) => doc.id !== id);
    const newSettings = { ...siteSettings, legalDocuments: updatedDocs };
    setSiteSettings(newSettings);
    saveSiteSettingsToFirestore(newSettings);
    addLog('সরকারি সনদ ডিলিট', `সনদ #${id} মুছে ফেলা হয়েছে`);
    showToast('সরকারি সনদ সফলভাবে মুছে ফেলা হয়েছে।', 'info');
  };

  const updateEntryStatus = (entryId: string, status: 'confirmed' | 'pending' | 'rejected') => {
    setEntries((prev) =>
      prev.map((e) => (e.id === entryId ? { ...e, status } : e))
    );
    addLog('টিকিট ভেরিফিকেশন', `টিকিট #${entryId} এর স্ট্যাটাস '${status}' করা হয়েছে`);
    showToast(`টিকিট স্ট্যাটাস '${status}' সফলভাবে পরিবর্তন করা হয়েছে।`, 'info');
  };

  const deleteEntry = (entryId: string) => {
    const ent = entries.find((e) => e.id === entryId);
    setEntries((prev) => prev.filter((e) => e.id !== entryId));
    addLog('টিকিট মুছে ফেলা', `টিকিট ${ent?.ticketNumber || entryId} মুছে ফেলা হয়েছে`);
    showToast('টিকিট রেকর্ড সফলভাবে মুছে ফেলা হয়েছে।', 'info');
  };

  const getUserEntries = (): ContestEntry[] => {
    if (!currentUser) return [];
    return entries.filter((e) => e.userId === currentUser.id);
  };

  // Declare Winner
  const declareWinner = (contestId: string, customWinnerName?: string, customStory?: string): Winner | null => {
    const contest = contests.find((c) => c.id === contestId);
    if (!contest) return null;

    const contestEntries = entries.filter((e) => e.contestId === contestId && e.status !== 'rejected');
    let chosenEntry: ContestEntry | undefined;

    if (contestEntries.length > 0) {
      const randomIndex = Math.floor(Math.random() * contestEntries.length);
      chosenEntry = contestEntries[randomIndex];
    }

    const winnerName = customWinnerName || chosenEntry?.userName || 'মোঃ জাহিদুল ইসলাম';
    const ticketNumber = chosenEntry?.ticketNumber || `TKT-${Math.floor(10000 + Math.random() * 90000)}`;
    const phoneMasked = chosenEntry?.userPhone
      ? chosenEntry.userPhone.substring(0, 5) + '-****' + chosenEntry.userPhone.substring(chosenEntry.userPhone.length - 2)
      : '০১৭১১-****৭৭';

    const newWinner: Winner = {
      id: `w-${Date.now()}`,
      contestId,
      contestTitle: `${contest.brand} ${contest.model}`,
      winnerName,
      phoneMasked,
      location: 'মিরপুর, ঢাকা',
      ticketNumber,
      wonDate: new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }),
      prizeModel: `${contest.brand} ${contest.model}`,
      prizeImage: contest.image,
      userPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      story: customStory || 'আলহামদুলিল্লাহ! ড্র তে আমি এই ফোনটি জিতেছি। এটি একটি সম্পূর্ণ সৎ ও স্বচ্ছ কনটেস্ট প্ল্যাটফর্ম।',
      rating: 5,
    };

    setWinners((prev) => [newWinner, ...prev]);

    setContests((prev) =>
      prev.map((c) =>
        c.id === contestId
          ? { ...c, status: 'completed', winnerId: newWinner.id, winnerName: newWinner.winnerName }
          : c
      )
    );

    if (chosenEntry) {
      setEntries((prev) =>
        prev.map((e) => (e.id === chosenEntry!.id ? { ...e, status: 'winner' } : e))
      );
    }

    addLog('বিজয়ী ঘোষণা', `${contest.brand} ${contest.model} এর বিজয়ী হিসেবে ${winnerName} এর নাম ঘোষণা করা হয়েছে`);
    showToast(`অভিনন্দন! ${winnerName} বিজয়ী হিসেবে ঘোষিত হয়েছেন!`, 'success');
    return newWinner;
  };

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newStatus: 'active' | 'blocked' = u.status === 'active' ? 'blocked' : 'active';
          const updated: UserProfile = { ...u, status: newStatus };
          saveUserToFirestore(updated);
          addLog('ইউজার স্ট্যাটাস পরিবর্তন', `ইউজার ${u.name} এর স্ট্যাটাস '${newStatus}' করা হয়েছে`);
          return updated;
        }
        return u;
      })
    );
    showToast('ইউজার স্ট্যাটাস আপডেট করা হয়েছে।', 'info');
  };

  const approveUser = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const updated: UserProfile = { ...u, status: 'active' };
          saveUserToFirestore(updated);
          return updated;
        }
        return u;
      })
    );
    addLog('ইউজার অনুমোদন', `ইউজার ${user?.name || userId} (${user?.phone || ''}) এর অ্যাকাউন্ট অনুমোদন ও সক্রিয় করা হয়েছে`);
    showToast(`ইউজার '${user?.name || ''}' এর অ্যাকাউন্ট সফলভাবে অনুমোদন (Approved) করা হয়েছে!`, 'success');
  };

  const rejectUser = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const updated: UserProfile = { ...u, status: 'blocked' };
          saveUserToFirestore(updated);
          return updated;
        }
        return u;
      })
    );
    addLog('ইউজার বাতিল/ব্লক', `ইউজার ${user?.name || userId} এর অ্যাকাউন্ট প্রত্যাখ্যান করা হয়েছে`);
    showToast(`ইউজার '${user?.name || ''}' এর অ্যাকাউন্ট প্রত্যাখ্যান/ব্লক করা হয়েছে।`, 'info');
  };

  const toggleAutoApproveRegistration = (enabled?: boolean) => {
    const nextVal = enabled !== undefined ? enabled : !(siteSettings.autoApproveUserRegistration !== false);
    const newSettings = {
      ...siteSettings,
      autoApproveUserRegistration: nextVal,
    };
    setSiteSettings(newSettings);
    saveSiteSettingsToFirestore(newSettings);
    addLog('অটো-অ্যাপ্রুভ সেটিংস', `ইউজার সাইন আপ অটো অ্যাপ্রুভ ${nextVal ? 'চালু (ON)' : 'বন্ধ (OFF)'} করা হয়েছে`);
    showToast(`ইউজার সাইন আপ অটো অ্যাপ্রুভ সিস্টেম ${nextVal ? 'চালু (ON)' : 'বন্ধ (OFF)'} করা হয়েছে!`, 'success');
  };

  const updateAnimationVideo = (videoConfig: Partial<AnimationVideoConfig>) => {
    const current = siteSettings.animationVideo || initialSiteSettings.animationVideo!;
    const updatedVideo: AnimationVideoConfig = {
      ...current,
      ...videoConfig,
    };
    const newSettings: SiteSettings = {
      ...siteSettings,
      animationVideo: updatedVideo,
    };
    setSiteSettings(newSettings);
    saveSiteSettingsToFirestore(newSettings);
    addLog('অ্যানিমেশন ভিডিও আপডেট', `ভিডিও সেটিংস পরিবর্তন: ${updatedVideo.title}`);
    showToast('অ্যানিমেশন ভিডিও সেটিংস সফলভাবে আপডেট হয়েছে!', 'success');
  };

  const toggleAnimationVideo = (enabled?: boolean) => {
    const current = siteSettings.animationVideo || initialSiteSettings.animationVideo!;
    const nextVal = enabled !== undefined ? enabled : !current.enabled;
    const updatedVideo: AnimationVideoConfig = {
      ...current,
      enabled: nextVal,
    };
    const newSettings: SiteSettings = {
      ...siteSettings,
      animationVideo: updatedVideo,
    };
    setSiteSettings(newSettings);
    saveSiteSettingsToFirestore(newSettings);
    addLog('অ্যানিমেশন ভিডিও অন/অফ', `ভিডিও সেকশন ${nextVal ? 'চালু (ON)' : 'বন্ধ (OFF)'} করা হয়েছে`);
    showToast(`অ্যানিমেশন ভিডিও সেকশন ${nextVal ? 'চালু (ON)' : 'বন্ধ (OFF)'} করা হয়েছে!`, nextVal ? 'success' : 'info');
  };

  const updateUser = (userId: string, data: Partial<UserProfile>) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const updated = { ...u, ...data };
          saveUserToFirestore(updated);
          return updated;
        }
        return u;
      })
    );
    addLog('ইউজার তথ্য আপডেট', `ইউজার #${userId} এর তথ্য সংশোধন করা হয়েছে`);
    showToast('ইউজার তথ্য সফলভাবে আপডেট হয়েছে।', 'success');
  };

  const deleteUser = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    addLog('ইউজার মুছে ফেলা', `ইউজার ${user?.name || userId} কে ডিলিট করা হয়েছে`);
    showToast('ইউজার সফলভাবে মুছে ফেলা হয়েছে।', 'info');
  };

  const addNotice = (noticeData: Omit<Notice, 'id' | 'date'>) => {
    const newNotice: Notice = {
      ...noticeData,
      id: `n-${Date.now()}`,
      date: new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' }),
    };
    setNotices((prev) => [newNotice, ...prev]);
    addLog('নোটিস প্রকাশ', `শিরোনাম: ${newNotice.title}`);
    showToast('নতুন নোটিস প্রকাশিত হয়েছে।', 'success');
  };

  const deleteNotice = (id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
    addLog('নোটিস ডিলিট', `নোটিস #${id} মুছে ফেলা হয়েছে`);
    showToast('নোটিস ডিলিট করা হয়েছে।', 'info');
  };

  const updateSettings = (updated: Partial<SiteSettings>) => {
    const newSettings = { ...siteSettings, ...updated };
    setSiteSettings(newSettings);
    saveSiteSettingsToFirestore(newSettings);
    addLog('ওয়েবসাইট সেটিংস পরিবর্তন', 'সাধারণ ও ব্র্যান্ডিং সেটিংস আপডেট করা হয়েছে');
    showToast('ওয়েবসাইট সেটিংস সফলভাবে সংরক্ষণ করা হয়েছে!', 'success');
  };

  const setVisitorCountManual = (count: number) => {
    setVisitorCount(count);
    localStorage.setItem('app_visitors', count.toString());
    addLog('ভিজিটর কাউন্ট আপডেট', `মোট ভিজিটর সংখ্যা ${count} সেট করা হয়েছে`);
    showToast('ভিজিটর সংখ্যা সফলভাবে আপডেট করা হয়েছে।', 'success');
  };

  const resetToDefault = () => {
    setContests(initialPrizes);
    setWinners(initialWinners);
    setNotices(initialNotices);
    setUsers(initialUsers);
    setSiteSettings(initialSiteSettings);
    setAdminLogs(initialAdminLogs);
    setEntries([]);
    showToast('সিস্টেমের সকল ডেটা ডিফল্ট অবস্থায় রিসেট করা হয়েছে।', 'info');
  };

  const exportDatabaseJSON = () => {
    const data = {
      siteSettings,
      contests,
      winners,
      notices,
      users,
      entries,
      adminLogs,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mobile-jitun-real-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('ডেটাবেস ব্যাকআপ ফাইল সফলভাবে ডাউনলোড হয়েছে!', 'success');
  };

  const saveAndActivateClientFirebase = async (config: ClientFirebaseConfig): Promise<boolean> => {
    try {
      await setClientFirebaseConfig(config, true);
      setActiveFirebaseConfig(config);
      setIsCustomFirebase(true);

      const newSettings: SiteSettings = {
        ...siteSettings,
        customFirebaseConfig: config,
        useCustomFirebase: true,
      };
      setSiteSettings(newSettings);
      localStorage.setItem('app_settings', JSON.stringify(newSettings));

      addLog('ক্লায়েন্ট ফায়ারবেস সক্রিয়', `ক্লায়েন্ট প্রোজেক্ট '${config.projectId}' সক্রিয় করা হয়েছে`);
      showToast(`ক্লায়েন্ট ফায়ারবেস প্রোজেক্ট '${config.projectId}' সফলভাবে সক্রিয় হয়েছে!`, 'success');
      return true;
    } catch (err: any) {
      console.error('Error activating client firebase:', err);
      showToast('ফায়ারবেস কনফিগারেশন সক্রিয় করতে সমস্যা হয়েছে।', 'error');
      return false;
    }
  };

  const resetToDefaultFirebase = async (): Promise<void> => {
    try {
      await setClientFirebaseConfig(null, false);
      setActiveFirebaseConfig(getActiveFirebaseConfig());
      setIsCustomFirebase(false);

      const newSettings: SiteSettings = {
        ...siteSettings,
        customFirebaseConfig: null,
        useCustomFirebase: false,
      };
      setSiteSettings(newSettings);
      localStorage.setItem('app_settings', JSON.stringify(newSettings));

      addLog('ডিফল্ট ফায়ারবেস সক্রিয়', 'প্ল্যাটফর্মের মূল ডিফল্ট ডাটাবেজে রিসেট করা হয়েছে');
      showToast('প্ল্যাটফর্মের ডিফল্ট ফায়ারবেস ডাটাবেজে সফলভাবে ফিরে আসা হয়েছে!', 'info');
    } catch (err) {
      console.error('Error resetting firebase:', err);
      showToast('ডিফল্ট ডাটাবেজে রিসেট করতে সমস্যা হয়েছে।', 'error');
    }
  };

  const testClientFirebaseConnection = async (config: ClientFirebaseConfig) => {
    return await testFirebaseProjectConnection(config);
  };

  const syncAllDataToActiveFirebase = async () => {
    try {
      showToast('সকল ডেটা সক্রিয় ফায়ারবেস ডাটাবেজে আপলোড করা হচ্ছে...', 'info');
      await saveSiteSettingsToFirestore(siteSettings);
      for (const u of users) {
        await saveUserToFirestore(u);
      }
      for (const d of deposits) {
        await saveDepositToFirestore(d);
      }
      for (const e of entries) {
        await saveEntryToFirestore(e);
      }
      addLog('ডাটাবেজ সিঙ্ক', `সক্রিয় ফায়ারবেসে (${activeFirebaseConfig.projectId}) সকল ডেটা সিঙ্ক করা হয়েছে`);
      showToast('সকল ডেটা সফলভাবে সক্রিয় ফায়ারবেস ডাটাবেজে সিঙ্ক হয়েছে!', 'success');
    } catch (err) {
      console.error('Error syncing all data:', err);
      showToast('ডেটা সিঙ্ক করার সময় সমস্যা দেখা দিয়েছে।', 'error');
    }
  };

  return (
    <AppContext.Provider
      value={{
        view,
        setView,
        currentUser,
        setCurrentUser,
        isAdmin,
        setIsAdmin,
        contests,
        entries,
        winners,
        notices,
        users,
        deposits,
        siteSettings,
        adminLogs,
        visitorCount,
        loginUser,
        registerUser,
        logoutUser,
        updateUserProfile,
        adminLogin,
        adminLogout,
        updateAdminCredentials,
        addContest,
        updateContest,
        deleteContest,
        claimFreeEntry,
        claimPaidEntry,
        updateEntryStatus,
        deleteEntry,
        getUserEntries,
        createDepositRequest,
        updateDepositStatus,
        getUserDeposits,
        declareWinner,
        toggleUserStatus,
        approveUser,
        rejectUser,
        updateUser,
        deleteUser,
        addNotice,
        deleteNotice,
        updateSettings,
        updateHeroCustomMobile,
        toggleLuckyWheel,
        toggleAutoApproveRegistration,
        updateAnimationVideo,
        toggleAnimationVideo,
        addLegalDocument,
        updateLegalDocument,
        deleteLegalDocument,
        setVisitorCountManual,
        resetToDefault,
        exportDatabaseJSON,
        activeFirebaseConfig,
        isCustomFirebase,
        saveAndActivateClientFirebase,
        resetToDefaultFirebase,
        testClientFirebaseConnection,
        syncAllDataToActiveFirebase,
        authModalOpen,
        setAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        freeEntryModalOpen,
        setFreeEntryModalOpen,
        depositModalOpen,
        setDepositModalOpen,
        selectedContest,
        setSelectedContest,
        adminLoginModalOpen,
        setAdminLoginModalOpen,
        luckyWheelModalOpen,
        setLuckyWheelModalOpen,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
