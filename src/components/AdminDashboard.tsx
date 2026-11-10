import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  Users,
  Eye,
  Trophy,
  Ticket,
  Smartphone,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  XCircle,
  FileDown,
  RefreshCw,
  Search,
  Bell,
  Settings,
  Activity,
  LogOut,
  Sparkles,
  AlertTriangle,
  Lock,
  DollarSign,
  CreditCard,
  KeyRound,
  Check,
  X,
  Play,
  RotateCw,
  Clock,
  Power,
  ShieldCheck,
  FileCheck2,
  Award,
  Database,
  Flame,
  Server,
  HelpCircle,
  ExternalLink,
  Video,
} from 'lucide-react';
import { ContestPrize, Notice, UserProfile, LegalDocument, ClientFirebaseConfig, AnimationVideoConfig } from '../types';
import { initialLegalDocuments } from '../data/mockData';
import confetti from 'canvas-confetti';
import { LuckyWheel, WheelCandidate } from './LuckyWheel';

export const AdminDashboard: React.FC = () => {
  const {
    isAdmin,
    currentUser,
    setView,
    setAdminLoginModalOpen,
    adminLogout,
    visitorCount,
    users,
    contests,
    entries,
    deposits,
    winners,
    notices,
    adminLogs,
    siteSettings,
    addContest,
    updateContest,
    deleteContest,
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
    updateEntryStatus,
    deleteEntry,
    updateDepositStatus,
    updateAdminCredentials,
    registerUser,
    resetToDefault,
    exportDatabaseJSON,
    showToast,
    activeFirebaseConfig,
    isCustomFirebase,
    saveAndActivateClientFirebase,
    resetToDefaultFirebase,
    testClientFirebaseConnection,
    syncAllDataToActiveFirebase,
  } = useApp();

  // Strict Authentication & Role-Based Access Control (RBAC) Check
  // Only users who have the 'admin' role AND isAdmin flag are granted access
  const isAuthorizedAdmin = Boolean(isAdmin && currentUser && currentUser.role === 'admin');

  useEffect(() => {
    if (!isAuthorizedAdmin) {
      showToast('অ্যাক্সেস অস্বীকৃত! অ্যাডমিন প্যানেলে প্রবেশের অনুমতি কেবল "admin" রোলধারী অনুমোদিত অ্যাডমিনের জন্য সংরক্ষিত।', 'error');
      setView('home');
      setAdminLoginModalOpen(true);
    }
  }, [isAuthorizedAdmin, setView, setAdminLoginModalOpen, showToast]);

  const [activeTab, setActiveTab] = useState<
    'overview' | 'contests' | 'hero-customizer' | 'video' | 'deposits' | 'users' | 'entries' | 'winners' | 'certifications' | 'firebase' | 'notices' | 'settings' | 'security' | 'logs'
  >('overview');

  // Admin Credentials State
  const [adminEmailInput, setAdminEmailInput] = useState(siteSettings.adminEmail || 'niazuddinmd1@gmail.com');
  const [adminPasswordInput, setAdminPasswordInput] = useState(siteSettings.adminPassword || '67373');

  // Contest Form State
  const [editingContestId, setEditingContestId] = useState<string | null>(null);
  const [showAddContestModal, setShowAddContestModal] = useState(false);
  const [formBrand, setFormBrand] = useState('Samsung');
  const [formModel, setFormModel] = useState('Galaxy S25 Ultra 5G');
  const [formMarketPrice, setFormMarketPrice] = useState('১,৭৫,০০০ টাকা');
  const [formEntryFee, setFormEntryFee] = useState('৫০ টাকা');
  const [formImage, setFormImage] = useState('https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=80');
  const [formStatus, setFormStatus] = useState<'active' | 'upcoming' | 'completed'>('active');
  const [formFeatured, setFormFeatured] = useState(true);
  const [formDisplay, setFormDisplay] = useState('৬.৮ ইঞ্চি Dynamic AMOLED 2X, 120Hz');
  const [formRamRom, setFormRamRom] = useState('১২ জিবি র‍্যাম + ৫১২ জিবি স্টোরেজ');
  const [formCamera, setFormCamera] = useState('২০০ মেগাপিক্সেল কোয়াড ক্যামেরা');
  const [formBattery, setFormBattery] = useState('৫০০০ mAh ব্যাটারি');
  const [formProcessor, setFormProcessor] = useState('Snapdragon 8 Elite');

  // Winner declaration form
  const [selectedContestForWinner, setSelectedContestForWinner] = useState<string>(contests[0]?.id || '');
  const [customWinnerName, setCustomWinnerName] = useState('');
  const [customWinnerStory, setCustomWinnerStory] = useState('');
  const [isSimulatingDraw, setIsSimulatingDraw] = useState(false);
  const [simulatedTicket, setSimulatedTicket] = useState('');

  // Wheel of Fortune State
  const [wheelMode, setWheelMode] = useState<'random' | 'targeted'>('random');
  const [targetCandidateIndex, setTargetCandidateIndex] = useState<number>(0);
  const [drawnWheelWinner, setDrawnWheelWinner] = useState<WheelCandidate | null>(null);

  // User database search, add & editing
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [userStatusFilter, setUserStatusFilter] = useState<'all' | 'pending' | 'active' | 'blocked'>('all');
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [editUserName, setEditUserName] = useState('');
  const [editUserPhone, setEditUserPhone] = useState('');
  const [editUserDistrict, setEditUserDistrict] = useState('ঢাকা');
  const [editUserPassword, setEditUserPassword] = useState('');
  const [editUserRole, setEditUserRole] = useState<'admin' | 'user'>('user');

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('123456');
  const [newUserDistrict, setNewUserDistrict] = useState('ঢাকা');
  const [newUserRole, setNewUserRole] = useState<'admin' | 'user'>('user');

  // Legal Documents State & Handlers
  const [showDocModal, setShowDocModal] = useState(false);
  const [editingDocId, setEditingDocId] = useState<string | null>(null);
  const [docFormTitle, setDocFormTitle] = useState('');
  const [docFormType, setDocFormType] = useState<LegalDocument['documentType']>('trade_license');
  const [docFormNumber, setDocFormNumber] = useState('');
  const [docFormAuthority, setDocFormAuthority] = useState('');
  const [docFormIssueDate, setDocFormIssueDate] = useState('');
  const [docFormExpiryDate, setDocFormExpiryDate] = useState('');
  const [docFormFileUrl, setDocFormFileUrl] = useState('');
  const [docFormDescription, setDocFormDescription] = useState('');
  const [docFormVerified, setDocFormVerified] = useState(true);

  // Animation Video Customizer State
  const initialVid = siteSettings.animationVideo || {
    enabled: true,
    title: 'ফ্ল্যাগশিপ মোবাইল ও লাইভ ড্র ৩ডি অ্যানিমেশন',
    subtitle: 'দেখুন কীভাবে সম্পূর্ণ নিরপেক্ষ কম্পিউটারাইজড সিস্টেমে প্রতি সপ্তাহের আকর্ষণীয় স্যামসাং ও আইফোন মেগা ড্র সম্পন্ন হয়।',
    badge: '🎥 এক্সক্লুসিভ লাইভ ড্র অ্যানিমেশন',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-device-in-a-studio-41775-large.mp4',
    posterUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1200&q=80',
    autoplay: true,
    loop: true,
    muted: true,
  };

  const [videoTitle, setVideoTitle] = useState(initialVid.title);
  const [videoSubtitle, setVideoSubtitle] = useState(initialVid.subtitle);
  const [videoBadge, setVideoBadge] = useState(initialVid.badge);
  const [videoUrl, setVideoUrl] = useState(initialVid.videoUrl);
  const [videoPoster, setVideoPoster] = useState(initialVid.posterUrl || '');
  const [videoAutoplay, setVideoAutoplay] = useState(initialVid.autoplay);
  const [videoLoop, setVideoLoop] = useState(initialVid.loop);
  const [videoMuted, setVideoMuted] = useState(initialVid.muted);

  const handleSaveAnimationVideo = (e: React.FormEvent) => {
    e.preventDefault();
    updateAnimationVideo({
      title: videoTitle.trim(),
      subtitle: videoSubtitle.trim(),
      badge: videoBadge.trim(),
      videoUrl: videoUrl.trim(),
      posterUrl: videoPoster.trim(),
      autoplay: videoAutoplay,
      loop: videoLoop,
      muted: videoMuted,
    });
  };

  const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 80 * 1024 * 1024) {
      showToast('ভিডিও সাইজ সর্বোচ্চ ৮০ মেগাবাইটের মধ্যে হতে হবে।', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setVideoUrl(event.target.result as string);
        showToast('ভিডিও ফাইল সফলভাবে লোড হয়েছে! "মোবাইল রিভিউ ভিডিও সংরক্ষণ করুন" বাটনে ক্লিক করে সেভ করুন।', 'success');
      }
    };
    reader.readAsDataURL(file);
  };

  const applyVideoPreset = (presetType: 'samsung' | 'iphone' | 'xiaomi' | 'tech3d') => {
    if (presetType === 'samsung') {
      setVideoTitle('Samsung Galaxy S25 Ultra 5G অফিসিয়াল আনবক্সিং ও রিভিউ');
      setVideoSubtitle('২০০ মেগাপিক্সেল কোয়াড ক্যামেরা ও আল্ট্রা ডিসপ্লের এক্সক্লুসিভ রিভিউ। ৫০ টাকার টিকিটে জিতে নিন এটি!');
      setVideoBadge('📱 স্যামসাং ফ্ল্যাগশিপ রিভিউ');
      setVideoUrl('https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-device-in-a-studio-41775-large.mp4');
      setVideoPoster('https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1200&q=80');
      showToast('স্যামসাং গ্যালাক্সি S25 আল্ট্রা রিভিউ প্রিসেট লোড হয়েছে!', 'info');
    } else if (presetType === 'iphone') {
      setVideoTitle('iPhone 16 Pro Max টাইটানিয়াম হ্যান্ডস-অন রিভিউ');
      setVideoSubtitle('অ্যাপল এ১৮ প্রো চিপসেটের সুপার পাওয়ার ও ট্রিপল ক্যামেরার লাইভ রিভিউ দেখুন। ৫০ টাকায় অংশ নিন!');
      setVideoBadge('🍎 আইফোন প্রিমিয়াম রিভিউ');
      setVideoUrl('https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-a-green-screen-40742-large.mp4');
      setVideoPoster('https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1200&q=80');
      showToast('আইফোন ১৬ প্রো ম্যাক্স রিভিউ প্রিসেট লোড হয়েছে!', 'info');
    } else if (presetType === 'xiaomi') {
      setVideoTitle('Xiaomi 14 Ultra লাইকা ক্যামেরা মেগা টেস্ট ও রিভিউ');
      setVideoSubtitle('১-ইঞ্চি সেন্সর এবং কোয়াড ক্যামেরা পারফরম্যান্সের দুর্দান্ত রিভিউ ভিডিও।');
      setVideoBadge('📸 শাওমি লাইকা ক্যামেরা রিভিউ');
      setVideoUrl('https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-charts-and-data-31911-large.mp4');
      setVideoPoster('https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80');
      showToast('শাওমি ১৪ আল্ট্রা রিভিউ প্রিসেট লোড হয়েছে!', 'info');
    } else {
      setVideoTitle('ফ্ল্যাগশিপ মোবাইল ও লাইভ ড্র ৩ডি অ্যানিমেশন');
      setVideoSubtitle('দেখুন কীভাবে সম্পূর্ণ নিরপেক্ষ কম্পিউটারাইজড সিস্টেমে প্রতি সপ্তাহের আকর্ষণীয় স্যামসাং ও আইফোন মেগা ড্র সম্পন্ন হয়।');
      setVideoBadge('🎥 এক্সক্লুসিভ লাইভ ড্র অ্যানিমেশন');
      setVideoUrl('https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-device-in-a-studio-41775-large.mp4');
      setVideoPoster('https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=1200&q=80');
      showToast('৩ডি মোবাইল রিভীল অ্যানিমেশন প্রিসেট লোড হয়েছে!', 'info');
    }
  };

  const legalDocsList: LegalDocument[] = siteSettings.legalDocuments && siteSettings.legalDocuments.length > 0
    ? siteSettings.legalDocuments
    : initialLegalDocuments;

  const startAddDoc = () => {
    setEditingDocId(null);
    setDocFormTitle('সিটি কর্পোরেশন ই-ট্রেড লাইসেন্স');
    setDocFormType('trade_license');
    setDocFormNumber('TRAD/DSCC/039182/2024');
    setDocFormAuthority('ঢাকা দক্ষিণ সিটি কর্পোরেশন');
    setDocFormIssueDate('০১ জুলাই ২০২৪');
    setDocFormExpiryDate('৩০ জুন ২০২৫');
    setDocFormFileUrl('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80');
    setDocFormDescription('অনলাইন ই-কমার্স ও কনটেস্ট পরিচালনার জন্য গণপ্রজাতন্ত্রী বাংলাদেশ সরকার অনুমোদিত বৈধ ট্রেড লাইসেন্স।');
    setDocFormVerified(true);
    setShowDocModal(true);
  };

  const startEditDoc = (doc: LegalDocument) => {
    setEditingDocId(doc.id);
    setDocFormTitle(doc.title);
    setDocFormType(doc.documentType);
    setDocFormNumber(doc.documentNumber);
    setDocFormAuthority(doc.issuingAuthority);
    setDocFormIssueDate(doc.issueDate);
    setDocFormExpiryDate(doc.expiryDate || '');
    setDocFormFileUrl(doc.fileUrl);
    setDocFormDescription(doc.description);
    setDocFormVerified(doc.verified);
    setShowDocModal(true);
  };

  const handleSaveDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docFormTitle || !docFormNumber) {
      showToast('সনদের নাম এবং লাইসেন্স নম্বর পূরণ করুন', 'error');
      return;
    }

    if (editingDocId) {
      updateLegalDocument(editingDocId, {
        title: docFormTitle,
        documentType: docFormType,
        documentNumber: docFormNumber,
        issuingAuthority: docFormAuthority,
        issueDate: docFormIssueDate,
        expiryDate: docFormExpiryDate,
        fileUrl: docFormFileUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80',
        description: docFormDescription,
        verified: docFormVerified,
      });
    } else {
      addLegalDocument({
        title: docFormTitle,
        documentType: docFormType,
        documentNumber: docFormNumber,
        issuingAuthority: docFormAuthority,
        issueDate: docFormIssueDate,
        expiryDate: docFormExpiryDate,
        fileUrl: docFormFileUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80',
        description: docFormDescription,
        verified: docFormVerified,
      });
    }
    setShowDocModal(false);
  };

  // Client Firebase Form State
  const [fbProjectId, setFbProjectId] = useState(activeFirebaseConfig?.projectId || '');
  const [fbApiKey, setFbApiKey] = useState(activeFirebaseConfig?.apiKey || '');
  const [fbAuthDomain, setFbAuthDomain] = useState(activeFirebaseConfig?.authDomain || '');
  const [fbAppId, setFbAppId] = useState(activeFirebaseConfig?.appId || '');
  const [fbStorageBucket, setFbStorageBucket] = useState(activeFirebaseConfig?.storageBucket || '');
  const [fbMessagingSenderId, setFbMessagingSenderId] = useState(activeFirebaseConfig?.messagingSenderId || '');
  const [fbFirestoreDbId, setFbFirestoreDbId] = useState(activeFirebaseConfig?.firestoreDatabaseId || '(default)');
  const [fbRawConfigPaste, setFbRawConfigPaste] = useState('');
  const [isTestingFbConnection, setIsTestingFbConnection] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; latency?: number } | null>(null);

  const handleParseRawFirebaseSnippet = () => {
    if (!fbRawConfigPaste.trim()) {
      showToast('অনুগ্রহ করে ফায়ারবেস কনফিগ কোড পেস্ট করুন', 'error');
      return;
    }
    try {
      const text = fbRawConfigPaste;
      const extract = (key: string): string => {
        const regex = new RegExp(`["']?${key}["']?\\s*:\\s*["']([^"']+)["']`, 'i');
        const match = text.match(regex);
        return match ? match[1].trim() : '';
      };

      const extractedApiKey = extract('apiKey');
      const extractedAuthDomain = extract('authDomain');
      const extractedProjectId = extract('projectId');
      const extractedStorageBucket = extract('storageBucket');
      const extractedSenderId = extract('messagingSenderId');
      const extractedAppId = extract('appId');
      const extractedDbId = extract('firestoreDatabaseId');

      if (!extractedProjectId && !extractedApiKey) {
        showToast('কনফিগ থেকে Project ID বা API Key পাওয়া যায়নি। ফরম্যাট ঠিক আছে কিনা দেখুন।', 'error');
        return;
      }

      if (extractedProjectId) setFbProjectId(extractedProjectId);
      if (extractedApiKey) setFbApiKey(extractedApiKey);
      if (extractedAuthDomain) setFbAuthDomain(extractedAuthDomain);
      if (extractedStorageBucket) setFbStorageBucket(extractedStorageBucket);
      if (extractedSenderId) setFbMessagingSenderId(extractedSenderId);
      if (extractedAppId) setFbAppId(extractedAppId);
      if (extractedDbId) setFbFirestoreDbId(extractedDbId);

      showToast('ফায়ারবেস কনফিগারেশন ফিল্ডসমূহ অটো-ফিল করা হয়েছে!', 'success');
    } catch {
      showToast('কোড পার্স করতে সমস্যা হয়েছে। ফিল্ডগুলোতে সরাসরি টাইপ করুন।', 'error');
    }
  };

  const handleTestFirebaseConnection = async () => {
    if (!fbProjectId || !fbApiKey || !fbAppId) {
      showToast('Project ID, API Key এবং App ID পূরণ করা আবশ্যক!', 'error');
      return;
    }

    setIsTestingFbConnection(true);
    setTestResult(null);
    try {
      const result = await testClientFirebaseConnection({
        projectId: fbProjectId.trim(),
        apiKey: fbApiKey.trim(),
        authDomain: fbAuthDomain.trim() || `${fbProjectId.trim()}.firebaseapp.com`,
        appId: fbAppId.trim(),
        storageBucket: fbStorageBucket.trim() || `${fbProjectId.trim()}.appspot.com`,
        messagingSenderId: fbMessagingSenderId.trim(),
        firestoreDatabaseId: fbFirestoreDbId.trim() || '(default)',
      });
      setTestResult(result);
      if (result.success) {
        showToast(result.message, 'success');
      } else {
        showToast(result.message, 'error');
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err?.message || 'কানেকশন টেস্টে সমস্যা হয়েছে।',
      });
    } finally {
      setIsTestingFbConnection(false);
    }
  };

  const handleSaveAndActivateFirebase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fbProjectId || !fbApiKey || !fbAppId) {
      showToast('Project ID, API Key এবং App ID পূরণ করা আবশ্যক!', 'error');
      return;
    }

    const config: ClientFirebaseConfig = {
      projectId: fbProjectId.trim(),
      apiKey: fbApiKey.trim(),
      authDomain: fbAuthDomain.trim() || `${fbProjectId.trim()}.firebaseapp.com`,
      appId: fbAppId.trim(),
      storageBucket: fbStorageBucket.trim(),
      messagingSenderId: fbMessagingSenderId.trim(),
      firestoreDatabaseId: fbFirestoreDbId.trim() || '(default)',
      connectedAt: new Date().toISOString(),
    };

    const success = await saveAndActivateClientFirebase(config);
    if (success) {
      setTestResult({
        success: true,
        message: `ক্লায়েন্ট প্রোজেক্ট '${config.projectId}' সক্রিয় হয়েছে এবং ডাটাবেজ সফলভাবে সংযুক্ত!`,
      });
    }
  };

  // Entry search & filter
  const [entrySearchTerm, setEntrySearchTerm] = useState('');
  const [entryStatusFilter, setEntryStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'rejected'>('all');

  // Notice form
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeContent, setNewNoticeContent] = useState('');
  const [newNoticeType, setNewNoticeType] = useState<'info' | 'urgent' | 'announcement'>('info');

  // Settings form
  const [settingsSiteName, setSettingsSiteName] = useState(siteSettings.siteName || '৫০ টাকায় মোবাইল জিতুন');
  const [settingsTagline, setSettingsTagline] = useState(siteSettings.tagline || 'আপনার স্বপ্নের মোবাইল জেতার বিশ্বস্ত প্ল্যাটফর্ম');
  const [settingsHeroHeadline, setSettingsHeroHeadline] = useState(siteSettings.heroHeadline || 'আপনার স্বপ্নের মোবাইল জিতুন!');
  const [settingsHeroSubheadline, setSettingsHeroSubheadline] = useState(siteSettings.heroSubheadline || 'ফ্ল্যাগশিপ স্মার্টফোন এখন আপনার হাতের নাগালে।');
  const [settingsHeroPhoneImage, setSettingsHeroPhoneImage] = useState(siteSettings.heroPhoneImage || 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=80');
  const [settingsHelpline, setSettingsHelpline] = useState(siteSettings.helplinePhone || '+৮৮০ ১৭৯৯-৯৮৮৭৭৬');
  const [settingsEmail, setSettingsEmail] = useState(siteSettings.supportEmail || 'niazuddinmd1@gmail.com');
  const [settingsAddress, setSettingsAddress] = useState(siteSettings.officeAddress || 'ঢাকা, বাংলাদেশ');
  const [settingsMarquee, setSettingsMarquee] = useState(siteSettings.marqueeNotice || '');
  const [settingsDisclaimer, setSettingsDisclaimer] = useState(siteSettings.legalNoticeBanner || '');
  const [settingsIsPaid, setSettingsIsPaid] = useState<boolean>(siteSettings.isPaidEnabled ?? true);
  const [settingsEntryFee, setSettingsEntryFee] = useState(siteSettings.entryFeeAmount || '৫০');
  const [settingsBkash, setSettingsBkash] = useState(siteSettings.bkashNumber || '01863440490');
  const [settingsNagad, setSettingsNagad] = useState(siteSettings.nagadNumber || '01863440490');
  const [settingsRocket, setSettingsRocket] = useState(siteSettings.rocketNumber || '01863440490');
  const [settingsBinancePayId, setSettingsBinancePayId] = useState(siteSettings.binancePayId || '89420184 (Binance Pay)');
  const [settingsBinanceUsdt, setSettingsBinanceUsdt] = useState(siteSettings.binanceUsdtAddress || 'TXvN71u3sPZqQ9K2wR5M4J8yT90184Trx20');

  // Live Draw Countdown Timer State
  const [timerDays, setTimerDays] = useState<number>(siteSettings.countdownDays ?? 3);
  const [timerHours, setTimerHours] = useState<number>(siteSettings.countdownHours ?? 14);
  const [timerMinutes, setTimerMinutes] = useState<number>(siteSettings.countdownMinutes ?? 42);
  const [timerSeconds, setTimerSeconds] = useState<number>(siteSettings.countdownSeconds ?? 18);
  const [timerTitle, setTimerTitle] = useState<string>(siteSettings.countdownTitle || 'লাইভ মেগা ড্র শেষ হতে বাকি:');
  const [timerTargetDate, setTimerTargetDate] = useState<string>(siteSettings.countdownTargetDate || '');

  // Hero Mobile Frame Customizer State
  const [heroBrand, setHeroBrand] = useState(siteSettings.heroCustomMobile?.brand || 'Samsung');
  const [heroModel, setHeroModel] = useState(siteSettings.heroCustomMobile?.model || 'Galaxy S25 Ultra 5G');
  const [heroMarketPrice, setHeroMarketPrice] = useState(siteSettings.heroCustomMobile?.marketPrice || '১,৭৫,০০০ টাকা');
  const [heroEntryFee, setHeroEntryFee] = useState(siteSettings.heroCustomMobile?.entryFee || '৫০ টাকা');
  const [heroImage, setHeroImage] = useState(siteSettings.heroCustomMobile?.image || 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=80');
  const [heroBadge, setHeroBadge] = useState(siteSettings.heroCustomMobile?.badge || '🏆 গ্র্যান্ড প্রাইজ');
  const [heroDisplay, setHeroDisplay] = useState(siteSettings.heroCustomMobile?.display || '৬.৮ ইঞ্চি Dynamic AMOLED 2X, 120Hz');
  const [heroCamera, setHeroCamera] = useState(siteSettings.heroCustomMobile?.camera || '২০০ মেগাপিক্সেল কোয়াড ক্যামেরা');
  const [heroRamRom, setHeroRamRom] = useState(siteSettings.heroCustomMobile?.ramRom || '১২ জিবি র‍্যাম + ৫১২ জিবি স্টোরেজ');
  const [heroBattery, setHeroBattery] = useState(siteSettings.heroCustomMobile?.battery || '৫০০০ mAh ব্যাটারি, ৪৫W ফাস্ট চার্জ');
  const [heroProcessor, setHeroProcessor] = useState(siteSettings.heroCustomMobile?.processor || 'Snapdragon 8 Elite');
  const [heroParticipants, setHeroParticipants] = useState(siteSettings.heroCustomMobile?.totalParticipants || 1842);

  // Deposit Filters
  const [depositFilter, setDepositFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [depositGatewayFilter, setDepositGatewayFilter] = useState<'all' | 'bkash' | 'nagad' | 'rocket' | 'binance'>('all');
  const [depositSearch, setDepositSearch] = useState('');

  // Custom visitor input
  const [customVisitors, setCustomVisitors] = useState(visitorCount.toString());

  if (!isAdmin) {
    return (
      <div className="py-24 px-4 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 mx-auto flex items-center justify-center mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">অননুমোদিত প্রবেশাধিকার</h2>
        <p className="text-xs text-slate-400 mb-6">
          অ্যাডমিন ড্যাশবোর্ড ব্যবহারের জন্য আপনাকে সিকিউর অ্যাডমিন হিসেবে লগইন করতে হবে।
        </p>
      </div>
    );
  }

  const handleSaveAdminCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminCredentials(adminEmailInput, adminPasswordInput);
  };

  const handleSaveContest = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingContestId) {
      updateContest(editingContestId, {
        brand: formBrand,
        model: formModel,
        marketPrice: formMarketPrice,
        entryFee: formEntryFee,
        image: formImage,
        status: formStatus,
        featured: formFeatured,
        specs: {
          display: formDisplay,
          ramRom: formRamRom,
          camera: formCamera,
          battery: formBattery,
          processor: formProcessor,
        },
      });
      setEditingContestId(null);
    } else {
      addContest({
        brand: formBrand,
        model: formModel,
        marketPrice: formMarketPrice,
        entryFee: formEntryFee,
        image: formImage,
        endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        status: formStatus,
        featured: formFeatured,
        specs: {
          display: formDisplay,
          ramRom: formRamRom,
          camera: formCamera,
          battery: formBattery,
          processor: formProcessor,
        },
      });
      setShowAddContestModal(false);
    }
  };

  const startEditContest = (c: ContestPrize) => {
    setEditingContestId(c.id);
    setFormBrand(c.brand);
    setFormModel(c.model);
    setFormMarketPrice(c.marketPrice);
    setFormEntryFee(c.entryFee || '৫০ টাকা');
    setFormImage(c.image);
    setFormStatus(c.status);
    setFormFeatured(c.featured);
    setFormDisplay(c.specs.display);
    setFormRamRom(c.specs.ramRom);
    setFormCamera(c.specs.camera);
    setFormBattery(c.specs.battery);
    setFormProcessor(c.specs.processor);
    setShowAddContestModal(true);
  };

  // Live Draw Simulation Animation
  const handleRunLiveDraw = () => {
    if (!selectedContestForWinner) {
      showToast('অনুগ্রহ করে একটি কনটেস্ট নির্বাচন করুন', 'error');
      return;
    }

    const availableEntries = entries.filter((e) => e.contestId === selectedContestForWinner && e.status !== 'rejected');
    if (availableEntries.length === 0) {
      showToast('এই কনটেস্টে কোনো এন্ট্রি টিকিট নেই! আগে এন্ট্রি সংগ্রহ করুন।', 'error');
      return;
    }

    setIsSimulatingDraw(true);
    let count = 0;
    const interval = setInterval(() => {
      const rand = availableEntries[Math.floor(Math.random() * availableEntries.length)];
      setSimulatedTicket(rand.ticketNumber);
      count++;
      if (count > 20) {
        clearInterval(interval);
        setIsSimulatingDraw(false);
        const winner = declareWinner(selectedContestForWinner, customWinnerName, customWinnerStory);
        if (winner) {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.5 },
            colors: ['#F59E0B', '#10B981', '#38BDF8', '#FFFFFF'],
          });
        }
        setCustomWinnerName('');
        setCustomWinnerStory('');
      }
    }, 100);
  };

  const handlePublishWheelWinner = () => {
    if (!drawnWheelWinner) {
      showToast('আগে হুইল অফ ফরচুন ঘুরিয়ে বিজয়ী নির্বাচন করুন!', 'error');
      return;
    }

    const winner = declareWinner(
      selectedContestForWinner,
      customWinnerName.trim() || drawnWheelWinner.name,
      customWinnerStory.trim() || 'লাইভ হুইল অফ ফরচুন ভাগ্যচক্র ঘুরিয়ে ড্র অনুষ্ঠিত হয়েছে। বিজয়ী সততার সাথে মোবাইল পুরস্কার গ্রহণ করেছেন।'
    );

    if (winner) {
      showToast(`অভিনন্দন! ${winner.winnerName} কে অফিশিয়াল বিজয়ী হিসেবে ওয়েবসাইটে প্রকাশ করা হয়েছে।`, 'success');
      setDrawnWheelWinner(null);
      setCustomWinnerName('');
      setCustomWinnerStory('');
    }
  };

  const handleAddNoticeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle || !newNoticeContent) {
      showToast('শিরোনাম ও বিবরণ দেওয়া আবশ্যক', 'error');
      return;
    }
    addNotice({
      title: newNoticeTitle,
      content: newNoticeContent,
      type: newNoticeType,
      active: true,
    });
    setNewNoticeTitle('');
    setNewNoticeContent('');
  };

  const handleSaveAllSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      siteName: settingsSiteName,
      tagline: settingsTagline,
      heroHeadline: settingsHeroHeadline,
      heroSubheadline: settingsHeroSubheadline,
      heroPhoneImage: settingsHeroPhoneImage,
      helplinePhone: settingsHelpline,
      supportEmail: settingsEmail,
      officeAddress: settingsAddress,
      marqueeNotice: settingsMarquee,
      legalNoticeBanner: settingsDisclaimer,
      isPaidEnabled: settingsIsPaid,
      entryFeeAmount: settingsEntryFee,
      bkashNumber: settingsBkash,
      nagadNumber: settingsNagad,
      rocketNumber: settingsRocket,
      binancePayId: settingsBinancePayId,
      binanceUsdtAddress: settingsBinanceUsdt,
      countdownDays: Number(timerDays) || 0,
      countdownHours: Number(timerHours) || 0,
      countdownMinutes: Number(timerMinutes) || 0,
      countdownSeconds: Number(timerSeconds) || 0,
      countdownTitle: timerTitle.trim() || 'লাইভ মেগা ড্র শেষ হতে বাকি:',
      countdownTargetDate: timerTargetDate,
    });
  };

  const handleSaveTimer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateSettings({
      countdownDays: Number(timerDays) || 0,
      countdownHours: Number(timerHours) || 0,
      countdownMinutes: Number(timerMinutes) || 0,
      countdownSeconds: Number(timerSeconds) || 0,
      countdownTitle: timerTitle.trim() || 'লাইভ মেগা ড্র শেষ হতে বাকি:',
      countdownTargetDate: timerTargetDate,
    });
    showToast('কাউন্টডাউন টাইমার সফলভাবে হোমপেজে আপডেট করা হয়েছে!', 'success');
  };

  const applyTimerPreset = (hours: number, label: string) => {
    const d = Math.floor(hours / 24);
    const h = hours % 24;
    setTimerDays(d);
    setTimerHours(h);
    setTimerMinutes(0);
    setTimerSeconds(0);
    setTimerTargetDate('');
    updateSettings({
      countdownDays: d,
      countdownHours: h,
      countdownMinutes: 0,
      countdownSeconds: 0,
      countdownTargetDate: '',
    });
    showToast(`কাউন্টডাউন টাইমার: ${label} সফলভাবে সেট হয়েছে!`, 'success');
  };

  const applyMobilePreset = (type: string) => {
    switch (type) {
      case 'redmi_budget':
        setHeroBrand('Xiaomi');
        setHeroModel('Redmi Note 13 Pro 5G (বাজেট ফোন)');
        setHeroMarketPrice('২৯,৯৯৯ টাকা');
        setHeroEntryFee('৫০ টাকা');
        setHeroImage('https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80');
        setHeroBadge('📱 বাজেট আকর্ষণ');
        setHeroDisplay('৬.৬৭ ইঞ্চি AMOLED, 120Hz');
        setHeroCamera('২০০ এমপি আল্ট্রা ক্লিয়ার ক্যামেরা');
        setHeroRamRom('৮ জিবি র‍্যাম + ২৫৬ জিবি রম');
        setHeroBattery('৫১০০ mAh ব্যাটারি, ৬৭W ফাস্ট চার্জ');
        setHeroProcessor('Snapdragon 7s Gen 2');
        showToast('রেডমি বাজেট মোবাইল প্রিসেট লোড হয়েছে!', 'info');
        break;
      case 'realme_budget':
        setHeroBrand('Realme');
        setHeroModel('Realme C67 (সুপার বাজেট ফোন)');
        setHeroMarketPrice('১৫,৯৯৯ টাকা');
        setHeroEntryFee('৫০ টাকা');
        setHeroImage('https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=900&q=80');
        setHeroBadge('📱 সেরা কম দামি ফোন');
        setHeroDisplay('৬.৭২ ইঞ্চি FHD+ 90Hz');
        setHeroCamera('১০৮ এমপি ৩X ইন-সেন্সর ক্যামেরা');
        setHeroRamRom('৬ জিবি র‍্যাম + ১২৮ জিবি রম');
        setHeroBattery('৫০০০ mAh ব্যাটারি, ৩৩W ফাস্ট চার্জ');
        setHeroProcessor('Snapdragon 685 (6nm)');
        showToast('রিয়েলমি বাজেট মোবাইল প্রিসেট লোড হয়েছে!', 'info');
        break;
      case 'symphony_budget':
        setHeroBrand('Symphony');
        setHeroModel('Symphony Z70 (কম দামি স্মার্টফোন)');
        setHeroMarketPrice('৯,৪৯৯ টাকা');
        setHeroEntryFee('৫০ টাকা');
        setHeroImage('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80');
        setHeroBadge('🎁 ধামাকা কম দামি ফোন');
        setHeroDisplay('৬.৫৬ ইঞ্চি HD+ 90Hz Punch Hole');
        setHeroCamera('৫০ এমপি আল্ট্রা ক্যামেরা');
        setHeroRamRom('৪ জিবি র‍্যাম + ৬৪ জিবি রম');
        setHeroBattery('৫০০০ mAh ব্যাটারি, ১০W ফাস্ট চার্জ');
        setHeroProcessor('Unisoc T606 Octa-Core');
        showToast('সিম্ফনি কম দামি মোবাইল প্রিসেট লোড হয়েছে!', 'info');
        break;
      case 'iphone_flagship':
        setHeroBrand('Apple');
        setHeroModel('iPhone 16 Pro Max (Desert Titanium)');
        setHeroMarketPrice('১,৯৫,০০০ টাকা');
        setHeroEntryFee('৫০ টাকা');
        setHeroImage('https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=80');
        setHeroBadge('🍎 আল্ট্রা ফ্ল্যাগশিপ');
        setHeroDisplay('৬.৯ ইঞ্চি Super Retina XDR OLED, 120Hz');
        setHeroCamera('৪৮ এমপি ফিউশন + ৫X টেলিফটো');
        setHeroRamRom('৮ জিবি র‍্যাম + ২৫৬ জিবি রম');
        setHeroBattery('৩৩ ঘণ্টা ভিডিও প্লেব্যাক');
        setHeroProcessor('Apple A18 Pro Bionic');
        showToast('আইফোন ১৬ প্রো ম্যাক্স প্রিসেট লোড হয়েছে!', 'info');
        break;
      case 'samsung_flagship':
        setHeroBrand('Samsung');
        setHeroModel('Galaxy S25 Ultra 5G');
        setHeroMarketPrice('১,৭৫,০০০ টাকা');
        setHeroEntryFee('৫০ টাকা');
        setHeroImage('https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=80');
        setHeroBadge('🏆 গ্র্যান্ড প্রাইজ');
        setHeroDisplay('৬.৮ ইঞ্চি Dynamic AMOLED 2X, 120Hz');
        setHeroCamera('২০০ মেগাপিক্সেল কোয়াড আল্ট্রা ক্যামেরা');
        setHeroRamRom('১২ জিবি র‍্যাম + ৫১২ জিবি স্টোরেজ');
        setHeroBattery('৫০০০ mAh ব্যাটারি, ৪৫W ফাস্ট চার্জ');
        setHeroProcessor('Snapdragon 8 Elite (3nm)');
        showToast('স্যামসাং S25 আল্ট্রা প্রিসেট লোড হয়েছে!', 'info');
        break;
    }
  };

  const handleSaveHeroMobile = (e: React.FormEvent) => {
    e.preventDefault();
    updateHeroCustomMobile({
      brand: heroBrand,
      model: heroModel,
      marketPrice: heroMarketPrice,
      entryFee: heroEntryFee,
      image: heroImage,
      badge: heroBadge,
      display: heroDisplay,
      camera: heroCamera,
      ramRom: heroRamRom,
      battery: heroBattery,
      processor: heroProcessor,
      totalParticipants: Number(heroParticipants) || 1842,
    });
  };

  const handleSetCustomVisitors = () => {
    const val = parseInt(customVisitors, 10);
    if (!isNaN(val) && val >= 0) {
      setVisitorCountManual(val);
    } else {
      showToast('সঠিক সংখ্যা ইনপুট দিন', 'error');
    }
  };

  const handleStartEditUser = (u: UserProfile) => {
    setEditingUser(u);
    setEditUserName(u.name);
    setEditUserPhone(u.phone);
    setEditUserDistrict(u.district);
    setEditUserPassword(u.password || '');
    setEditUserRole(u.role || 'user');
  };

  const handleSaveEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      updateUser(editingUser.id, {
        name: editUserName,
        phone: editUserPhone,
        district: editUserDistrict,
        password: editUserPassword,
        role: editUserRole,
      });
      setEditingUser(null);
    }
  };

  const handleCreateNewUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserPhone) {
      showToast('নাম এবং ফোন নম্বর পূরণ করুন', 'error');
      return;
    }
    const success = registerUser({
      name: newUserName,
      phone: newUserPhone,
      email: newUserEmail || `${newUserPhone}@mail.bd`,
      district: newUserDistrict,
      password: newUserPassword,
    });
    if (success) {
      setShowAddUserModal(false);
      setNewUserName('');
      setNewUserPhone('');
      setNewUserEmail('');
      setNewUserPassword('123456');
    }
  };

  const pendingUsersCount = users.filter((u) => u.status === 'pending').length;

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      u.phone.includes(userSearchTerm) ||
      u.email.toLowerCase().includes(userSearchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (userStatusFilter === 'all') return true;
    return u.status === userStatusFilter;
  });

  const filteredEntries = entries.filter((e) => {
    const matchesSearch =
      e.ticketNumber.toLowerCase().includes(entrySearchTerm.toLowerCase()) ||
      e.userName.toLowerCase().includes(entrySearchTerm.toLowerCase()) ||
      e.contestTitle.toLowerCase().includes(entrySearchTerm.toLowerCase()) ||
      (e.trxId && e.trxId.toLowerCase().includes(entrySearchTerm.toLowerCase()));

    if (!matchesSearch) return false;
    if (entryStatusFilter === 'all') return true;
    return e.status === entryStatusFilter;
  });

  // Fallback guard UI if unauthorized attempt occurs
  if (!isAuthorizedAdmin) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-slate-950">
        <div className="max-w-md w-full bg-slate-900/95 border border-rose-500/40 rounded-3xl p-6 sm:p-8 text-center shadow-2xl backdrop-blur-xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 mx-auto flex items-center justify-center mb-5 shadow-[0_0_25px_rgba(244,63,94,0.3)]">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2 tracking-tight">
            অ্যাক্সেস সংরক্ষিত (Access Denied)
          </h2>
          <p className="text-xs sm:text-sm text-rose-200/90 mb-5 leading-relaxed font-medium">
            এই ড্যাশবোর্ডটি শুধুমাত্র <span className="font-bold text-rose-400 underline decoration-rose-500 underline-offset-2">'admin'</span> রোলধারী অনুমোদিত অ্যাডমিনের জন্য সুরক্ষিত। সাধারণ ইউজারদের জন্য এটি সম্পূর্ণ সংরক্ষিত।
          </p>

          <div className="p-3.5 bg-rose-950/40 border border-rose-500/20 rounded-2xl text-xs text-rose-200/80 mb-6 text-left space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-rose-300">
              <Lock className="w-3.5 h-3.5" />
              <span>Role-Based Access Control (RBAC) সক্রিয়</span>
            </div>
            <p className="text-[11px] text-slate-300">
              বর্তমান স্ট্যাটাস: <span className="font-semibold text-amber-300">{currentUser ? `লগইনকৃত (রোল: ${currentUser.role})` : 'লগইন করা নেই (Guest)'}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setAdminLoginModalOpen(true);
                setView('home');
              }}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-rose-600/30 active:scale-95 transition-all cursor-pointer"
            >
              অ্যাডমিন লগইন
            </button>
            <button
              onClick={() => setView('home')}
              className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs sm:text-sm transition-all border border-slate-700 active:scale-95 cursor-pointer"
            >
              হোমপেজে ফিরুন
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      
      {/* Top Admin Header Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-[#130E26] to-[#070D1F] p-6 rounded-3xl border border-rose-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center font-bold shadow-[0_0_20px_rgba(244,63,94,0.3)]">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">অ্যাডমিন কন্ট্রোল সেন্টার</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                MASTER ADMIN
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              অ্যাডমিন: <span className="text-amber-400 font-mono font-bold">{siteSettings.adminEmail || 'niazuddinmd1@gmail.com'}</span> | সম্পূর্ণ কাস্টমাইজেশন মোড সক্রিয়
            </p>
          </div>
        </div>

        {/* Global Admin Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setActiveTab('security')}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <KeyRound className="w-4 h-4 text-amber-400" />
            <span>ইমেইল ও পাসওয়ার্ড পরিবর্তন</span>
          </button>

          <button
            onClick={exportDatabaseJSON}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="JSON ব্যাকআপ ফাইল ডাউনলোড করুন"
          >
            <FileDown className="w-4 h-4 text-emerald-400" />
            <span>ব্যাকআপ ফাইল</span>
          </button>

          <button
            onClick={adminLogout}
            className="px-3.5 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>লগআউট</span>
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { key: 'overview', label: 'ওভারভিউ ও মেট্রিক্স', icon: Eye },
          { key: 'hero-customizer', label: '📱 বড় মোবাইল ফ্রেম', icon: Sparkles },
          { key: 'video', label: '📱 মোবাইল রিভিউ ভিডিও', icon: Video },
          { key: 'deposits', label: `ডিপোজিট ও লেনদেন (${deposits.length})`, icon: DollarSign },
          { key: 'contests', label: `সকল মোবাইল (${contests.length})`, icon: Smartphone },
          { key: 'entries', label: `টিকিট তালিকা (${entries.length})`, icon: Ticket },
          { key: 'winners', label: `লাইভ ড্র ও বিজয়ী (${winners.length})`, icon: Trophy },
          { key: 'certifications', label: `📜 সরকারি কাগজপত্র (${legalDocsList.length})`, icon: ShieldCheck },
          { key: 'firebase', label: isCustomFirebase ? '🔥 ক্লায়েন্ট ফায়ারবেস (সক্রিয়)' : '🔥 ফায়ারবেস ডাটাবেজ', icon: Flame },
          { key: 'users', label: pendingUsersCount > 0 ? `ইউজার তালিকা (${users.length}) ⚠️ [${pendingUsersCount} অপেক্ষমাণ]` : `ইউজার তালিকা (${users.length})`, icon: Users },
          { key: 'settings', label: 'ওয়েবসাইট কাস্টমাইজেশন', icon: Settings },
          { key: 'security', label: 'অ্যাডমিন সিকিউরিটি', icon: Lock },
          { key: 'notices', label: `নোটিস (${notices.length})`, icon: Bell },
          { key: 'logs', label: `অ্যাক্টিভিটি লগ (${adminLogs.length})`, icon: Activity },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black scale-102'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & STATS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 relative overflow-hidden">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>মোট সাইট ভিজিটর</span>
                <Eye className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {visitorCount.toLocaleString()}
              </div>
              <div className="text-[10px] text-emerald-400 mt-1 flex items-center justify-between">
                <span>লাইভ ট্র্যাকিং সক্রিয়</span>
                <button
                  onClick={() => setActiveTab('settings')}
                  className="text-amber-400 underline hover:text-amber-300 font-bold"
                >
                  পরিবর্তন করুন
                </button>
              </div>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 relative overflow-hidden">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>নিবন্ধিত ব্যবহারকারী</span>
                <Users className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {users.length} জন
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                সকল ইউজার রেকর্ড সংরক্ষিত
              </div>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 relative overflow-hidden">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>মোট সংগৃহীত টিকিট</span>
                <Ticket className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {entries.length} টি
              </div>
              <div className="text-[10px] text-emerald-400 mt-1">
                {entries.filter((e) => e.status === 'confirmed').length} টি কনফার্মড
              </div>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 relative overflow-hidden">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>ঘোষিত বিজয়ী</span>
                <Trophy className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {winners.length} জন
              </div>
              <div className="text-[10px] text-amber-300 mt-1">
                সফল ড্র সম্পন্ন
              </div>
            </div>

          </div>

          {/* Paid Mode Live Toggle Banner */}
          <div className="p-5 bg-gradient-to-r from-slate-900 via-[#16122E] to-slate-900 border border-amber-500/40 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white">পেইড টিকিট ও পেমেন্ট মোড নিয়ন্ত্রণ:</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${siteSettings.isPaidEnabled ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-amber-300'}`}>
                  {siteSettings.isPaidEnabled ? 'পেইড মোড সক্রিয় (৫০ টাকা)' : 'ফ্রি পাস মোড'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                আপনি যেকোনো সময় পেইড টিকিট সংগ্রহ (বিকাশ/নগদ/রকেট) ও ৫০ টাকা ফি নিয়ন্ত্রণ করতে পারবেন।
              </p>
            </div>

            <button
              onClick={() => {
                const newMode = !siteSettings.isPaidEnabled;
                updateSettings({ isPaidEnabled: newMode });
                showToast(newMode ? 'পেইড টিকেট মোড সক্রিয় করা হয়েছে!' : 'ফ্রি পাস মোড চালু করা হয়েছে!', 'success');
              }}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer shrink-0 ${
                siteSettings.isPaidEnabled
                  ? 'bg-rose-500 hover:bg-rose-600 text-white'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950'
              }`}
            >
              {siteSettings.isPaidEnabled ? 'পেইড মোড বন্ধ করুন' : 'পেইড মোড চালু করুন'}
            </button>
          </div>

          {/* Quick Shortcuts to Edit Contests or View Entries */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center justify-between">
                <span>সক্রিয় পুরস্কার ও মোবাইল</span>
                <button
                  onClick={() => setActiveTab('contests')}
                  className="text-amber-400 text-xs hover:underline cursor-pointer"
                >
                  ম্যানেজ করুন →
                </button>
              </h3>
              <div className="space-y-2.5">
                {contests.slice(0, 3).map((c) => (
                  <div key={c.id} className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs">
                    <div className="flex items-center gap-2.5">
                      <img src={c.image} alt={c.model} className="w-9 h-9 object-cover rounded-lg border border-slate-700" />
                      <div>
                        <div className="font-bold text-white truncate max-w-[150px]">{c.brand} {c.model}</div>
                        <div className="text-slate-400 font-mono">{c.marketPrice}</div>
                      </div>
                    </div>
                    <span className="font-mono text-amber-400 font-bold">{c.totalParticipants} এন্ট্রি</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center justify-between">
                <span>সর্বশেষ টিকিট রেকর্ড</span>
                <button
                  onClick={() => setActiveTab('entries')}
                  className="text-amber-400 text-xs hover:underline cursor-pointer"
                >
                  সবগুলো দেখুন →
                </button>
              </h3>
              <div className="space-y-2.5">
                {entries.slice(0, 3).map((ent) => (
                  <div key={ent.id} className="flex items-center justify-between p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs">
                    <div>
                      <div className="font-mono font-bold text-amber-300">{ent.ticketNumber}</div>
                      <div className="text-slate-400 text-[11px]">{ent.userName} ({ent.userPhone})</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                      {ent.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: HERO BIG PHONE FRAME CUSTOMIZER */}
      {activeTab === 'hero-customizer' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>বড় মোবাইল ফ্রেম কাস্টমাইজার (Hero Banner Showcase)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                হোমপেজের বড় থ্রি-ডি মোবাইল ফ্রেমে যেকোনো মোবাইল (কম দামি বাজেট ফোন বা ফ্ল্যাগশিপ) বসাতে পারেন।
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">রানিং কনটেস্ট থেকে নির্বাচন:</span>
              <select
                onChange={(e) => {
                  const c = contests.find((x) => x.id === e.target.value);
                  if (c) {
                    setHeroBrand(c.brand);
                    setHeroModel(c.model);
                    setHeroMarketPrice(c.marketPrice);
                    setHeroEntryFee(c.entryFee);
                    setHeroImage(c.image);
                    setHeroBadge('🏆 গ্র্যান্ড প্রাইজ');
                    setHeroDisplay(c.specs.display);
                    setHeroCamera(c.specs.camera);
                    setHeroRamRom(c.specs.ramRom);
                    setHeroBattery(c.specs.battery);
                    setHeroProcessor(c.specs.processor);
                    setHeroParticipants(c.totalParticipants);
                    showToast(`${c.model} ডেটা লোড হয়েছে!`, 'info');
                  }
                }}
                className="bg-slate-900 border border-slate-700 text-xs text-amber-300 rounded-xl px-3 py-2 cursor-pointer focus:border-amber-400"
              >
                <option value="">-- কনটেস্ট থেকে বাছাই করুন --</option>
                {contests.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.brand} - {c.model}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Presets for Cheaper Mobiles and Flagships */}
          <div className="p-4 bg-slate-900/90 rounded-2xl border border-amber-500/30 space-y-2">
            <span className="text-xs font-bold text-amber-300 block">
              ⚡ দ্রুত ১-ক্লিক মোবাইল প্রিসেট (কম দামি ও প্রিমিয়াম মডেলসমূহ):
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                type="button"
                onClick={() => applyMobilePreset('symphony_budget')}
                className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-bold transition-all cursor-pointer"
              >
                📱 সিম্ফনি বাজেট (৳৯,৪৯৯)
              </button>
              <button
                type="button"
                onClick={() => applyMobilePreset('realme_budget')}
                className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 font-bold transition-all cursor-pointer"
              >
                📱 রিয়েলমি কম দামি (৳১৫,৯৯৯)
              </button>
              <button
                type="button"
                onClick={() => applyMobilePreset('redmi_budget')}
                className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 font-bold transition-all cursor-pointer"
              >
                📱 রেডমি বাজেট নোট ১৩ (৳২৯,৯৯৯)
              </button>
              <button
                type="button"
                onClick={() => applyMobilePreset('samsung_flagship')}
                className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-yellow-300 border border-slate-700 font-bold transition-all cursor-pointer"
              >
                🏆 স্যামসাং S25 আল্ট্রা (৳১,৭৫,০০০)
              </button>
              <button
                type="button"
                onClick={() => applyMobilePreset('iphone_flagship')}
                className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 border border-slate-700 font-bold transition-all cursor-pointer"
              >
                🍎 আইফোন ১৬ প্রো ম্যাক্স (৳১,৯৫,০০০)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Customizer Form */}
            <div className="lg:col-span-7 bg-slate-900/80 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
              <form onSubmit={handleSaveHeroMobile} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      মোবাইলের ব্র্যান্ড
                    </label>
                    <input
                      type="text"
                      required
                      value={heroBrand}
                      onChange={(e) => setHeroBrand(e.target.value)}
                      placeholder="যেমন: Symphony, Realme, Xiaomi, Apple"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      মোবাইলের মডেল নাম
                    </label>
                    <input
                      type="text"
                      required
                      value={heroModel}
                      onChange={(e) => setHeroModel(e.target.value)}
                      placeholder="যেমন: Symphony Z70, Redmi Note 13"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      বাজার মূল্য
                    </label>
                    <input
                      type="text"
                      required
                      value={heroMarketPrice}
                      onChange={(e) => setHeroMarketPrice(e.target.value)}
                      placeholder="যেমন: ৯,৪৯৯ টাকা বা ১,৭৫,০০০ টাকা"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      টিকিট ফি
                    </label>
                    <input
                      type="text"
                      required
                      value={heroEntryFee}
                      onChange={(e) => setHeroEntryFee(e.target.value)}
                      placeholder="৫০ টাকা"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      ফ্রেমের উপরের ব্যাজ
                    </label>
                    <input
                      type="text"
                      required
                      value={heroBadge}
                      onChange={(e) => setHeroBadge(e.target.value)}
                      placeholder="যেমন: 📱 বাজেট ধামাকা বা 🏆 গ্র্যান্ড প্রাইজ"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    বড় ফ্রেমের মোবাইল ছবির লিংক (Image URL)
                  </label>
                  <input
                    type="url"
                    required
                    value={heroImage}
                    onChange={(e) => setHeroImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-xs focus:border-amber-400"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    যেকোনো মোবাইলের সরাসরি ছবি বা আনস্প্ল্যাশ ইমেজ লিংক এখানে বসাতে পারবেন।
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      ডিসপ্লে স্পেসিফিকেশন
                    </label>
                    <input
                      type="text"
                      value={heroDisplay}
                      onChange={(e) => setHeroDisplay(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      ক্যামেরা
                    </label>
                    <input
                      type="text"
                      value={heroCamera}
                      onChange={(e) => setHeroCamera(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      র‍্যাম ও রম
                    </label>
                    <input
                      type="text"
                      value={heroRamRom}
                      onChange={(e) => setHeroRamRom(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      ব্যাটারি
                    </label>
                    <input
                      type="text"
                      value={heroBattery}
                      onChange={(e) => setHeroBattery(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      অংশগ্রহণকারী সংখ্যা
                    </label>
                    <input
                      type="number"
                      value={heroParticipants}
                      onChange={(e) => setHeroParticipants(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-amber-400 font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-xl text-sm shadow-xl shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>হোমপেজের বড় মোবাইল ফ্রেমে এই মোবাইলটি সেট করুন</span>
                </button>
              </form>
            </div>

            {/* Right: Live Frame Preview */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <span className="text-xs font-bold text-amber-400 mb-2">
                লাইভ প্রিভিউ (হোমপেজে যেমন দেখাবে):
              </span>

              <div className="relative w-64 sm:w-72 bg-gradient-to-b from-slate-900 to-[#101C3D] p-3 rounded-[36px] border-2 border-amber-500/50 shadow-2xl">
                <div className="w-20 h-3.5 bg-slate-950 mx-auto rounded-b-xl mb-1.5 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800 mr-1.5" />
                  <div className="w-6 h-1 bg-slate-800 rounded-full" />
                </div>

                <div className="relative rounded-[24px] overflow-hidden bg-slate-950 aspect-[9/16] max-h-[380px]">
                  <img
                    src={heroImage}
                    alt={heroModel}
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-slate-950/80 rounded-full text-[9px] font-bold text-amber-300 border border-amber-500/40">
                      {heroBadge}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-500 text-slate-950 rounded-full text-[9px] font-black">
                      {heroEntryFee}
                    </span>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
                    <div className="text-amber-400 text-[10px] font-bold uppercase tracking-wider">{heroBrand}</div>
                    <div className="text-white text-base font-black truncate">{heroModel}</div>
                    <div className="text-slate-300 text-[11px]">
                      বাজার মূল্য: <span className="text-amber-300 font-bold">{heroMarketPrice}</span>
                    </div>
                    <div className="mt-1 pt-1 border-t border-slate-700/60 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">অংশগ্রহণকারী:</span>
                      <span className="text-emerald-400 font-bold font-mono">{heroParticipants}+ জন</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Draw Countdown Timer Customizer Section */}
            <div className="lg:col-span-12 bg-slate-900/90 rounded-3xl p-6 sm:p-7 border border-amber-500/30 shadow-2xl space-y-6 mt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-400" />
                    হোমপেজ লাইভ মেগা ড্র কাউন্টডাউন টাইমার কাস্টমাইজার
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    হোমপেজের ব্যানার অংশে ড্র শেষ হতে কত দিন, ঘণ্টা, মিনিট ও সেকেন্ড বাকি তা এখান থেকে সরাসরি সেট ও নিয়ন্ত্রণ করুন।
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg font-bold">
                    লাইভ অ্যাক্টিভ টাইমার
                  </span>
                </div>
              </div>

              {/* 1-Click Quick Presets */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300 block">
                  ⚡ দ্রুত ১-ক্লিক টাইমার সেট করুন (Quick Presets):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                  <button
                    type="button"
                    onClick={() => applyTimerPreset(6, '৬ ঘণ্টা')}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400 text-xs font-bold text-slate-200 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    ৬ ঘণ্টা
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTimerPreset(12, '১২ ঘণ্টা')}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400 text-xs font-bold text-slate-200 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    ১২ ঘণ্টা
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTimerPreset(24, '২৪ ঘণ্টা (১ দিন)')}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400 text-xs font-bold text-slate-200 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    ২৪ ঘণ্টা (১ দিন)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTimerPreset(48, '২ দিন')}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400 text-xs font-bold text-slate-200 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    ২ দিন
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTimerPreset(72, '৩ দিন')}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400 text-xs font-bold text-slate-200 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    ৩ দিন (ডিফল্ট)
                  </button>
                  <button
                    type="button"
                    onClick={() => applyTimerPreset(168, '৭ দিন (১ সপ্তাহ)')}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400 text-xs font-bold text-slate-200 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    ৭ দিন (১ সপ্তাহ)
                  </button>
                </div>
              </div>

              {/* Form & Live Preview Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
                
                {/* Inputs */}
                <form onSubmit={handleSaveTimer} className="lg:col-span-7 space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      টাইমার ব্যানার শিরোনাম
                    </label>
                    <input
                      type="text"
                      value={timerTitle}
                      onChange={(e) => setTimerTitle(e.target.value)}
                      placeholder="লাইভ মেগা ড্র শেষ হতে বাকি:"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">দিন (Days)</label>
                      <input
                        type="number"
                        min="0"
                        max="365"
                        value={timerDays}
                        onChange={(e) => setTimerDays(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-bold text-center text-sm focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">ঘণ্টা (Hours)</label>
                      <input
                        type="number"
                        min="0"
                        max="23"
                        value={timerHours}
                        onChange={(e) => setTimerHours(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-bold text-center text-sm focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">মিনিট (Minutes)</label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={timerMinutes}
                        onChange={(e) => setTimerMinutes(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-bold text-center text-sm focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">সেকেন্ড (Seconds)</label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={timerSeconds}
                        onChange={(e) => setTimerSeconds(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono font-bold text-center text-sm focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black rounded-xl text-xs shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Clock className="w-4 h-4 text-slate-950" />
                    <span>কাউন্টডাউন টাইমার সংরক্ষণ করুন ও হোমপেজে চালু করুন</span>
                  </button>
                </form>

                {/* Live Preview Card */}
                <div className="lg:col-span-5 p-4 bg-slate-950/80 border border-amber-500/30 rounded-2xl space-y-3">
                  <span className="text-[11px] font-bold text-amber-400 block text-center">
                    হোমপেজে লাইভ টাইমার যেমন দেখাবে:
                  </span>

                  <div className="p-3.5 bg-slate-900/90 rounded-xl border border-amber-500/40">
                    <div className="flex items-center justify-between text-xs mb-2.5">
                      <span className="font-bold text-amber-300 text-[11px] flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        {timerTitle || 'লাইভ মেগা ড্র শেষ হতে বাকি:'}
                      </span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-semibold">
                        সক্রিয় রাউন্ড
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                        <div className="text-lg font-black text-white font-mono">{timerDays}</div>
                        <div className="text-[9px] text-slate-400">দিন</div>
                      </div>
                      <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                        <div className="text-lg font-black text-white font-mono">{timerHours}</div>
                        <div className="text-[9px] text-slate-400">ঘণ্টা</div>
                      </div>
                      <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                        <div className="text-lg font-black text-white font-mono">{timerMinutes}</div>
                        <div className="text-[9px] text-slate-400">মিনিট</div>
                      </div>
                      <div className="bg-slate-950 p-2 rounded-lg border border-amber-500/40">
                        <div className="text-lg font-black text-amber-400 font-mono">{timerSeconds}</div>
                        <div className="text-[9px] text-amber-300/80">সেকেন্ড</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB: ANIMATION & MOBILE REVIEW VIDEO CUSTOMIZATION (Full Admin Control) */}
      {activeTab === 'video' && (
        <div className="space-y-6 animate-fade-in">
          {/* Master Video Control Card */}
          <div className="bg-gradient-to-r from-slate-900 via-[#161233] to-slate-900 border border-amber-500/30 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${siteSettings.animationVideo?.enabled !== false ? 'bg-emerald-400 animate-ping' : 'bg-rose-400'}`} />
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 flex-wrap">
                  <span>হোম স্ক্রিন মোবাইল রিভিউ ও অ্যানিমেশন ভিডিও</span>
                  <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${
                    siteSettings.animationVideo?.enabled !== false
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  }`}>
                    {siteSettings.animationVideo?.enabled !== false ? '● ভিডিও চালু (ON)' : '○ ভিডিও বন্ধ (OFF)'}
                  </span>
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                হোম স্ক্রিনের ব্যানার সেকশনের ঠিক নিচে মোবাইল রিভিউ ভিডিও (MP4, WebM অথবা YouTube লিংক) স্বয়ংক্রিয়ভাবে প্লে হবে। অ্যাডমিন এখান থেকে যেকোনো সময় ভিডিও পরিবর্তন ও নতুন ফাইল আপলোড করতে পারবেন।
              </p>
            </div>

            {/* Toggle Switch */}
            <div className="flex items-center gap-3 shrink-0 bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
              <span className={`text-xs font-bold ${siteSettings.animationVideo?.enabled !== false ? 'text-emerald-400' : 'text-slate-400'}`}>
                {siteSettings.animationVideo?.enabled !== false ? 'ভিডিও চালু (ON)' : 'ভিডিও বন্ধ (OFF)'}
              </span>
              <button
                type="button"
                onClick={() => toggleAnimationVideo()}
                className={`relative inline-flex h-8 w-15 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  siteSettings.animationVideo?.enabled !== false ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-slate-700'
                }`}
                title="মোবাইল রিভিউ ভিডিও অন / অফ করুন"
              >
                <span
                  className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    siteSettings.animationVideo?.enabled !== false ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Video Customizer Form & Live Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Form Column */}
            <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Video className="w-5 h-5 text-amber-400" />
                  <span>মোবাইল রিভিউ ভিডিও আপলোড ও লিংক সেটিংস</span>
                </h3>
                <span className="text-[11px] text-amber-400 font-semibold">
                  ফাইল আপলোড / YouTube / MP4
                </span>
              </div>

              {/* Ready Preset Selectors */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">
                  জনপ্রিয় মোবাইল রিভিউ প্রিসেট (১-ক্লিক নির্বাচন):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => applyVideoPreset('samsung')}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-700 hover:border-amber-400 text-left transition-colors cursor-pointer group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-amber-400">📱 স্যামসাং S25 আল্ট্রা রিভিউ</div>
                    <div className="text-[10px] text-slate-400">২০০ মেগাপিক্সেল ক্যামেরা আনবক্সিং</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => applyVideoPreset('iphone')}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-700 hover:border-amber-400 text-left transition-colors cursor-pointer group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-amber-400">🍎 আইফোন ১৬ প্রো ম্যাক্স রিভিউ</div>
                    <div className="text-[10px] text-slate-400">টাইটানিয়াম এ১৮ প্রো হ্যান্ডস-অন</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => applyVideoPreset('xiaomi')}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-700 hover:border-cyan-400 text-left transition-colors cursor-pointer group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-cyan-400">📸 শাওমি ১৪ আল্ট্রা লাইকা</div>
                    <div className="text-[10px] text-slate-400">১-ইঞ্চি সেন্সর ক্যামেরা মেগা টেস্ট</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => applyVideoPreset('tech3d')}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-700 hover:border-purple-400 text-left transition-colors cursor-pointer group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-purple-400">🎥 ৩ডি ফিউচারিস্টিক রিভীল</div>
                    <div className="text-[10px] text-slate-400">ডিজিটাল স্টুডিও রোটেটিং মোশন</div>
                  </button>
                </div>
              </div>

              {/* Direct File Upload Option */}
              <div className="p-4 bg-slate-950/90 rounded-2xl border border-amber-500/30 space-y-2">
                <label className="block text-xs font-bold text-amber-300">
                  📁 ডিভাইস থেকে সরাসরি ভিডিও ফাইল আপলোড করুন (MP4 বা WebM):
                </label>
                <p className="text-[11px] text-slate-400">
                  আপনার মোবাইল বা কম্পিউটার থেকে রিভিউ ভিডিও ফাইলটি বেছে নিন।
                </p>
                <input
                  type="file"
                  accept="video/mp4,video/webm"
                  onChange={handleVideoFileUpload}
                  className="w-full text-xs text-slate-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-400 cursor-pointer"
                />
              </div>

              <form onSubmit={handleSaveAnimationVideo} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    সেকশন ব্যাজ টেক্সট (Badge Text)
                  </label>
                  <input
                    type="text"
                    required
                    value={videoBadge}
                    onChange={(e) => setVideoBadge(e.target.value)}
                    placeholder="যেমন: 📱 অফিসিয়াল মোবাইল রিভিউ ও লাইভ ড্র"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    ভিডিওর প্রধান শিরোনাম (Main Headline)
                  </label>
                  <input
                    type="text"
                    required
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="ভিডিওর আকর্ষণীয় শিরোনাম লিখুন"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-amber-400 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    সাবটাইটেল ও বর্ণনা (Description / Subtitle)
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={videoSubtitle}
                    onChange={(e) => setVideoSubtitle(e.target.value)}
                    placeholder="ভিডিও ও নিরপেক্ষ ড্র সম্পর্কে ১-২ লাইনের বিবরণ লিখুন"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-amber-400 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    ভিডিও ইউআরএল (অনলাইন লিংক - Direct MP4 / WebM অথবা YouTube লিংক / Shorts)
                  </label>
                  <input
                    type="text"
                    required
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://...mp4 অথবা https://youtube.com/watch?v=... বা https://youtube.com/shorts/..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-amber-300 font-mono focus:border-amber-400"
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">
                    💡 সরাসরি যেকোনো MP4/WebM রিভিউ ভিডিও, ফাইল ডাটা অথবা ইউটিউব লিংক পেস্ট করতে পারেন।
                  </span>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    ভিডিও থাম্বনেইল / পোস্টার ইমেজ URL (ঐচ্ছিক)
                  </label>
                  <input
                    type="url"
                    value={videoPoster}
                    onChange={(e) => setVideoPoster(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:border-amber-400"
                  />
                </div>

                {/* Player Preferences Checkboxes */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-950/70 rounded-2xl border border-slate-800">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={videoAutoplay}
                      onChange={(e) => setVideoAutoplay(e.target.checked)}
                      className="rounded accent-amber-500 w-4 h-4 cursor-pointer"
                    />
                    <span>অটোপ্লে (Autoplay)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={videoLoop}
                      onChange={(e) => setVideoLoop(e.target.checked)}
                      className="rounded accent-amber-500 w-4 h-4 cursor-pointer"
                    />
                    <span>লুপ (Loop)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={videoMuted}
                      onChange={(e) => setVideoMuted(e.target.checked)}
                      className="rounded accent-amber-500 w-4 h-4 cursor-pointer"
                    />
                    <span>মিউট (Muted)</span>
                  </label>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    className="py-3 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>অ্যানিমেশন ভিডিও সংরক্ষণ করুন</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => applyVideoPreset('tech3d')}
                    className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    রিসেট
                  </button>
                </div>
              </form>
            </div>

            {/* Live Interactive Preview Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900/90 rounded-3xl p-6 border border-amber-500/30 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Play className="w-4 h-4 text-emerald-400" />
                    লাইভ ভিডিও প্লেয়ার প্রিভিউ
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                    সরাসরি প্রিভিউ
                  </span>
                </div>

                {/* Simulated Player Card */}
                <div className="rounded-2xl overflow-hidden border border-slate-700 bg-black aspect-video relative group flex items-center justify-center">
                  {videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
                    <div className="text-center p-4 text-xs text-slate-400 space-y-2">
                      <Video className="w-8 h-8 text-rose-500 mx-auto" />
                      <p className="font-bold text-white">ইউটিউব এম্বেড ভিডিও সেট করা আছে</p>
                      <p className="font-mono text-[10px] text-amber-300 truncate max-w-xs">{videoUrl}</p>
                    </div>
                  ) : (
                    <video
                      src={videoUrl}
                      poster={videoPoster}
                      autoPlay={videoAutoplay}
                      loop={videoLoop}
                      muted={videoMuted}
                      controls
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Preview Metadata Box */}
                <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2 text-xs">
                  <div className="inline-block px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 text-[10px] font-bold">
                    {videoBadge}
                  </div>
                  <div className="font-bold text-white text-sm">
                    {videoTitle}
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed line-clamp-2">
                    {videoSubtitle}
                  </p>
                </div>

                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>এখানে পরিবর্তন করে 'সংরক্ষণ' করলে হোমপেজে লাইভ আপডেট হবে।</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB: DEPOSITS & TRANSACTIONS MANAGEMENT */}
      {activeTab === 'deposits' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                <span>ডিপোজিট ও লেনদেন ম্যানেজমেন্ট (বিকাশ, নগদ, রকেট ও বাইন্যান্স)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                গ্রাহকদের প্রেরিত ডিপোজিট রিকোয়েস্ট যাচাই, অনুমোদন ও প্রত্যাখ্যান করুন।
              </p>
            </div>
          </div>

          {/* Deposit Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
              <div className="text-xs text-slate-400">মোট ডিপোজিট রিকোয়েস্ট</div>
              <div className="text-2xl font-black text-white font-mono mt-1">{deposits.length} টি</div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-2xl border border-amber-500/30">
              <div className="text-xs text-amber-300">⏳ অনুমোদনের অপেক্ষায় (পেন্ডিং)</div>
              <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                {deposits.filter((d) => d.status === 'pending').length} টি
              </div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-2xl border border-emerald-500/30">
              <div className="text-xs text-emerald-400">✓ অনুমোদিত মোট কালেকশন</div>
              <div className="text-2xl font-black text-emerald-400 font-mono mt-1">
                ৳{deposits.filter((d) => d.status === 'approved').reduce((acc, curr) => acc + curr.amount, 0)} টাকা
              </div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-2xl border border-rose-500/30">
              <div className="text-xs text-rose-400">✕ বাতিলকৃত রিকোয়েস্ট</div>
              <div className="text-2xl font-black text-rose-400 font-mono mt-1">
                {deposits.filter((d) => d.status === 'rejected').length} টি
              </div>
            </div>
          </div>

          {/* Gateway Numbers Configuration Quick Card */}
          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3 text-xs">
            <div className="font-bold text-white flex items-center justify-between">
              <span>অফিশিয়াল রিসিভিং অ্যাকাউন্ট নম্বর ও বাইন্যান্স সেটিংস:</span>
              <span className="text-[11px] text-slate-400">গ্রাহকরা এই নম্বরগুলোতে ডিপোজিট করবেন</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="block text-slate-400 mb-1">বিকাশ নম্বর</label>
                <input
                  type="text"
                  value={settingsBkash}
                  onChange={(e) => setSettingsBkash(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">নগদ নম্বর</label>
                <input
                  type="text"
                  value={settingsNagad}
                  onChange={(e) => setSettingsNagad(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">রকেট নম্বর</label>
                <input
                  type="text"
                  value={settingsRocket}
                  onChange={(e) => setSettingsRocket(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">বাইন্যান্স Pay ID</label>
                <input
                  type="text"
                  value={settingsBinancePayId}
                  onChange={(e) => setSettingsBinancePayId(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-xs focus:border-amber-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex-1 mr-4">
                <input
                  type="text"
                  value={settingsBinanceUsdt}
                  onChange={(e) => setSettingsBinanceUsdt(e.target.value)}
                  placeholder="Binance USDT (TRC-20 Address)"
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-[11px] focus:border-amber-400"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  updateSettings({
                    bkashNumber: settingsBkash,
                    nagadNumber: settingsNagad,
                    rocketNumber: settingsRocket,
                    binancePayId: settingsBinancePayId,
                    binanceUsdtAddress: settingsBinanceUsdt,
                  });
                  showToast('পেমেন্ট অ্যাকাউন্ট নম্বরসমূহ সংরক্ষণ করা হয়েছে!', 'success');
                }}
                className="py-1.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs cursor-pointer shrink-0"
              >
                নম্বর সেভ করুন
              </button>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-400 font-bold">ফিল্টার:</span>
              {(['all', 'pending', 'approved', 'rejected'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setDepositFilter(st)}
                  className={`px-3 py-1 rounded-xl font-bold transition-all cursor-pointer ${
                    depositFilter === st
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {st === 'all' && 'অল ট্রানজেকশন'}
                  {st === 'pending' && 'পেন্ডিং'}
                  {st === 'approved' && 'অনুমোদিত'}
                  {st === 'rejected' && 'বাতিল'}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <select
                value={depositGatewayFilter}
                onChange={(e) => setDepositGatewayFilter(e.target.value as any)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-slate-300 text-xs cursor-pointer"
              >
                <option value="all">সব গেটওয়ে</option>
                <option value="bkash">বিকাশ</option>
                <option value="nagad">নগদ</option>
                <option value="rocket">রকেট</option>
                <option value="binance">বাইন্যান্স</option>
              </select>

              <input
                type="text"
                placeholder="ইউজার বা TrxID সার্চ..."
                value={depositSearch}
                onChange={(e) => setDepositSearch(e.target.value)}
                className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:border-amber-400"
              />
            </div>
          </div>

          {/* Deposits Table */}
          <div className="bg-slate-900/80 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="p-4">ইউজার ও ফোন</th>
                    <th className="p-4">গেটওয়ে</th>
                    <th className="p-4">প্রেরক / বাইন্যান্স আইডি</th>
                    <th className="p-4">গ্রহণকারী নম্বর</th>
                    <th className="p-4">পরিমাণ</th>
                    <th className="p-4">TrxID / Hash</th>
                    <th className="p-4">তারিখ ও সময়</th>
                    <th className="p-4">স্ট্যাটাস</th>
                    <th className="p-4 text-center">একশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/40 font-mono">
                  {deposits
                    .filter((d) => {
                      if (depositFilter !== 'all' && d.status !== depositFilter) return false;
                      if (depositGatewayFilter !== 'all' && d.gateway !== depositGatewayFilter) return false;
                      if (depositSearch) {
                        const s = depositSearch.toLowerCase();
                        return (
                          d.userName.toLowerCase().includes(s) ||
                          d.userPhone.includes(s) ||
                          d.trxId.toLowerCase().includes(s)
                        );
                      }
                      return true;
                    })
                    .map((dep) => (
                      <tr key={dep.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-4 font-sans">
                          <div className="font-bold text-white">{dep.userName}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{dep.userPhone}</div>
                        </td>
                        <td className="p-4 uppercase">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            dep.gateway === 'bkash' ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' :
                            dep.gateway === 'nagad' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                            dep.gateway === 'rocket' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                            'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                          }`}>
                            {dep.gateway}
                          </span>
                        </td>
                        <td className="p-4 font-sans text-xs text-slate-200">{dep.senderAccount}</td>
                        <td className="p-4 text-[11px] text-slate-400">{dep.targetAccount}</td>
                        <td className="p-4 font-bold text-emerald-400 text-sm">৳{dep.amount}</td>
                        <td className="p-4 text-amber-300 select-all font-bold">{dep.trxId}</td>
                        <td className="p-4 font-sans text-slate-400 text-[11px]">{dep.timestamp}</td>
                        <td className="p-4">
                          {dep.status === 'approved' && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                              ✓ অনুমোদিত
                            </span>
                          )}
                          {dep.status === 'pending' && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                              ⏳ পেন্ডিং
                            </span>
                          )}
                          {dep.status === 'rejected' && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                              ✕ বাতিল
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-center font-sans">
                          {dep.status === 'pending' ? (
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => updateDepositStatus(dep.id, 'approved')}
                                className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                              >
                                অ্যাপ্রুভ
                              </button>
                              <button
                                type="button"
                                onClick={() => updateDepositStatus(dep.id, 'rejected')}
                                className="px-2.5 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                              >
                                রিজেক্ট
                              </button>
                            </div>
                          ) : (
                            <span className="text-[11px] text-slate-500">সম্পন্ন</span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONTESTS CRUD */}
      {activeTab === 'contests' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">মোবাইল ও পুরস্কার ম্যানেজমেন্ট</h2>
              <p className="text-xs text-slate-400">নতুন মোবাইল যোগ করুন, বিবরণ বদলান বা ড্র স্ট্যাটাস নিয়ন্ত্রণ করুন</p>
            </div>
            <button
              onClick={() => {
                setEditingContestId(null);
                setFormBrand('Apple');
                setFormModel('iPhone 16 Pro Max');
                setFormMarketPrice('১,৯৫,০০০ টাকা');
                setFormEntryFee('৫০ টাকা');
                setFormImage('https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=80');
                setFormStatus('active');
                setFormFeatured(true);
                setShowAddContestModal(true);
              }}
              className="py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন মোবাইল যোগ করুন</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contests.map((c) => (
              <div key={c.id} className="bg-slate-900/90 rounded-3xl border border-slate-800 overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative aspect-video bg-slate-950">
                    <img src={c.image} alt={c.model} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/80 text-amber-400 border border-amber-500/40">
                      {c.brand}
                    </span>
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-slate-950">
                      {c.status}
                    </span>
                  </div>

                  <div className="p-5 space-y-2 text-xs">
                    <h3 className="font-bold text-white text-base">{c.model}</h3>
                    <div className="text-amber-300 font-mono">বাজার মূল্য: {c.marketPrice} | এন্ট্রি ফি: {c.entryFee}</div>
                    <div className="text-slate-400 space-y-0.5 pt-2 border-t border-slate-800">
                      <div>ডিসপ্লে: {c.specs.display}</div>
                      <div>ক্যামেরা: {c.specs.camera}</div>
                      <div>র‍্যাম/রম: {c.specs.ramRom}</div>
                      <div>প্রসেসর: {c.specs.processor}</div>
                      <div>মোট প্রতিযোগী: <span className="text-emerald-400 font-bold font-mono">{c.totalParticipants}</span> জন</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => startEditContest(c)}
                    className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>এডিট করুন</span>
                  </button>

                  <button
                    onClick={() => deleteContest(c.id)}
                    className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl text-xs transition-colors cursor-pointer"
                    title="ডিলিট করুন"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add/Edit Contest Modal */}
          {showAddContestModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
              <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-3xl p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
                <h3 className="text-xl font-bold text-white mb-4">
                  {editingContestId ? 'মোবাইলের তথ্য সম্পাদনা' : 'নতুন মোবাইল প্রাইজ যোগ করুন'}
                </h3>

                <form onSubmit={handleSaveContest} className="space-y-3.5 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">ব্র্যান্ড</label>
                      <input
                        type="text"
                        required
                        value={formBrand}
                        onChange={(e) => setFormBrand(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">মডেল নাম</label>
                      <input
                        type="text"
                        required
                        value={formModel}
                        onChange={(e) => setFormModel(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">বাজার মূল্য</label>
                      <input
                        type="text"
                        required
                        value={formMarketPrice}
                        onChange={(e) => setFormMarketPrice(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">এন্ট্রি ফি</label>
                      <input
                        type="text"
                        required
                        value={formEntryFee}
                        onChange={(e) => setFormEntryFee(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">স্ট্যাটাস</label>
                      <select
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value as any)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                      >
                        <option value="active">সক্রিয় (Active)</option>
                        <option value="upcoming">আসন্ন (Upcoming)</option>
                        <option value="completed">সম্পন্ন (Completed)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">ফিচার্ড ব্যানার</label>
                      <select
                        value={formFeatured ? 'true' : 'false'}
                        onChange={(e) => setFormFeatured(e.target.value === 'true')}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                      >
                        <option value="true">হ্যাঁ (হিরো ব্যানারে দেখান)</option>
                        <option value="false">না</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">ছবির লিঙ্ক (URL)</label>
                    <input
                      type="url"
                      required
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">ডিসপ্লে</label>
                      <input
                        type="text"
                        value={formDisplay}
                        onChange={(e) => setFormDisplay(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">র‍্যাম ও রম</label>
                      <input
                        type="text"
                        value={formRamRom}
                        onChange={(e) => setFormRamRom(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">ক্যামেরা</label>
                      <input
                        type="text"
                        value={formCamera}
                        onChange={(e) => setFormCamera(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">ব্যাটারি</label>
                      <input
                        type="text"
                        value={formBattery}
                        onChange={(e) => setFormBattery(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">প্রসেসর</label>
                    <input
                      type="text"
                      value={formProcessor}
                      onChange={(e) => setFormProcessor(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                    />
                  </div>

                  <div className="flex gap-2 pt-3">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs cursor-pointer"
                    >
                      সংরক্ষণ করুন
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddContestModal(false)}
                      className="py-2.5 px-4 bg-slate-800 text-slate-300 rounded-xl text-xs cursor-pointer"
                    >
                      বাতিল
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: TICKETS & TRANSACTIONS MANAGEMENT */}
      {activeTab === 'entries' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">টিকিট ও পেমেন্ট ট্রানজ্যাকশন ভেরিফিকেশন</h2>
              <p className="text-xs text-slate-400">সকল ফ্রি ও পেইড টিকিটের TrxID যাচাই করুন, অনুমোদন দিন অথবা বাতিল করুন</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="টিকিট বা TrxID খুঁজুন..."
                  value={entrySearchTerm}
                  onChange={(e) => setEntrySearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>

              <select
                value={entryStatusFilter}
                onChange={(e) => setEntryStatusFilter(e.target.value as any)}
                className="px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
              >
                <option value="all">সকল টিকিট ({entries.length})</option>
                <option value="pending">অপেক্ষমান ({entries.filter((e) => e.status === 'pending').length})</option>
                <option value="confirmed">কনফার্মড ({entries.filter((e) => e.status === 'confirmed').length})</option>
                <option value="rejected">বাতিল</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-3xl border border-slate-800 overflow-x-auto shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-4">টিকিট কোড</th>
                  <th className="p-4">মোবাইল কনটেস্ট</th>
                  <th className="p-4">অংশগ্রহণকারী</th>
                  <th className="p-4">পেমেন্ট / TrxID</th>
                  <th className="p-4">তারিখ</th>
                  <th className="p-4">স্ট্যাটাস</th>
                  <th className="p-4 text-right">ভেরিফিকেশন অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredEntries.map((ent) => (
                  <tr key={ent.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-mono font-bold text-amber-400 text-sm">
                      {ent.ticketNumber}
                    </td>
                    <td className="p-4 font-bold text-white">{ent.contestTitle}</td>
                    <td className="p-4">
                      <div>{ent.userName}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{ent.userPhone}</div>
                    </td>
                    <td className="p-4">
                      {ent.isFreeDemo ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300">
                          ফ্রি পাস
                        </span>
                      ) : (
                        <div>
                          <span className="font-bold uppercase text-emerald-400 font-mono">{ent.paymentMethod}: ৳{ent.paidAmount}</span>
                          <div className="text-[10px] font-mono text-amber-300 mt-0.5">Trx: {ent.trxId || 'N/A'}</div>
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-slate-400 text-[11px]">{ent.timestamp}</td>
                    <td className="p-4">
                      {ent.status === 'confirmed' && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                          ✓ অনুমোদিত
                        </span>
                      )}
                      {ent.status === 'pending' && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 animate-pulse">
                          ⏳ যাচাইাধীন
                        </span>
                      )}
                      {ent.status === 'rejected' && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40">
                          ✕ বাতিল
                        </span>
                      )}
                      {ent.status === 'winner' && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950">
                          🏆 বিজয়ী
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right space-x-1.5">
                      {ent.status !== 'confirmed' && (
                        <button
                          onClick={() => updateEntryStatus(ent.id, 'confirmed')}
                          className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                          title="অনুমোদন করুন"
                        >
                          <Check className="w-3.5 h-3.5 inline mr-1" />
                          কনফার্ম
                        </button>
                      )}
                      {ent.status !== 'rejected' && (
                        <button
                          onClick={() => updateEntryStatus(ent.id, 'rejected')}
                          className="px-2 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                          title="বাতিল করুন"
                        >
                          <X className="w-3.5 h-3.5 inline mr-1" />
                          বাতিল
                        </button>
                      )}
                      <button
                        onClick={() => deleteEntry(ent.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg cursor-pointer transition-colors"
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: LIVE DRAW & WINNER MANAGEMENT */}
      {activeTab === 'winners' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Live Wheel of Fortune (হুইল অফ ফরচুন / লাকি ড্র চাক্কি) Card */}
            <div className="lg:col-span-6 bg-gradient-to-b from-slate-900 to-[#120E2E] p-6 sm:p-7 rounded-3xl border border-amber-500/40 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
                    🎡
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">
                      হুইল অফ ফরচুন (Wheel of Fortune)
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      আকর্ষণীয় লাইভ স্পিন চাক্কি ঘুরিয়ে বিজয়ী নির্বাচন ও ঘোষণা করুন
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-xl text-xs font-black border ${
                    siteSettings.luckyWheelEnabled !== false
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                      : 'bg-rose-500/15 border-rose-500/30 text-rose-400'
                  }`}>
                    {siteSettings.luckyWheelEnabled !== false ? '● ড্র চালু (ON)' : '○ ড্র বন্ধ (OFF)'}
                  </span>
                </div>
              </div>

              {/* Admin Wheel Master ON/OFF Switch */}
              <div className="p-4 bg-slate-950/90 rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-inner">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    siteSettings.luckyWheelEnabled !== false
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  }`}>
                    <Power className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs sm:text-sm flex items-center gap-2">
                      <span>পাবলিক সাইটে লাকি হুইল ড্র কন্ট্রোল:</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                        siteSettings.luckyWheelEnabled !== false
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-rose-500 text-white'
                      }`}>
                        {siteSettings.luckyWheelEnabled !== false ? 'বর্তমানে চালু (ON)' : 'বর্তমানে বন্ধ (OFF)'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {siteSettings.luckyWheelEnabled !== false
                        ? 'সাধারণ ব্যবহারকারীরা হোমপেজ ও মেনু থেকে লাইভ লাকি হুইল দেখতে ও ড্র উপভোগ করতে পারছেন।'
                        : 'ওয়েবসাইটে লাকি হুইল বন্ধ রাখা হয়েছে। বন্ধ থাকা অবস্থায় ইউজারদের নোটিশ দেখানো হবে।'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleLuckyWheel()}
                  className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                    siteSettings.luckyWheelEnabled !== false
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>{siteSettings.luckyWheelEnabled !== false ? 'হুইল ড্র বন্ধ করুন (OFF)' : 'হুইল ড্র চালু করুন (ON)'}</span>
                </button>
              </div>

              {/* Contest Selector & Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    কোন মোবাইলের ড্র করবেন?
                  </label>
                  <select
                    value={selectedContestForWinner}
                    onChange={(e) => {
                      setSelectedContestForWinner(e.target.value);
                      setDrawnWheelWinner(null);
                    }}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:border-amber-400"
                  >
                    {contests.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.brand} {c.model} ({c.totalParticipants} জন)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    ড্র এর ধরন (Selection Mode)
                  </label>
                  <select
                    value={wheelMode}
                    onChange={(e) => setWheelMode(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium focus:border-amber-400"
                  >
                    <option value="random">🎲 ১০০% নিরপেক্ষ র‍্যান্ডম ড্র</option>
                    <option value="targeted">🎯 অ্যাডমিন নির্দিষ্ট বিজয়ী (Targeted)</option>
                  </select>
                </div>
              </div>

              {/* If targeted mode, choose specific winner */}
              {wheelMode === 'targeted' && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl space-y-1.5 text-xs animate-fade-in">
                  <label className="block text-amber-300 font-bold">
                    🎯 হুইলটি যে বিজয়ীর উপর গিয়ে থামবে:
                  </label>
                  <select
                    value={targetCandidateIndex}
                    onChange={(e) => setTargetCandidateIndex(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-amber-500/40 rounded-lg text-white font-mono"
                  >
                    {((entries.filter((e) => e.contestId === selectedContestForWinner && e.status !== 'rejected').length >= 2
                      ? entries.filter((e) => e.contestId === selectedContestForWinner && e.status !== 'rejected').slice(0, 10).map((e) => ({
                          id: e.id,
                          name: e.userName,
                          ticketNumber: e.ticketNumber,
                          phone: e.userPhone,
                        }))
                      : [
                          { id: '1', name: 'মোঃ তানভীর আহমেদ', ticketNumber: 'TKT-78291', phone: '০১৭১১-****৮৯' },
                          { id: '2', name: 'ফারহানা ইসলাম তন্বী', ticketNumber: 'TKT-45210', phone: '০১৮২২-****১২' },
                          { id: '3', name: 'সাকিব আল হাসান', ticketNumber: 'TKT-90184', phone: '০১৯১১-****৪৫' },
                          { id: '4', name: 'কামরুল ইসলাম', ticketNumber: 'TKT-33419', phone: '০১৭০১-****১২' },
                          { id: '5', name: 'নুসরাত জাহান মিম', ticketNumber: 'TKT-88123', phone: '০১৮১২-****৩৪' },
                          { id: '6', name: 'রাকিবুল হাসান', ticketNumber: 'TKT-67018', phone: '০১৯১৫-****৭৮' },
                        ]
                    )).map((cand, idx) => (
                      <option key={cand.id} value={idx}>
                        #{idx + 1}: {cand.name} ({cand.ticketNumber})
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-slate-400">
                    * হুইলটি স্বাভাবিকভাবে ফুল স্পিডে ঘুরবে এবং রিয়ালিস্টিক ফিজিক্সে ঠিক এই সেগমেন্টে থামবে।
                  </p>
                </div>
              )}

              {/* The Interactive Wheel Component */}
              <div className="py-2 flex justify-center">
                <LuckyWheel
                  candidates={
                    entries.filter((e) => e.contestId === selectedContestForWinner && e.status !== 'rejected').length >= 2
                      ? entries.filter((e) => e.contestId === selectedContestForWinner && e.status !== 'rejected').slice(0, 10).map((e) => ({
                          id: e.id,
                          name: e.userName,
                          ticketNumber: e.ticketNumber,
                          phone: e.userPhone.substring(0, 5) + '-****' + e.userPhone.substring(e.userPhone.length - 2),
                        }))
                      : [
                          { id: '1', name: 'মোঃ তানভীর আহমেদ', ticketNumber: 'TKT-78291', phone: '০১৭১১-****৮৯' },
                          { id: '2', name: 'ফারহানা ইসলাম তন্বী', ticketNumber: 'TKT-45210', phone: '০১৮২২-****১২' },
                          { id: '3', name: 'সাকিব আল হাসান', ticketNumber: 'TKT-90184', phone: '০১৯১১-****৪৫' },
                          { id: '4', name: 'কামরুল ইসলাম', ticketNumber: 'TKT-33419', phone: '০১৭০১-****১২' },
                          { id: '5', name: 'নুসরাত জাহান মিম', ticketNumber: 'TKT-88123', phone: '০১৮১২-****৩৪' },
                          { id: '6', name: 'রাকিবুল হাসান', ticketNumber: 'TKT-67018', phone: '০১৯১৫-****৭৮' },
                        ]
                  }
                  targetIndex={wheelMode === 'targeted' ? targetCandidateIndex : null}
                  onWinnerSelected={(winner) => {
                    setDrawnWheelWinner(winner);
                    setCustomWinnerName(winner.name);
                  }}
                  prizeTitle={`${contests.find((c) => c.id === selectedContestForWinner)?.brand || 'Samsung'} ড্র`}
                />
              </div>

              {/* Publish Result Button */}
              {drawnWheelWinner && (
                <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl space-y-3 animate-fade-in text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-300">
                      হুইল ফলাফল প্রস্তুত: <b>{drawnWheelWinner.name} ({drawnWheelWinner.ticketNumber})</b>
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-500 text-slate-950 font-black rounded text-[10px]">
                      বিজয়ী
                    </span>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">
                      বিজয়ীর অনুভূতি / গল্প (ওয়েবসাইটে যেমন দেখাবে)
                    </label>
                    <textarea
                      rows={2}
                      value={customWinnerStory}
                      onChange={(e) => setCustomWinnerStory(e.target.value)}
                      placeholder="লাইভ হুইল অফ ফরচুন ভাগ্যচক্র ঘুরিয়ে ড্র অনুষ্ঠিত হয়েছে। বিজয়ী সততার সাথে মোবাইল পুরস্কার গ্রহণ করেছেন।"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white resize-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handlePublishWheelWinner}
                    className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Trophy className="w-4 h-4 text-slate-950" />
                    <span>🏆 এই ফলাফলটি অফিশিয়াল বিজয়ী হিসেবে ওয়েবসাইটে প্রকাশ করুন</span>
                  </button>
                </div>
              )}

            </div>

            {/* Published Winners list */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-lg font-bold text-white">বর্তমানে প্রকাশিত বিজয়ীদের তালিকা</h3>
              <div className="space-y-3">
                {winners.map((w) => (
                  <div key={w.id} className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 flex items-start gap-4">
                    <img src={w.userPhoto} alt={w.winnerName} className="w-14 h-14 rounded-xl object-cover border border-amber-500/40 shrink-0" />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">{w.winnerName}</span>
                        <span className="font-mono text-amber-400 font-bold">{w.ticketNumber}</span>
                      </div>
                      <div className="text-amber-300 font-semibold mt-0.5">{w.prizeModel}</div>
                      <p className="text-slate-400 mt-1 line-clamp-2 italic">"{w.story}"</p>
                      <div className="text-[11px] text-slate-500 mt-1">স্থান: {w.location} | তারিখ: {w.wonDate}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB: GOVERNMENT LEGAL CERTIFICATES & VALIDATION PORTAL MANAGEMENT */}
      {activeTab === 'certifications' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">সরকারি কাগজপত্র ও সনদ ম্যানেজমেন্ট</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  LEGAL VERIFIED
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                সিটি কর্পোরেশন ট্রেড লাইসেন্স, জাতীয় রাজস্ব বোর্ড (NBR) ই-টিআইএন, বিআইএন/ভ্যাট ও জয়েন্ট স্টক কোম্পানি (RJSC) সনদ যুক্ত ও এডিট করুন
              </p>
            </div>

            <button
              onClick={startAddDoc}
              className="py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 cursor-pointer shrink-0 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন সরকারি সনদ যুক্ত করুন</span>
            </button>
          </div>

          {/* Quick Notice Info */}
          <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl flex items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                এখানে সংরক্ষিত সকল বৈধ কাগজপত্র মূল ওয়েবসাইটের <b>"সরকারি অনুমোদন"</b> সেকশন ও হেডারের ভেরিফিকেশন লিঙ্কে সাধারণ গ্রাহকদের জন্য লাইভ প্রদর্শিত হবে।
              </span>
            </div>
            <span className="font-mono font-bold text-emerald-400 shrink-0">মোট {legalDocsList.length} টি সনদ</span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {legalDocsList.map((doc) => (
              <div
                key={doc.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 rounded-3xl p-5 space-y-4 transition-all relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                      <FileCheck2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base leading-snug">{doc.title}</h3>
                      <p className="text-xs text-slate-400">{doc.issuingAuthority}</p>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    doc.verified
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                  }`}>
                    {doc.verified ? '✓ ভেরিফাইড' : 'প্রক্রিয়াধীন'}
                  </span>
                </div>

                {/* Details box */}
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">লাইসেন্স / সনদ নম্বর:</span>
                    <span className="font-mono font-bold text-amber-300">{doc.documentNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">ইস্যুর তারিখ / মেয়াদ:</span>
                    <span className="text-slate-300">{doc.issueDate} {doc.expiryDate ? `• (${doc.expiryDate})` : ''}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">ধরন:</span>
                    <span className="text-slate-300 capitalize">{doc.documentType}</span>
                  </div>
                  {doc.description && (
                    <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                      {doc.description}
                    </p>
                  )}
                </div>

                {/* Document Preview Thumbnail */}
                {doc.fileUrl && (
                  <div className="relative h-24 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                    <img src={doc.fileUrl} alt={doc.title} className="w-full h-full object-cover filter contrast-105 opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-2">
                      <span className="text-[10px] text-slate-300 font-mono">সনদ স্ক্যান প্রিভিউ</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    onClick={() => startEditDoc(doc)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>এডিট করুন</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`আপনি কি নিশ্চিতভাবে '${doc.title}' মুছে ফেলতে চান?`)) {
                        deleteLegalDocument(doc.id);
                      }
                    }}
                    className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>ডিলিট</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add / Edit Legal Document Modal */}
          {showDocModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
              <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-7 max-w-lg w-full space-y-4 text-xs max-h-[92vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-base font-bold text-white">
                      {editingDocId ? 'সরকারি সনদ এডিট করুন' : 'নতুন সরকারি সনদ ও লাইসেন্স যোগ করুন'}
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowDocModal(false)}
                    className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveDoc} className="space-y-3.5">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">সনদ / লাইসেন্সের শিরোনাম *</label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: সিটি কর্পোরেশন ই-ট্রেড লাইসেন্স"
                      value={docFormTitle}
                      onChange={(e) => setDocFormTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:border-emerald-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">সনদের ধরন</label>
                      <select
                        value={docFormType}
                        onChange={(e) => setDocFormType(e.target.value as any)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:border-emerald-400"
                      >
                        <option value="trade_license">ট্রেড লাইসেন্স</option>
                        <option value="tin">ই-টিআইএন সনদ</option>
                        <option value="bin_vat">বিআইএন / ভ্যাট</option>
                        <option value="rjsc">কোম্পানি সনদ (RJSC)</option>
                        <option value="other">অন্যান্য সরকারি সনদ</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">লাইসেন্স / সনদ নম্বর *</label>
                      <input
                        type="text"
                        required
                        placeholder="যেমন: TRAD/DSCC/028491/2024"
                        value={docFormNumber}
                        onChange={(e) => setDocFormNumber(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-xs focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">ইস্যুকারী কর্তৃপক্ষ</label>
                    <input
                      type="text"
                      placeholder="যেমন: ঢাকা দক্ষিণ সিটি কর্পোরেশন / জাতীয় রাজস্ব বোর্ড"
                      value={docFormAuthority}
                      onChange={(e) => setDocFormAuthority(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:border-emerald-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">ইস্যুর তারিখ</label>
                      <input
                        type="text"
                        placeholder="০১ জুলাই ২০২৪"
                        value={docFormIssueDate}
                        onChange={(e) => setDocFormIssueDate(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">মেয়াদ উত্তীর্ণ / নবায়ন</label>
                      <input
                        type="text"
                        placeholder="৩০ জুন ২০২৫ (নবায়নকৃত)"
                        value={docFormExpiryDate}
                        onChange={(e) => setDocFormExpiryDate(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">সনদের স্ক্যান বা ছবির লিঙ্ক (URL)</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={docFormFileUrl}
                      onChange={(e) => setDocFormFileUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">সংক্ষিপ্ত বিবরণ ও আইনি ভিত্তি</label>
                    <textarea
                      rows={2}
                      placeholder="ডিজিটাল ই-কমার্স ও প্রচারমূলক কনটেস্ট পরিচালনার জন্য অনুমোদিত ট্রেড লাইসেন্স..."
                      value={docFormDescription}
                      onChange={(e) => setDocFormDescription(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="docVerified"
                      checked={docFormVerified}
                      onChange={(e) => setDocFormVerified(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 bg-slate-950 border-slate-700 cursor-pointer"
                    />
                    <label htmlFor="docVerified" className="text-slate-300 text-xs cursor-pointer">
                      এই সনদটি ১০০% ভেরিফাইড এবং গ্রাহকদের কাছে ভেরিফাইড ব্যাজসহ প্রদর্শিত হবে
                    </label>
                  </div>

                  <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setShowDocModal(false)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs cursor-pointer shadow-lg shadow-emerald-500/20"
                    >
                      {editingDocId ? 'সনদ আপডেট করুন' : 'সনদ সংরক্ষণ করুন'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB: CLIENT CUSTOM FIREBASE PROJECT CONFIGURATION */}
      {activeTab === 'firebase' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">নিজস্ব ফায়ারবেস ডাটাবেজ প্রজেক্ট কনফিগারেশন</h2>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                  isCustomFirebase
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                }`}>
                  {isCustomFirebase ? '🟢 ক্লায়েন্ট নিজস্ব ডাটাবেজ সক্রিয়' : '🔵 প্ল্যাটফর্ম ডিফল্ট ডাটাবেজ'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                প্রতিটি ক্লায়েন্ট তাদের নিজস্ব গুগল ফায়ারবেস প্রজেক্টের সাথে ওয়েবসাইট যুক্ত করে সম্পূর্ণ আলাদা ডাটাবেজ নিয়ন্ত্রণ করতে পারেন।
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={syncAllDataToActiveFirebase}
                className="py-2.5 px-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer"
                title="বর্তমান সকল ইউজার ও টিকিট সক্রিয় ফায়ারবেসে আপলোড করুন"
              >
                <Server className="w-4 h-4" />
                <span>ডেটা সিঙ্ক / মাইগ্রেট করুন</span>
              </button>
            </div>
          </div>

          {/* Active Database Status Card */}
          <div className="bg-gradient-to-r from-slate-900 via-[#101A35] to-slate-900 p-5 rounded-3xl border border-amber-500/30 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">বর্তমানে সক্রিয় ফায়ারবেস প্রজেক্ট:</div>
                  <div className="text-lg font-black text-white font-mono flex items-center gap-2">
                    <span>{activeFirebaseConfig.projectId}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-sans">
                      সংযুক্ত (Connected)
                    </span>
                  </div>
                </div>
              </div>

              {isCustomFirebase && (
                <button
                  type="button"
                  onClick={resetToDefaultFirebase}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/30 hover:border-rose-500/60 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-rose-400" />
                  <span>ডিফল্ট ডাটাবেজে রিসেট</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2 border-t border-slate-800/80">
              <div className="p-2.5 bg-slate-950/70 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">ডাটাবেজ মোড</span>
                <span className="font-bold text-amber-400">{isCustomFirebase ? 'ক্লায়েন্ট কাস্টম' : 'প্ল্যাটফর্ম ডিফল্ট'}</span>
              </div>
              <div className="p-2.5 bg-slate-950/70 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Database ID</span>
                <span className="font-bold text-slate-200 font-mono truncate block">{activeFirebaseConfig.firestoreDatabaseId || '(default)'}</span>
              </div>
              <div className="p-2.5 bg-slate-950/70 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Auth Domain</span>
                <span className="font-bold text-slate-200 font-mono truncate block">{activeFirebaseConfig.authDomain || 'N/A'}</span>
              </div>
              <div className="p-2.5 bg-slate-950/70 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Web App ID</span>
                <span className="font-bold text-slate-200 font-mono truncate block">{activeFirebaseConfig.appId ? activeFirebaseConfig.appId.substring(0, 16) + '...' : 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 7 cols: Configuration Form & Code Parser */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* One-click Auto Paste Box */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <h3 className="font-bold text-white text-sm">এক-ক্লিকে কনফিগারেশন কোড পেস্ট</h3>
                  </div>
                  <span className="text-[11px] text-slate-400">Firebase Web App Config Snippet</span>
                </div>

                <textarea
                  rows={3}
                  value={fbRawConfigPaste}
                  onChange={(e) => setFbRawConfigPaste(e.target.value)}
                  placeholder={`// Firebase Console থেকে সম্পূর্ণ কোডটি এখানে পেস্ট করুন, যেমন:\nconst firebaseConfig = {\n  apiKey: "AIzaSy...",\n  authDomain: "my-app.firebaseapp.com",\n  projectId: "my-app",\n  appId: "1:..."\n};`}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono resize-none focus:border-amber-400"
                />

                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-slate-400">কোড পেস্ট করে নিচের বাটনে ক্লিক করলে সকল ফিল্ডে স্বয়ংক্রিয়ভাবে তথ্য বসে যাবে।</p>
                  <button
                    type="button"
                    onClick={handleParseRawFirebaseSnippet}
                    className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs cursor-pointer shadow-md transition-all shrink-0 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>অটো-ফিল করুন</span>
                  </button>
                </div>
              </div>

              {/* Detailed Form */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4">
                <h3 className="font-bold text-white text-sm pb-2 border-b border-slate-800 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>ক্লায়েন্ট ফায়ারবেস প্রজেক্ট প্যারামিটার</span>
                </h3>

                <form onSubmit={handleSaveAndActivateFirebase} className="space-y-3.5 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Project ID (প্রোজেক্ট আইডি) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="যেমন: my-lottery-portal"
                        value={fbProjectId}
                        onChange={(e) => setFbProjectId(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Web API Key (এপিআই কি) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="যেমন: AIzaSy..."
                        value={fbApiKey}
                        onChange={(e) => setFbApiKey(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Auth Domain (অথ ডোমেইন) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="যেমন: my-lottery-portal.firebaseapp.com"
                        value={fbAuthDomain}
                        onChange={(e) => setFbAuthDomain(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        App ID (অ্যাপ আইডি) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="যেমন: 1:123456789:web:abcdef..."
                        value={fbAppId}
                        onChange={(e) => setFbAppId(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Storage Bucket (ঐচ্ছিক)
                      </label>
                      <input
                        type="text"
                        placeholder="my-lottery-portal.appspot.com"
                        value={fbStorageBucket}
                        onChange={(e) => setFbStorageBucket(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Sender ID (ঐচ্ছিক)
                      </label>
                      <input
                        type="text"
                        placeholder="যেমন: 1234567890"
                        value={fbMessagingSenderId}
                        onChange={(e) => setFbMessagingSenderId(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Firestore Database ID
                      </label>
                      <input
                        type="text"
                        placeholder="(default)"
                        value={fbFirestoreDbId}
                        onChange={(e) => setFbFirestoreDbId(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {/* Test Result Message Box */}
                  {testResult && (
                    <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed animate-fade-in ${
                      testResult.success
                        ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                        : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                    }`}>
                      <div className="flex items-center gap-2 font-bold mb-0.5">
                        {testResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-rose-400" />}
                        <span>{testResult.success ? 'টেস্ট সফল (Connected)' : 'টেস্ট ব্যর্থ (Connection Failed)'}</span>
                      </div>
                      <p>{testResult.message}</p>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      disabled={isTestingFbConnection}
                      onClick={handleTestFirebaseConnection}
                      className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                      <Search className="w-4 h-4 text-amber-400" />
                      <span>{isTestingFbConnection ? 'টেস্ট করা হচ্ছে...' : '🔍 লাইভ কানেকশন টেস্ট'}</span>
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>💾 এই ডাটাবেজ সংরক্ষণ ও সক্রিয় করুন</span>
                    </button>
                  </div>
                </form>
              </div>

            </div>

            {/* Right 5 cols: Step-by-Step Client Guide */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 text-xs">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <HelpCircle className="w-5 h-5 text-amber-400" />
                  <span>ক্লায়েন্টের জন্য ফায়ারবেস সেটআপ গাইড</span>
                </div>

                <p className="text-slate-300 leading-relaxed">
                  আপনার নিজস্ব ফায়ারবেস ক্লাউড ডাটাবেজ তৈরি করে এই ওয়েবসাইটের সাথে যুক্ত করতে মাত্র ৩-৪ মিনিট সময় লাগে:
                </p>

                <div className="space-y-3">
                  <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800 space-y-1">
                    <div className="font-bold text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-black">১</span>
                      <span>Firebase Console-এ যান</span>
                    </div>
                    <p className="text-slate-400 text-[11px] pl-7">
                      আপনার ব্রাউজারে <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-amber-400 underline">console.firebase.google.com</a> ওপেন করুন এবং <b>"Create a project"</b> এ ক্লিক করে পছন্দমতো নাম দিন।
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800 space-y-1">
                    <div className="font-bold text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-black">২</span>
                      <span>Firestore Database তৈরি করুন</span>
                    </div>
                    <p className="text-slate-400 text-[11px] pl-7">
                      বাম পাশের <b>Build &gt; Firestore Database</b> এ গিয়ে <b>"Create database"</b> সিলেক্ট করুন। টেস্ট বা প্রোডাকশন মোডে রিড/রাইট পারমিশন সক্রিয় রাখুন।
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800 space-y-1">
                    <div className="font-bold text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-black">৩</span>
                      <span>Web App যোগ করে কনফিগ নিন</span>
                    </div>
                    <p className="text-slate-400 text-[11px] pl-7">
                      <b>Project Settings &gt; General</b> এ যান। নিচে <b>"Your apps"</b> সেকশনে <b>Web (&lt;/&gt;)</b> আইকনে ক্লিক করে একটি নাম দিন।
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800 space-y-1">
                    <div className="font-bold text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-black">৪</span>
                      <span>কোডটি পেস্ট ও সক্রিয় করুন</span>
                    </div>
                    <p className="text-slate-400 text-[11px] pl-7">
                      প্রদর্শিত <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-300">firebaseConfig</code> অবজেক্টটি কপি করে বাম পাশের পেস্ট বক্সে দিন এবং <b>"অটো-ফিল করুন"</b> চেপে সেভ দিন।
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-blue-950/40 rounded-2xl border border-blue-500/30 text-[11px] text-blue-200 leading-relaxed">
                  💡 <b>স্বাধীন ডাটাবেজের সুবিধা:</b> ক্লায়েন্ট তার নিজস্ব ফায়ারবেস ব্যবহার করলে সকল গ্রাহক রেজিস্ট্রেশন, এন্ট্রি টিকিট ও পেমেন্ট রিকোয়েস্ট সরাসরি তার ব্যক্তিগত ডাটাবেজে জমা হবে, যা সম্পূর্ণ ব্যক্তিগত ও নিরাপদ।
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 5: USER DATABASE MANAGEMENT & AUTO-APPROVE CONTROL */}
      {activeTab === 'users' && (
        <div className="space-y-6">

          {/* Master Control Card: User Sign-up Auto-Approve System */}
          <div className="bg-gradient-to-r from-slate-900 via-[#101935] to-slate-900 border border-amber-500/30 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${siteSettings.autoApproveUserRegistration !== false ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 flex-wrap">
                  <span>ইউজার সাইন আপ অটো অ্যাপ্রুভ (Auto-Approve System)</span>
                  <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${
                    siteSettings.autoApproveUserRegistration !== false
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}>
                    {siteSettings.autoApproveUserRegistration !== false ? '● অটো-অ্যাপ্রুভ চালু (ON)' : '○ ম্যানুয়াল অনুমোদন (OFF)'}
                  </span>
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {siteSettings.autoApproveUserRegistration !== false
                  ? 'চালু রয়েছে: নতুন কোনো ব্যবহারকারী সাইন আপ করলে অ্যাকাউন্ট স্বয়ংক্রিয়ভাবে সক্রিয় (Active) হয়ে যাবে এবং সে সাথে সাথে লগইন ও টিকিট সংগ্রহ করতে পারবে।'
                  : 'বন্ধ রয়েছে: নতুন কোনো ব্যবহারকারী সাইন আপ করলে অ্যাকাউন্টটি "অপেক্ষমাণ (Pending)" থাকবে। অ্যাডমিন নিচে থেকে "অনুমোদন (Approve)" করলেই কেবল সে লগইন করতে পারবে।'}
              </p>
              {pendingUsersCount > 0 && (
                <div className="flex items-center gap-2 text-xs text-amber-300 font-bold bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl w-fit mt-1">
                  <Clock className="w-4 h-4 text-amber-400 animate-spin" />
                  <span>বর্তমানে {pendingUsersCount} জন নতুন ইউজার আপনার অনুমোদনের অপেক্ষায় রয়েছে!</span>
                </div>
              )}
            </div>

            {/* Toggle Switch */}
            <div className="flex items-center gap-3 shrink-0 bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
              <span className={`text-xs font-bold ${siteSettings.autoApproveUserRegistration !== false ? 'text-emerald-400' : 'text-slate-400'}`}>
                {siteSettings.autoApproveUserRegistration !== false ? 'সিস্টেম চালু (ON)' : 'সিস্টেম বন্ধ (OFF)'}
              </span>
              <button
                type="button"
                onClick={() => toggleAutoApproveRegistration()}
                className={`relative inline-flex h-8 w-15 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  siteSettings.autoApproveUserRegistration !== false ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'bg-slate-700'
                }`}
                title="অটো অ্যাপ্রুভ অন / অফ করুন"
              >
                <span
                  className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    siteSettings.autoApproveUserRegistration !== false ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* User Filtering & Search Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Status Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: `সকল ইউজার (${users.length})` },
                { id: 'pending', label: `অপেক্ষমাণ অনুমোদন (${pendingUsersCount})`, highlight: pendingUsersCount > 0 },
                { id: 'active', label: `সক্রিয় (${users.filter((u) => u.status === 'active').length})` },
                { id: 'blocked', label: `স্থগিত/ব্লকড (${users.filter((u) => u.status === 'blocked').length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setUserStatusFilter(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    userStatusFilter === tab.id
                      ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                      : tab.highlight
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 hover:bg-amber-500/30'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddUserModal(true)}
                className="py-2 px-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>নতুন ইউজার তৈরি</span>
              </button>

              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="নাম, ফোন বা ইমেইল খুঁজুন..."
                  value={userSearchTerm}
                  onChange={(e) => setUserSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-3xl border border-slate-800 overflow-x-auto shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-4">ব্যবহারকারী ও ইমেইল</th>
                  <th className="p-4">রোল / পারমিশন</th>
                  <th className="p-4">মোবাইল নম্বর</th>
                  <th className="p-4">পাসওয়ার্ড</th>
                  <th className="p-4">জেলা</th>
                  <th className="p-4">টিকিট</th>
                  <th className="p-4">স্ট্যাটাস</th>
                  <th className="p-4 text-right">অনুমোদন ও অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-400">
                      কোনো ব্যবহারকারী পাওয়া যায়নি।
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <span>{u.name}</span>
                          {u.role === 'admin' && (
                            <span className="text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/40 px-1.5 py-0.2 rounded font-bold">
                              মাস্টার
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500">{u.email}</div>
                      </td>
                      <td className="p-4">
                        {u.role === 'admin' ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1 w-fit">
                            <ShieldAlert className="w-3 h-3 text-rose-400" />
                            অ্যাডমিন
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700 w-fit">
                            গ্রাহক (User)
                          </span>
                        )}
                      </td>
                      <td className="p-4 font-mono text-amber-300">{u.phone}</td>
                      <td className="p-4 font-mono text-slate-400 tracking-widest">••••••</td>
                      <td className="p-4">{u.district}</td>
                      <td className="p-4 font-bold font-mono text-amber-400">{u.totalEntriesCount} টি</td>
                      <td className="p-4">
                        {u.status === 'active' && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 w-fit">
                            <CheckCircle2 className="w-3 h-3" />
                            সক্রিয়
                          </span>
                        )}
                        {u.status === 'pending' && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/50 flex items-center gap-1 w-fit animate-pulse">
                            <Clock className="w-3 h-3 text-amber-400" />
                            অপেক্ষমাণ অনুমোদন
                          </span>
                        )}
                        {u.status === 'blocked' && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1 w-fit">
                            <XCircle className="w-3 h-3" />
                            স্থগিত/ব্লকড
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                        {u.status === 'pending' && (
                          <>
                            <button
                              onClick={() => approveUser(u.id)}
                              className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg text-[11px] font-bold shadow transition-all cursor-pointer inline-flex items-center gap-1"
                              title="ইউজার অনুমোদন করুন"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>অনুমোদন করুন</span>
                            </button>
                            <button
                              onClick={() => rejectUser(u.id)}
                              className="px-2.5 py-1 bg-slate-800 hover:bg-rose-950/60 text-rose-300 border border-rose-500/30 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer inline-flex items-center gap-1"
                              title="প্রত্যাখ্যান করুন"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>প্রত্যাখ্যান</span>
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleStartEditUser(u)}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                        >
                          এডিট
                        </button>
                        {u.status !== 'pending' && (
                          <button
                            onClick={() => toggleUserStatus(u.id)}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                          >
                            {u.status === 'active' ? 'ব্লক' : 'সক্রিয়'}
                          </button>
                        )}
                        {u.role !== 'admin' && (
                          <button
                            onClick={() => deleteUser(u.id)}
                            className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer inline-block align-middle"
                            title="ইউজার ডিলিট করুন"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Add User Modal */}
          {showAddUserModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
              <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 max-w-md w-full space-y-4 text-xs">
                <h3 className="text-base font-bold text-white">ইউজার ডাটাবেসে নতুন অ্যাকাউন্ট যোগ করুন</h3>
                <form onSubmit={handleCreateNewUser} className="space-y-3">
                  <div>
                    <label className="block text-slate-300 mb-1">পুরো নাম</label>
                    <input
                      type="text"
                      required
                      placeholder="ব্যবহারকারীর পুরো নাম লিখুন"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">মোবাইল নম্বর</label>
                    <input
                      type="text"
                      required
                      placeholder="০১৭১১-xxxxxx"
                      value={newUserPhone}
                      onChange={(e) => setNewUserPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">ইমেইল (ঐচ্ছিক)</label>
                    <input
                      type="email"
                      placeholder="user@example.com"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">লগইন পাসওয়ার্ড</label>
                    <input
                      type="text"
                      required
                      value={newUserPassword}
                      onChange={(e) => setNewUserPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">জেলা</label>
                    <select
                      value={newUserDistrict}
                      onChange={(e) => setNewUserDistrict(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                    >
                      <option value="ঢাকা">ঢাকা</option>
                      <option value="চট্টগ্রাম">চট্টগ্রাম</option>
                      <option value="সিলেট">সিলেট</option>
                      <option value="রাজশাহী">রাজশাহী</option>
                      <option value="খুলনা">খুলনা</option>
                      <option value="বরিশাল">বরিশাল</option>
                      <option value="রংপুর">রংপুর</option>
                    </select>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button type="submit" className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl cursor-pointer">
                      সংরক্ষণ করুন
                    </button>
                    <button type="button" onClick={() => setShowAddUserModal(false)} className="py-2.5 px-4 bg-slate-800 text-slate-300 rounded-xl cursor-pointer">
                      বাতিল
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Edit User Modal */}
          {editingUser && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
              <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 max-w-sm w-full space-y-4 text-xs">
                <h3 className="text-base font-bold text-white">ব্যবহারকারীর তথ্য ও পাসওয়ার্ড সম্পাদনা</h3>
                <form onSubmit={handleSaveEditUser} className="space-y-3">
                  <div>
                    <label className="block text-slate-300 mb-1">নাম</label>
                    <input
                      type="text"
                      required
                      value={editUserName}
                      onChange={(e) => setEditUserName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">মোবাইল</label>
                    <input
                      type="text"
                      required
                      value={editUserPhone}
                      onChange={(e) => setEditUserPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">লগইন পাসওয়ার্ড</label>
                    <input
                      type="password"
                      required
                      value={editUserPassword}
                      onChange={(e) => setEditUserPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">রোল / পারমিশন</label>
                    <select
                      value={editUserRole}
                      onChange={(e) => setEditUserRole(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                    >
                      <option value="user">সাধারণ ইউজার (User)</option>
                      <option value="admin">অ্যাডমিনিস্ট্রেটর (Admin)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1">জেলা</label>
                    <input
                      type="text"
                      required
                      value={editUserDistrict}
                      onChange={(e) => setEditUserDistrict(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button type="submit" className="flex-1 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl cursor-pointer">
                      আপডেট করুন
                    </button>
                    <button type="button" onClick={() => setEditingUser(null)} className="py-2 px-3 bg-slate-800 text-slate-300 rounded-xl cursor-pointer">
                      বাতিল
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 6: WEBSITE & BRANDING CUSTOMIZATION */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">ওয়েবসাইটের সম্পূর্ণ লেখা ও ডিজাইন কাস্টমাইজেশন</h2>
              <p className="text-xs text-slate-400">
                সাইটের শিরোনাম, ট্যাগলাইন, হিরো ব্যানার, ছবি, হেল্পলাইন নম্বর ও পেমেন্ট নম্বর ইচ্ছেমতো পরিবর্তন করুন।
              </p>
            </div>

            <form onSubmit={handleSaveAllSettings} className="space-y-5 text-xs">
              
              {/* Site Name and Tagline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">ওয়েবসাইটের নাম</label>
                  <input
                    type="text"
                    value={settingsSiteName}
                    onChange={(e) => setSettingsSiteName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">ওয়েবসাইটের ট্যাগলাইন</label>
                  <input
                    type="text"
                    value={settingsTagline}
                    onChange={(e) => setSettingsTagline(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              {/* Hero Banner Headlines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">হোমপেজ প্রধান শিরোনাম (Hero Title)</label>
                  <input
                    type="text"
                    value={settingsHeroHeadline}
                    onChange={(e) => setSettingsHeroHeadline(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">হিরো অ্যান্ড্রয়েড ফোনের ছবি (URL)</label>
                  <input
                    type="url"
                    value={settingsHeroPhoneImage}
                    onChange={(e) => setSettingsHeroPhoneImage(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">হিরো বিস্তারিত বিবরণ (Subheadline)</label>
                <textarea
                  rows={2}
                  value={settingsHeroSubheadline}
                  onChange={(e) => setSettingsHeroSubheadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white resize-none"
                />
              </div>

              {/* Payment Gateways Config */}
              <div className="p-4 bg-slate-950/70 border border-amber-500/30 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4" /> পেমেন্ট নম্বর ও এন্ট্রি ফি নির্ধারণ
                  </span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settingsIsPaid}
                      onChange={(e) => setSettingsIsPaid(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-500"
                    />
                    <span className="font-bold text-white">পেইড টিকিট সক্রিয় রাখুন</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">টিকেট ফি (টাকা)</label>
                    <input
                      type="text"
                      value={settingsEntryFee}
                      onChange={(e) => setSettingsEntryFee(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">বিকাশ নম্বর</label>
                    <input
                      type="text"
                      value={settingsBkash}
                      onChange={(e) => setSettingsBkash(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">নগদ নম্বর</label>
                    <input
                      type="text"
                      value={settingsNagad}
                      onChange={(e) => setSettingsNagad(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">রকেট নম্বর</label>
                    <input
                      type="text"
                      value={settingsRocket}
                      onChange={(e) => setSettingsRocket(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Live Draw Countdown Timer in Settings */}
              <div className="p-4 bg-slate-950/70 border border-amber-500/30 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> লাইভ মেগা ড্র কাউন্টডাউন টাইমার কাস্টমাইজেশন
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    হোমপেজের লাইভ টাইমার নিয়ন্ত্রণ
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">টাইমার শিরোনাম</label>
                    <input
                      type="text"
                      value={timerTitle}
                      onChange={(e) => setTimerTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                      placeholder="লাইভ মেগা ড্র শেষ হতে বাকি:"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <label className="block text-slate-400 mb-1 text-center">দিন</label>
                      <input
                        type="number"
                        min="0"
                        value={timerDays}
                        onChange={(e) => setTimerDays(Number(e.target.value))}
                        className="w-full px-2 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-center font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 text-center">ঘণ্টা</label>
                      <input
                        type="number"
                        min="0"
                        max="23"
                        value={timerHours}
                        onChange={(e) => setTimerHours(Number(e.target.value))}
                        className="w-full px-2 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-center font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 text-center">মিনিট</label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={timerMinutes}
                        onChange={(e) => setTimerMinutes(Number(e.target.value))}
                        className="w-full px-2 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-center font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 text-center">সেকেন্ড</label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={timerSeconds}
                        onChange={(e) => setTimerSeconds(Number(e.target.value))}
                        className="w-full px-2 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-center font-mono font-bold"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Scrolling ticker and legal disclaimer */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">হোমপেজ স্ক্রলিং নোটিশ (Marquee Alert)</label>
                <input
                  type="text"
                  value={settingsMarquee}
                  onChange={(e) => setSettingsMarquee(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">আইনগত ঘোষণা / সতর্কবার্তা</label>
                <textarea
                  rows={2}
                  value={settingsDisclaimer}
                  onChange={(e) => setSettingsDisclaimer(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white resize-none"
                />
              </div>

              {/* Helpline, email, address */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">হেল্পলাইন নম্বর</label>
                  <input
                    type="text"
                    value={settingsHelpline}
                    onChange={(e) => setSettingsHelpline(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">সাপোর্ট ইমেইল</label>
                  <input
                    type="email"
                    value={settingsEmail}
                    onChange={(e) => setSettingsEmail(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">অফিসের ঠিকানা</label>
                  <input
                    type="text"
                    value={settingsAddress}
                    onChange={(e) => setSettingsAddress(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="submit"
                  className="py-3 px-8 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-black rounded-xl text-xs cursor-pointer shadow-lg active:scale-95 transition-all"
                >
                  সকল সেটিংস সংরক্ষণ করুন
                </button>

                {/* Adjust Visitor Count manually */}
                <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 pl-2">মোট ভিজিটর:</span>
                  <input
                    type="number"
                    value={customVisitors}
                    onChange={(e) => setCustomVisitors(e.target.value)}
                    className="w-24 px-2 py-1 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleSetCustomVisitors}
                    className="px-2.5 py-1 bg-amber-500 text-slate-950 font-bold rounded-lg text-[11px] cursor-pointer"
                  >
                    সেট করুন
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* TAB 7: ADMIN SECURITY & CREDENTIALS (niazuddinmd1@gmail.com / 67373) */}
      {activeTab === 'security' && (
        <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-rose-500/30 max-w-xl space-y-6 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold border border-rose-500/40">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">অ্যাডমিন অ্যাকাউন্ট ও সিকিউরিটি</h2>
              <p className="text-xs text-rose-300">আপনার নিজস্ব অ্যাডমিন ইমেইল ও পাসওয়ার্ড নিয়ন্ত্রণ করুন</p>
            </div>
          </div>

          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1 text-xs">
            <div className="text-slate-400">বর্তমান সক্রিয় অ্যাডমিন ক্রেডেনশিয়াল:</div>
            <div className="font-mono text-amber-300">ইমেইল: <b className="text-white">{siteSettings.adminEmail || 'admin@contest.bd'}</b></div>
            <div className="font-mono text-amber-300">পাসওয়ার্ড: <b className="text-emerald-400 tracking-widest">•••••• (সুরক্ষিত)</b></div>
          </div>

          <form onSubmit={handleSaveAdminCredentials} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">
                অ্যাডমিন ইমেইল এড্রেস
              </label>
              <input
                type="email"
                required
                value={adminEmailInput}
                onChange={(e) => setAdminEmailInput(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:border-rose-400"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">
                অ্যাডমিন গোপন পাসওয়ার্ড
              </label>
              <input
                type="password"
                required
                value={adminPasswordInput}
                onChange={(e) => setAdminPasswordInput(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono focus:border-rose-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold rounded-xl text-xs shadow-lg cursor-pointer"
            >
              ক্রেডেনশিয়াল সংরক্ষণ করুন
            </button>
          </form>
        </div>
      )}

      {/* TAB 8: NOTICES */}
      {activeTab === 'notices' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <div className="lg:col-span-5 bg-slate-900/80 p-6 rounded-3xl border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-4">নতুন নোটিস প্রকাশ করুন</h3>
              <form onSubmit={handleAddNoticeSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">নোটিস শিরোনাম</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: নতুন ড্র সংক্রান্ত নোটিশ"
                    value={newNoticeTitle}
                    onChange={(e) => setNewNoticeTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">ধরন</label>
                  <select
                    value={newNoticeType}
                    onChange={(e) => setNewNoticeType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
                  >
                    <option value="info">সাধারণ তথ্য (Info)</option>
                    <option value="urgent">জরুরি সতর্কতা (Urgent)</option>
                    <option value="announcement">ঘোষণা (Announcement)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">বিস্তারিত বিবরণ</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="নোটিসের বিষয়বস্তু লিখুন..."
                    value={newNoticeContent}
                    onChange={(e) => setNewNoticeContent(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs cursor-pointer shadow-md"
                >
                  নোটিস প্রকাশ করুন
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <h3 className="text-lg font-bold text-white">সক্রিয় নোটিস তালিকা</h3>
              {notices.map((n) => (
                <div key={n.id} className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 flex items-start justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white">{n.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">{n.type}</span>
                    </div>
                    <p className="text-slate-400">{n.content}</p>
                    <span className="text-[10px] text-slate-500 mt-1 block">{n.date}</span>
                  </div>
                  <button
                    onClick={() => deleteNotice(n.id)}
                    className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* TAB 9: ACTIVITY LOGS */}
      {activeTab === 'logs' && (
        <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">অ্যাডমিন অ্যাক্টিভিটি হিস্ট্রি লগ</h2>
              <p className="text-xs text-slate-400">সকল এডিট, লগইন ও ডেটা আপডেটের সম্পূর্ণ অডিট ট্রেইল</p>
            </div>

            <button
              onClick={resetToDefault}
              className="py-2 px-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl text-xs font-semibold cursor-pointer border border-rose-500/20 flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              ফ্যাক্টরি রিসেট
            </button>
          </div>

          <div className="divide-y divide-slate-800 text-xs">
            {adminLogs.map((log) => (
              <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <span className="font-bold text-amber-300">{log.action}: </span>
                  <span className="text-slate-300">{log.details}</span>
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  {log.timestamp} | {log.adminEmail}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
