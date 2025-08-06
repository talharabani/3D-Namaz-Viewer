/**
 * Bukhari Hadith Service
 * 
 * Frontend utility for querying Sahih al-Bukhari hadiths from Firebase Firestore.
 * Uses Firebase Web SDK v9 modular API.
 */

import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
  Timestamp
} from 'firebase/firestore';
import { db } from './firebase';

// TypeScript interfaces
export interface BukhariHadith {
  id: string;
  collection: string;
  book_number: number;
  book_name: string;
  chapter_number: number;
  chapter_name: string;
  hadith_number: number;
  text_arabic: string;
  translation_en: string;
  chain_of_narrators: string;
  reference: string;
  tags?: string[];
  grade?: string;
  narrator?: string;
  category?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface HadithQueryOptions {
  book_number?: number;
  chapter_number?: number;
  category?: string;
  narrator?: string;
  tags?: string[];
  search?: string;
  limit?: number;
  startAfter?: QueryDocumentSnapshot<DocumentData>;
}

export interface HadithQueryResult {
  hadiths: BukhariHadith[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
  total: number;
}

// Collection reference
const HADITHS_COLLECTION = 'hadiths';

/**
 * Get a single hadith by its document ID
 */
export async function getHadithById(docId: string): Promise<BukhariHadith | null> {
  try {
    const docRef = doc(db, HADITHS_COLLECTION, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as BukhariHadith;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching hadith by ID:', error);
    throw error;
  }
}

/**
 * Get hadiths by book number, sorted by hadith number
 */
export async function getHadithsByBook(
  bookNumber: number, 
  options: { limit?: number; startAfter?: QueryDocumentSnapshot<DocumentData> } = {}
): Promise<HadithQueryResult> {
  try {
    let q = query(
      collection(db, HADITHS_COLLECTION),
      where('book_number', '==', bookNumber),
      orderBy('hadith_number', 'asc')
    );

    if (options.limit) {
      q = query(q, limit(options.limit));
    }

    if (options.startAfter) {
      q = query(q, startAfter(options.startAfter));
    }

    const querySnapshot = await getDocs(q);
    const hadiths: BukhariHadith[] = [];

    querySnapshot.forEach((doc) => {
      hadiths.push({
        id: doc.id,
        ...doc.data()
      } as BukhariHadith);
    });

    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;
    const hasMore = querySnapshot.docs.length === (options.limit || 20);

    return {
      hadiths,
      lastDoc,
      hasMore,
      total: hadiths.length
    };
  } catch (error) {
    console.error('Error fetching hadiths by book:', error);
    throw error;
  }
}

/**
 * Search hadiths with various filters
 */
export async function searchHadiths(options: HadithQueryOptions = {}): Promise<HadithQueryResult> {
  try {
    let q = query(collection(db, HADITHS_COLLECTION));

    // Apply filters
    if (options.book_number !== undefined) {
      q = query(q, where('book_number', '==', options.book_number));
    }

    if (options.chapter_number !== undefined) {
      q = query(q, where('chapter_number', '==', options.chapter_number));
    }

    if (options.category) {
      q = query(q, where('category', '==', options.category));
    }

    if (options.narrator) {
      q = query(q, where('narrator', '==', options.narrator));
    }

    // Apply sorting
    q = query(q, orderBy('book_number', 'asc'), orderBy('hadith_number', 'asc'));

    // Apply pagination
    if (options.limit) {
      q = query(q, limit(options.limit));
    }

    if (options.startAfter) {
      q = query(q, startAfter(options.startAfter));
    }

    const querySnapshot = await getDocs(q);
    const hadiths: BukhariHadith[] = [];

    querySnapshot.forEach((doc) => {
      const hadith = {
        id: doc.id,
        ...doc.data()
      } as BukhariHadith;

      // Apply client-side filters
      let includeHadith = true;

      // Search in text fields
      if (options.search) {
        const searchTerm = options.search.toLowerCase();
        const searchableText = [
          hadith.translation_en,
          hadith.text_arabic,
          hadith.chapter_name,
          hadith.narrator,
          hadith.category
        ].join(' ').toLowerCase();

        if (!searchableText.includes(searchTerm)) {
          includeHadith = false;
        }
      }

      // Filter by tags
      if (options.tags && options.tags.length > 0) {
        if (!hadith.tags || !options.tags.some(tag => hadith.tags!.includes(tag))) {
          includeHadith = false;
        }
      }

      if (includeHadith) {
        hadiths.push(hadith);
      }
    });

    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;
    const hasMore = querySnapshot.docs.length === (options.limit || 20);

    return {
      hadiths,
      lastDoc,
      hasMore,
      total: hadiths.length
    };
  } catch (error) {
    console.error('Error searching hadiths:', error);
    throw error;
  }
}

/**
 * Get all unique categories
 */
export async function getCategories(): Promise<string[]> {
  try {
    const q = query(collection(db, HADITHS_COLLECTION));
    const querySnapshot = await getDocs(q);
    
    const categories = new Set<string>();
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.category) {
        categories.add(data.category);
      }
    });
    
    return Array.from(categories).sort();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

/**
 * Get all unique narrators
 */
export async function getNarrators(): Promise<string[]> {
  try {
    const q = query(collection(db, HADITHS_COLLECTION));
    const querySnapshot = await getDocs(q);
    
    const narrators = new Set<string>();
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.narrator) {
        narrators.add(data.narrator);
      }
    });
    
    return Array.from(narrators).sort();
  } catch (error) {
    console.error('Error fetching narrators:', error);
    throw error;
  }
}

/**
 * Get all unique tags
 */
export async function getTags(): Promise<string[]> {
  try {
    const q = query(collection(db, HADITHS_COLLECTION));
    const querySnapshot = await getDocs(q);
    
    const tags = new Set<string>();
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.tags && Array.isArray(data.tags)) {
        data.tags.forEach((tag: string) => tags.add(tag));
      }
    });
    
    return Array.from(tags).sort();
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
}

/**
 * Get hadith statistics
 */
export async function getHadithStats(): Promise<{
  totalHadiths: number;
  books: Record<number, number>;
  categories: Record<string, number>;
  narrators: Record<string, number>;
  tags: Record<string, number>;
}> {
  try {
    const q = query(collection(db, HADITHS_COLLECTION));
    const querySnapshot = await getDocs(q);
    
    const stats = {
      totalHadiths: 0,
      books: {} as Record<number, number>,
      categories: {} as Record<string, number>,
      narrators: {} as Record<string, number>,
      tags: {} as Record<string, number>
    };
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      stats.totalHadiths++;
      
      // Count by book
      if (data.book_number) {
        stats.books[data.book_number] = (stats.books[data.book_number] || 0) + 1;
      }
      
      // Count by category
      if (data.category) {
        stats.categories[data.category] = (stats.categories[data.category] || 0) + 1;
      }
      
      // Count by narrator
      if (data.narrator) {
        stats.narrators[data.narrator] = (stats.narrators[data.narrator] || 0) + 1;
      }
      
      // Count by tags
      if (data.tags && Array.isArray(data.tags)) {
        data.tags.forEach((tag: string) => {
          stats.tags[tag] = (stats.tags[tag] || 0) + 1;
        });
      }
    });
    
    return stats;
  } catch (error) {
    console.error('Error fetching hadith stats:', error);
    throw error;
  }
}

/**
 * Get a random hadith
 */
export async function getRandomHadith(): Promise<BukhariHadith | null> {
  try {
    // Get a random sample by using a random offset
    // Note: This is a simple approach. For better randomization,
    // consider storing hadith count and using random numbers
    const q = query(collection(db, HADITHS_COLLECTION), limit(100));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    // Pick a random document from the results
    const randomIndex = Math.floor(Math.random() * querySnapshot.docs.length);
    const randomDoc = querySnapshot.docs[randomIndex];
    
    return {
      id: randomDoc.id,
      ...randomDoc.data()
    } as BukhariHadith;
  } catch (error) {
    console.error('Error fetching random hadith:', error);
    throw error;
  }
}

/**
 * Local cache utilities for offline reading
 */
export class HadithCache {
  private static readonly CACHE_KEY = 'bukhari_hadiths_cache';
  private static readonly CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

  static async cacheHadiths(hadiths: BukhariHadith[]): Promise<void> {
    try {
      const cacheData = {
        hadiths,
        timestamp: Date.now()
      };
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error caching hadiths:', error);
    }
  }

  static async getCachedHadiths(): Promise<BukhariHadith[] | null> {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (!cached) return null;

      const cacheData = JSON.parse(cached);
      const isExpired = Date.now() - cacheData.timestamp > this.CACHE_EXPIRY;

      if (isExpired) {
        localStorage.removeItem(this.CACHE_KEY);
        return null;
      }

      return cacheData.hadiths;
    } catch (error) {
      console.error('Error reading cached hadiths:', error);
      return null;
    }
  }

  static clearCache(): void {
    try {
      localStorage.removeItem(this.CACHE_KEY);
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }
}

// Export all functions
export default {
  getHadithById,
  getHadithsByBook,
  searchHadiths,
  getCategories,
  getNarrators,
  getTags,
  getHadithStats,
  getRandomHadith,
  HadithCache
}; 