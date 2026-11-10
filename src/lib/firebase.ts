import { initializeApp, getApps, getApp, deleteApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  Firestore,
} from 'firebase/firestore';
import defaultFirebaseConfig from '../../firebase-applet-config.json';
import { UserProfile, DepositRequest, ContestEntry, SiteSettings, ClientFirebaseConfig } from '../types';

const STORAGE_CUSTOM_CONFIG_KEY = 'client_firebase_config';
const STORAGE_USE_CUSTOM_KEY = 'use_custom_firebase';

/**
 * Returns saved client custom Firebase configuration from localStorage if available
 */
export function getSavedClientFirebaseConfig(): ClientFirebaseConfig | null {
  try {
    const saved = localStorage.getItem(STORAGE_CUSTOM_CONFIG_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading custom firebase config:', e);
  }
  return null;
}

/**
 * Returns whether client custom Firebase is currently active
 */
export function isUsingCustomFirebase(): boolean {
  try {
    return localStorage.getItem(STORAGE_USE_CUSTOM_KEY) === 'true';
  } catch {
    return false;
  }
}

/**
 * Returns the currently active Firebase configuration (Custom client project or Default platform project)
 */
export function getActiveFirebaseConfig(): ClientFirebaseConfig {
  if (isUsingCustomFirebase()) {
    const custom = getSavedClientFirebaseConfig();
    if (custom && custom.projectId && custom.apiKey) {
      return custom;
    }
  }
  return {
    projectId: defaultFirebaseConfig.projectId,
    apiKey: defaultFirebaseConfig.apiKey,
    authDomain: defaultFirebaseConfig.authDomain,
    appId: defaultFirebaseConfig.appId,
    storageBucket: defaultFirebaseConfig.storageBucket,
    messagingSenderId: defaultFirebaseConfig.messagingSenderId,
    firestoreDatabaseId: defaultFirebaseConfig.firestoreDatabaseId,
  };
}

let currentApp: FirebaseApp | null = null;
let currentDb: Firestore | null = null;

/**
 * Initialize or reinitialize Firebase instance based on active configuration
 */
export function initFirebase(): { app: FirebaseApp; db: Firestore } {
  const activeConfig = getActiveFirebaseConfig();
  const useCustom = isUsingCustomFirebase();
  const appName = useCustom ? 'client-custom-app' : '[DEFAULT]';

  const existingApp = getApps().find((a) => a.name === appName);
  if (existingApp) {
    currentApp = existingApp;
  } else {
    currentApp = initializeApp(
      {
        apiKey: activeConfig.apiKey,
        authDomain: activeConfig.authDomain,
        projectId: activeConfig.projectId,
        storageBucket: activeConfig.storageBucket,
        messagingSenderId: activeConfig.messagingSenderId,
        appId: activeConfig.appId,
        measurementId: activeConfig.measurementId,
      },
      appName
    );
  }

  // Initialize Firestore
  if (activeConfig.firestoreDatabaseId && activeConfig.firestoreDatabaseId !== '(default)') {
    currentDb = getFirestore(currentApp, activeConfig.firestoreDatabaseId);
  } else {
    currentDb = getFirestore(currentApp);
  }

  return { app: currentApp, db: currentDb };
}

// Initial bootstrap
const { app, db } = initFirebase();
export { app, db };

/**
 * Get active Firestore instance dynamically
 */
export function getDb(): Firestore {
  if (!currentDb) {
    const initialized = initFirebase();
    return initialized.db;
  }
  return currentDb;
}

/**
 * Set and activate client custom Firebase configuration
 */
export async function setClientFirebaseConfig(
  config: ClientFirebaseConfig | null,
  activate: boolean
): Promise<void> {
  if (config) {
    localStorage.setItem(STORAGE_CUSTOM_CONFIG_KEY, JSON.stringify(config));
  } else {
    localStorage.removeItem(STORAGE_CUSTOM_CONFIG_KEY);
  }
  localStorage.setItem(STORAGE_USE_CUSTOM_KEY, activate ? 'true' : 'false');

  // Clean up previous client app if switching
  const existingClientApp = getApps().find((a) => a.name === 'client-custom-app');
  if (existingClientApp) {
    try {
      await deleteApp(existingClientApp);
    } catch {
      // ignore
    }
  }

  currentApp = null;
  currentDb = null;
  initFirebase();
}

/**
 * Test a Firebase project configuration by attempting to connect and read/write a test ping doc
 */
export async function testFirebaseProjectConnection(
  config: ClientFirebaseConfig
): Promise<{ success: boolean; message: string; latency?: number }> {
  const testAppName = `test-ping-${Date.now()}`;
  let testApp: FirebaseApp | null = null;

  try {
    const startTime = performance.now();
    testApp = initializeApp(
      {
        apiKey: config.apiKey,
        authDomain: config.authDomain,
        projectId: config.projectId,
        storageBucket: config.storageBucket,
        messagingSenderId: config.messagingSenderId,
        appId: config.appId,
      },
      testAppName
    );

    const testDb = config.firestoreDatabaseId && config.firestoreDatabaseId !== '(default)'
      ? getFirestore(testApp, config.firestoreDatabaseId)
      : getFirestore(testApp);

    // Attempt ping write and read
    const testDocRef = doc(testDb, '_system_ping', 'connection_test');
    await setDoc(testDocRef, {
      status: 'connected',
      clientProjectId: config.projectId,
      testedAt: new Date().toISOString(),
    });

    const verifySnap = await getDoc(testDocRef);
    const latency = Math.round(performance.now() - startTime);

    if (verifySnap.exists()) {
      return {
        success: true,
        message: `ফায়ারবেস প্রোজেক্ট '${config.projectId}' এর সাথে সফলভাবে সংযোগ স্থাপিত হয়েছে! (লেটেন্সি: ${latency}ms)`,
        latency,
      };
    } else {
      return {
        success: false,
        message: 'ডাটাবেজে ডকুমেন্ট ভেরিফাই করা যায়নি। অনুগ্রহ করে ফায়ারস্টোর পারমিশন বা রুলস চেক করুন।',
      };
    }
  } catch (error: any) {
    console.error('Firebase test connection failed:', error);
    let msg = error?.message || 'অজানা ত্রুটি দেখা দিয়েছে।';

    if (msg.includes('permission-denied') || msg.includes('Missing or insufficient permissions')) {
      msg = 'পারমিশন ত্রুটি: আপনার ফায়ারবেস ফায়ারস্টোর রুলসে (Firestore Rules) রিড/রাইট অনুমতি দিন অথবা Test mode এ চালু করুন।';
    } else if (msg.includes('invalid-api-key') || msg.includes('API key')) {
      msg = 'ভুল API Key: আপনার ফায়ারবেস Web App এর apiKey সঠিকভাবে প্রদান করুন।';
    } else if (msg.includes('project-not-found') || msg.includes('NOT_FOUND')) {
      msg = `প্রোজেক্ট পাওয়া যায়নি: '${config.projectId}' আইডি সঠিক কিনা তা নিশ্চিত করুন।`;
    }

    return {
      success: false,
      message: `সংযোগ ব্যর্থ হয়েছে: ${msg}`,
    };
  } finally {
    if (testApp) {
      try {
        await deleteApp(testApp);
      } catch {
        // ignore
      }
    }
  }
}

/**
 * Save or update user profile in Firestore
 */
export async function saveUserToFirestore(user: UserProfile): Promise<void> {
  try {
    const activeDb = getDb();
    const userRef = doc(activeDb, 'users', user.id);
    await setDoc(userRef, { ...user, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (error) {
    console.error('Error saving user to Firestore:', error);
  }
}

/**
 * Fetch all users from Firestore
 */
export async function fetchUsersFromFirestore(): Promise<UserProfile[]> {
  try {
    const activeDb = getDb();
    const querySnapshot = await getDocs(collection(activeDb, 'users'));
    const users: UserProfile[] = [];
    querySnapshot.forEach((docSnap) => {
      users.push(docSnap.data() as UserProfile);
    });
    return users;
  } catch (error) {
    console.error('Error fetching users from Firestore:', error);
    return [];
  }
}

/**
 * Save or update deposit request in Firestore
 */
export async function saveDepositToFirestore(deposit: DepositRequest): Promise<void> {
  try {
    const activeDb = getDb();
    const depositRef = doc(activeDb, 'deposits', deposit.id);
    await setDoc(depositRef, deposit, { merge: true });
  } catch (error) {
    console.error('Error saving deposit to Firestore:', error);
  }
}

/**
 * Fetch all deposit requests from Firestore
 */
export async function fetchDepositsFromFirestore(): Promise<DepositRequest[]> {
  try {
    const activeDb = getDb();
    const querySnapshot = await getDocs(collection(activeDb, 'deposits'));
    const deposits: DepositRequest[] = [];
    querySnapshot.forEach((docSnap) => {
      deposits.push(docSnap.data() as DepositRequest);
    });
    return deposits;
  } catch (error) {
    console.error('Error fetching deposits from Firestore:', error);
    return [];
  }
}

/**
 * Save or update contest entry in Firestore
 */
export async function saveEntryToFirestore(entry: ContestEntry): Promise<void> {
  try {
    const activeDb = getDb();
    const entryRef = doc(activeDb, 'contest_entries', entry.id);
    await setDoc(entryRef, entry, { merge: true });
  } catch (error) {
    console.error('Error saving entry to Firestore:', error);
  }
}

/**
 * Fetch all contest entries from Firestore
 */
export async function fetchEntriesFromFirestore(): Promise<ContestEntry[]> {
  try {
    const activeDb = getDb();
    const querySnapshot = await getDocs(collection(activeDb, 'contest_entries'));
    const entries: ContestEntry[] = [];
    querySnapshot.forEach((docSnap) => {
      entries.push(docSnap.data() as ContestEntry);
    });
    return entries;
  } catch (error) {
    console.error('Error fetching entries from Firestore:', error);
    return [];
  }
}

/**
 * Save site settings to Firestore
 */
export async function saveSiteSettingsToFirestore(settings: SiteSettings): Promise<void> {
  try {
    const activeDb = getDb();
    const settingsRef = doc(activeDb, 'site_settings', 'main_config');
    await setDoc(settingsRef, settings, { merge: true });
  } catch (error) {
    console.error('Error saving site settings to Firestore:', error);
  }
}

/**
 * Fetch site settings from Firestore
 */
export async function fetchSiteSettingsFromFirestore(): Promise<SiteSettings | null> {
  try {
    const activeDb = getDb();
    const docRef = doc(activeDb, 'site_settings', 'main_config');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as SiteSettings;
    }
    return null;
  } catch (error) {
    console.error('Error fetching site settings from Firestore:', error);
    return null;
  }
}

export default app;
