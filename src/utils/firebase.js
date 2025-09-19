// Firebase configuration for authentication and database
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCM41n18V-EIP6rpKvLMY0fcbblPQZUi9o",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "namaz-e9611.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "namaz-e9611",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "namaz-e9611.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "471303185593",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:471303185593:web:191ad040efc2fcea052768",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-WZLM4TCJV1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Export the app instance for use in other services
export { app };

// Initialize Firestore
export const db = getFirestore(app);

// Collection references
export const hadithsCollection = collection(db, 'hadiths');
export const booksCollection = collection(db, 'books');

// Hadith books metadata
export const HADITH_BOOKS = {
  'sahih-bukhari': {
    name: 'Sahih Bukhari',
    arabic: 'صحيح البخاري',
    author: 'Imam Muhammad ibn Ismail al-Bukhari',
    totalHadiths: 7563,
    description: 'The most authentic collection of hadith, compiled by Imam Bukhari (810-870 CE)',
    color: '#8B4513'
  },
  'sahih-muslim': {
    name: 'Sahih Muslim',
    arabic: 'صحيح مسلم',
    author: 'Imam Muslim ibn al-Hajjaj',
    totalHadiths: 7563,
    description: 'Second most authentic hadith collection, compiled by Imam Muslim (817-875 CE)',
    color: '#2E8B57'
  },
  'sunan-abu-dawud': {
    name: 'Sunan Abu Dawud',
    arabic: 'سنن أبي داود',
    author: 'Imam Abu Dawud',
    totalHadiths: 5274,
    description: 'Collection focusing on legal hadith, compiled by Imam Abu Dawud (817-889 CE)',
    color: '#4682B4'
  },
  'sunan-tirmidhi': {
    name: 'Sunan Tirmidhi',
    arabic: 'سنن الترمذي',
    author: 'Imam Abu Isa Muhammad at-Tirmidhi',
    totalHadiths: 3956,
    description: 'Collection with detailed commentary, compiled by Imam Tirmidhi (824-892 CE)',
    color: '#D2691E'
  },
  'sunan-nasai': {
    name: 'Sunan An-Nasai',
    arabic: 'سنن النسائي',
    author: 'Imam Ahmad ibn Shuayb an-Nasai',
    totalHadiths: 5662,
    description: 'Collection known for its authenticity, compiled by Imam Nasai (829-915 CE)',
    color: '#8A2BE2'
  },
  'sunan-ibn-majah': {
    name: 'Sunan Ibn Majah',
    arabic: 'سنن ابن ماجه',
    author: 'Imam Muhammad ibn Yazid ibn Majah',
    totalHadiths: 4341,
    description: 'One of the six major hadith collections, compiled by Imam Ibn Majah (824-887 CE)',
    color: '#DC143C'
  }
}; 