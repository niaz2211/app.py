import { AnimationVideoConfig } from '../types';

const DB_NAME = 'fifty_taka_mobile_media_db';
const STORE_NAME = 'media_store';
const VIDEO_BLOB_KEY = 'custom_uploaded_review_video';
const LOCAL_STORAGE_VIDEO_KEY = 'app_custom_review_video_meta';

/**
 * Opens or initializes the browser IndexedDB for permanent large media storage.
 * IndexedDB bypasses the strict 5MB localStorage quota and 1MB Firestore document limit.
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported in this environment'));
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Saves a large video data URL or media string into IndexedDB permanently.
 */
export async function saveVideoBlobToIndexedDB(dataUrlOrMedia: string): Promise<boolean> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(dataUrlOrMedia, VIDEO_BLOB_KEY);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to save video to IndexedDB:', err);
    return false;
  }
}

/**
 * Retrieves the stored video data URL or media string from IndexedDB.
 */
export async function getVideoBlobFromIndexedDB(): Promise<string | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(VIDEO_BLOB_KEY);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch (err) {
    console.warn('Failed to retrieve video from IndexedDB:', err);
    return null;
  }
}

/**
 * Clears the stored video from IndexedDB if requested (e.g., reset to default).
 */
export async function clearVideoBlobFromIndexedDB(): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(VIDEO_BLOB_KEY);
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
    });
  } catch {
    // ignore
  }
}

/**
 * Saves video configuration to a dedicated localStorage backup key.
 * If videoUrl is a heavy base64 data URL (> 150KB), stores a placeholder in localStorage
 * while the full media is stored in IndexedDB.
 */
export function saveVideoConfigBackup(config: AnimationVideoConfig): void {
  try {
    const isLargeDataUrl = config.videoUrl && config.videoUrl.startsWith('data:') && config.videoUrl.length > 150000;
    const safeConfig: AnimationVideoConfig = {
      ...config,
      videoUrl: isLargeDataUrl ? '__indexeddb__' : config.videoUrl,
      updatedAt: config.updatedAt || new Date().toISOString(),
    };
    localStorage.setItem(LOCAL_STORAGE_VIDEO_KEY, JSON.stringify(safeConfig));
  } catch (err) {
    console.warn('Failed to save video config backup in localStorage:', err);
  }
}

/**
 * Retrieves the video configuration from the dedicated localStorage backup key.
 */
export function getVideoConfigBackup(): AnimationVideoConfig | null {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_VIDEO_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (err) {
    console.warn('Failed to parse video config backup:', err);
  }
  return null;
}
