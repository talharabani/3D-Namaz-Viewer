// Firestore service for hadith operations
import { 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter,
  collection,
  doc,
  getDoc
} from 'firebase/firestore';
import { db, hadithsCollection, HADITH_BOOKS } from './firebase';

// Cache for all hadiths to avoid repeated fetches
let allHadithsCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Function to clear cache (useful for debugging)
export function clearHadithCache() {
  allHadithsCache = null;
  cacheTimestamp = null;
  console.log('🗑️ Hadith cache cleared');
}

// Get all hadiths with caching
async function getAllHadiths() {
  const now = Date.now();
  
  // Return cached data if still valid
  if (allHadithsCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
    console.log(`📦 Returning ${allHadithsCache.length} hadiths from cache`);
    return allHadithsCache;
  }
  
  try {
    console.log('Fetching all hadiths from Firestore...');
    
    // Fetch all hadiths in batches (Firestore limit is 1000 per query)
    const allHadiths = [];
    let lastDoc = null;
    let hasMore = true;
    
    while (hasMore) {
      let q;
      if (lastDoc) {
        q = query(hadithsCollection, startAfter(lastDoc), limit(1000));
      } else {
        q = query(hadithsCollection, limit(1000));
      }
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        hasMore = false;
        break;
      }
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        allHadiths.push({
          id: doc.id,
          ...data
        });
      });
      
      // Check if we got less than 1000, meaning we've reached the end
      if (querySnapshot.docs.length < 1000) {
        hasMore = false;
      } else {
        lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      }
    }
    
               console.log(`Fetched ${allHadiths.length} hadiths from Firestore`);
           
           // Debug: Log sample data structure
           if (allHadiths.length > 0) {
             console.log('📊 Sample hadith data structure:', {
               id: allHadiths[0].id,
               fields: Object.keys(allHadiths[0]),
               narrator: allHadiths[0].narrator,
               translation_en: allHadiths[0].translation_en ? 'Has content' : 'No content',
               text_arabic: allHadiths[0].text_arabic ? 'Has content' : 'No content'
             });
           } else {
             console.warn('⚠️ No hadiths found in Firestore. Database might be empty.');
           }

           // Cache the results
           allHadithsCache = allHadiths;
           cacheTimestamp = now;
    
    return allHadiths;
  } catch (error) {
    console.error('Error fetching all hadiths:', error);
    throw error;
  }
}

// Helper function to normalize text for search (handles Urdu, English, Roman Urdu)
function normalizeSearchText(text) {
  if (!text) return '';
  
  // Convert to lowercase and remove extra spaces
  let normalized = text.toString().toLowerCase().trim().replace(/\s+/g, ' ');
  
  // Handle common Roman Urdu variations and Islamic terms
  const romanUrduMappings = {
    // Common Islamic terms
    'allah': 'الله',
    'muhammad': 'محمد',
    'rasool': 'رسول',
    'nabi': 'نبی',
    'salah': 'صلوۃ',
    'namaz': 'نماز',
    'dua': 'دعا',
    'hadith': 'حدیث',
    'sahih': 'صحیح',
    'bukhari': 'بخاری',
    'muslim': 'مسلم',
    
    // Additional English terms that should be searchable
    'give': 'دینا',
    'giving': 'دینا',
    'help': 'مدد',
    'helping': 'مدد',
    'poor': 'غریب',
    'needy': 'ضرورت مند',
    'money': 'پیسہ',
    'wealth': 'مال',
    'rich': 'امیر',
    'good': 'اچھا',
    'bad': 'برا',
    'right': 'درست',
    'wrong': 'غلط',
    'truth': 'سچ',
    'lie': 'جھوٹ',
    'honest': 'ایماندار',
    'dishonest': 'بے ایمان',
    
    // Common names
    'umar': 'عمر',
    'umer': 'عمر',
    'umr': 'عمر',
    'donation': 'صدقہ',
    'charity': 'صدقہ',
    'intention': 'نیت',
    'niyyah': 'نیت',
    'prayer': 'نماز',
    'namaz': 'نماز',
    'ali': 'علی',
    'abu': 'ابو',
    'ibn': 'ابن',
    'bin': 'بن',
    'khattab': 'خطاب',
    'bakr': 'بکر',
    'siddiq': 'صدیق',
    'fatima': 'فاطمہ',
    'aisha': 'عائشہ',
    'khadija': 'خدیجہ',
    'huraira': 'ہریرہ',
    'ansari': 'انصاری',
    'khattab': 'خطاب',
    'siddiq': 'صدیق',
    'farooq': 'فاروق',
    
    // Common Islamic concepts
    'iman': 'ایمان',
    'islam': 'اسلام',
    'ihsan': 'احسان',
    'taqwa': 'تقویٰ',
    'sadaqah': 'صدقہ',
    'zakat': 'زکوٰۃ',
    'hajj': 'حج',
    'umrah': 'عمرہ',
    'ramadan': 'رمضان',
    'eid': 'عید',
    'jannah': 'جنت',
    'akhirah': 'آخرت',
    'dunya': 'دنیا',
    'akhlaq': 'اخلاق',
    'adab': 'ادب',
    'ilm': 'علم',
    'hikmah': 'حکمت',
    'shukr': 'شکر',
    'sabr': 'صبر',
    'tawakkul': 'توکل',
    'istighfar': 'استغفار',
    'dhikr': 'ذکر',
    'dua': 'دعا',
    'salah': 'صلوۃ',
    'wudu': 'وضو',
    'ghusl': 'غسل',
    'tayammum': 'تیمم',
    'qibla': 'قبلہ',
    'masjid': 'مسجد',
    'mihrab': 'محراب',
    'minbar': 'منبر',
    'adhan': 'اذان',
    'iqama': 'اقامت',
    'jamaat': 'جماعت',
    'imam': 'امام',
    'muazzin': 'موذن',
    'muezzin': 'موذن'
  };
  
  // Replace Roman Urdu with Arabic/Urdu equivalents
  Object.entries(romanUrduMappings).forEach(([roman, urdu]) => {
    const regex = new RegExp(roman, 'gi');
    normalized = normalized.replace(regex, urdu);
  });
  
  // Remove special characters but keep spaces and alphanumeric
  normalized = normalized.replace(/[^\w\s\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g, ' ');
  
  // Remove extra spaces again
  normalized = normalized.replace(/\s+/g, ' ').trim();
  
  return normalized;
}

// Search hadiths with filters and pagination (ALL 7,275 HADITHS)
export async function searchHadiths(searchQuery = '', filters = {}, pageSize = 20, lastDoc = null) {
  try {
    // Get all hadiths from cache or fetch from Firestore
    const allHadiths = await getAllHadiths();
    
    console.log(`🔍 Search Debug - Total hadiths available: ${allHadiths.length}`);
    console.log(`🔍 Search Debug - Search query: "${searchQuery}"`);
    console.log(`🔍 Search Debug - Filters:`, filters);
    
    // Debug: Show sample hadith structure
    if (allHadiths.length > 0) {
      const sampleHadith = allHadiths[0];
      console.log('🔍 Sample hadith structure:', {
        id: sampleHadith.id,
        hadith_number: sampleHadith.hadith_number,
        book_number: sampleHadith.book_number,
        narrator: sampleHadith.narrator,
        collection: sampleHadith.collection,
        translation_en: sampleHadith.translation_en ? 'Has content' : 'No content',
        text_arabic: sampleHadith.text_arabic ? 'Has content' : 'No content',
        allFields: Object.keys(sampleHadith)
      });
    }
    
    // Apply ALL filters client-side
    let filteredHadiths = allHadiths;
    
    // Apply book filter client-side
    if (filters.book && filters.book !== 'all') {
      // Map book IDs to collection names
      const bookCollectionMap = {
        'sahih-bukhari': 'Sahih al-Bukhari',
        'sahih-muslim': 'Sahih Muslim',
        'sunan-abu-dawud': 'Sunan Abu Dawud',
        'sunan-tirmidhi': 'Sunan Tirmidhi',
        'sunan-nasai': 'Sunan An-Nasai',
        'sunan-ibn-majah': 'Sunan Ibn Majah'
      };
      
      const targetCollection = bookCollectionMap[filters.book];
      if (targetCollection) {
        filteredHadiths = filteredHadiths.filter(hadith => 
          hadith.collection === targetCollection
        );
        console.log(`📚 Book filter applied: ${targetCollection}, found ${filteredHadiths.length} hadiths`);
      }
    }
    
    // Apply category filter client-side
    if (filters.category && filters.category !== 'all') {
      filteredHadiths = filteredHadiths.filter(hadith => 
        hadith.category === filters.category
      );
    }
    
    // Apply narrator filter client-side
    if (filters.narrator && filters.narrator !== 'all' && filters.narrator.trim()) {
      const narratorSearch = normalizeSearchText(filters.narrator);
      filteredHadiths = filteredHadiths.filter(hadith => {
        const hadithNarrator = normalizeSearchText(hadith.narrator || '');
        return hadithNarrator.includes(narratorSearch);
      });
    }
    
    // Remove duplicates based on hadith ID and content similarity
    const seenIds = new Set();
    const seenContent = new Set();
    const uniqueHadiths = filteredHadiths.filter(hadith => {
      if (!hadith.id) {
        console.warn('⚠️ Hadith without ID found:', hadith);
        return true; // Keep hadiths without IDs for now
      }
      
      // Check for duplicate IDs
      if (seenIds.has(hadith.id)) {
        return false; // Remove duplicate by ID
      }
      
      // Check for duplicate content (same hadith number, collection, and similar text)
      const contentKey = `${hadith.collection}-${hadith.hadith_number}-${hadith.book_number}`;
      if (seenContent.has(contentKey)) {
        console.log(`🔍 Removing duplicate content: ${contentKey}`);
        return false; // Remove duplicate by content
      }
      
      // Create a content hash for more thorough deduplication
      const contentHash = [
        hadith.translation_en || '',
        hadith.narrator || '',
        hadith.collection || '',
        hadith.hadith_number || '',
        hadith.book_number || ''
      ].join('|').toLowerCase().trim();
      
      if (seenContent.has(contentHash)) {
        console.log(`🔍 Removing duplicate content hash for: ${hadith.collection} #${hadith.hadith_number}`);
        return false; // Remove duplicate by content hash
      }
      
      seenIds.add(hadith.id);
      seenContent.add(contentKey);
      seenContent.add(contentHash);
      return true; // Keep unique hadith
    });
    
    if (uniqueHadiths.length !== filteredHadiths.length) {
      console.log(`🔍 Removed ${filteredHadiths.length - uniqueHadiths.length} duplicate hadiths`);
      console.log(`🔍 Remaining unique hadiths: ${uniqueHadiths.length}`);
    }
    
    filteredHadiths = uniqueHadiths;
    
         // Apply search query client-side (supports Urdu, English, Roman Urdu)
     if (searchQuery.trim()) {
       const searchTerm = normalizeSearchText(searchQuery);
       
       // Split search term into words for better matching (moved outside the filter function)
       const searchWords = searchTerm.split(' ').filter(word => word.length > 0);
       
       // Debug: Log the first few hadiths to see their structure
       if (filteredHadiths.length > 0) {
         console.log('🔍 Search Debug - First hadith structure:', {
           id: filteredHadiths[0].id,
           narrator: filteredHadiths[0].narrator,
           translation_en: filteredHadiths[0].translation_en ? filteredHadiths[0].translation_en.substring(0, 50) : 'N/A',
           text_arabic: filteredHadiths[0].text_arabic ? filteredHadiths[0].text_arabic.substring(0, 50) : 'N/A',
           collection: filteredHadiths[0].collection,
           hadith_number: filteredHadiths[0].hadith_number,
           book_number: filteredHadiths[0].book_number,
           grade: filteredHadiths[0].grade
         });
         console.log('🔍 Search Debug - Search term:', searchTerm);
         console.log('🔍 Search Debug - Search words:', searchWords);
         
         // Log first 3 hadiths to see what narrators we have
         console.log('🔍 First 3 hadiths narrators:', filteredHadiths.slice(0, 3).map(h => h.narrator));
       }
       
       filteredHadiths = filteredHadiths.filter(hadith => {
         // Create searchable text in both original and normalized forms
         const originalText = [
           hadith.translation_en || '',
           hadith.text_arabic || '',
           hadith.narrator || '',
           hadith.collection || '',
           hadith.hadith_number || '',
           hadith.book_number || '',
           hadith.grade || '',
           hadith.book_name || '',
           hadith.chapter_name || '',
           hadith.tags ? hadith.tags.join(' ') : ''
         ].join(' ').toLowerCase();
         
         const normalizedText = [
           hadith.translation_en || '',
           hadith.text_arabic || '',
           hadith.narrator || '',
           hadith.collection || '',
           hadith.hadith_number || '',
           hadith.book_number || '',
           hadith.grade || '',
           hadith.book_name || '',
           hadith.chapter_name || '',
           hadith.tags ? hadith.tags.join(' ') : ''
         ].map(text => normalizeSearchText(text)).join(' ');
         
         // Check if any search word is found in either original or normalized text
         const matchesOriginal = searchWords.some(word => originalText.includes(word.toLowerCase()));
         const matchesNormalized = searchWords.some(word => normalizedText.includes(word));
         
         // Also check if the original search query (before normalization) matches
         const originalQuery = searchQuery.toLowerCase();
         const matchesOriginalQuery = originalText.includes(originalQuery);
         
         // Debug: Log matches for narrator searches
         if (searchTerm.includes('umar') || searchTerm.includes('عمر')) {
           console.log('🔍 Narrator search debug:', {
             narrator: hadith.narrator,
             normalizedNarrator: normalizeSearchText(hadith.narrator || ''),
             searchTerm,
             searchWords,
             matchesOriginal,
             matchesNormalized
           });
         }
         
         return matchesOriginal || matchesNormalized || matchesOriginalQuery;
       });
      
      console.log(`🔍 Search results: ${filteredHadiths.length} hadiths found for "${searchQuery}"`);
      
      // Additional deduplication after search to catch any remaining duplicates
      const finalSeenIds = new Set();
      const finalSeenContent = new Set();
      const finalUniqueHadiths = filteredHadiths.filter(hadith => {
        // Check for duplicate IDs
        if (finalSeenIds.has(hadith.id)) {
          return false;
        }
        
        // Check for duplicate content
        const contentKey = `${hadith.collection}-${hadith.hadith_number}-${hadith.book_number}`;
        if (finalSeenContent.has(contentKey)) {
          return false;
        }
        
        finalSeenIds.add(hadith.id);
        finalSeenContent.add(contentKey);
        return true;
      });
      
      if (finalUniqueHadiths.length !== filteredHadiths.length) {
        console.log(`🔍 Final deduplication: Removed ${filteredHadiths.length - finalUniqueHadiths.length} additional duplicates`);
        console.log(`🔍 Final unique hadiths: ${finalUniqueHadiths.length}`);
      }
      
      filteredHadiths = finalUniqueHadiths;
      
      // Debug: Show first few search results to check for duplicates
      if (filteredHadiths.length > 0) {
        console.log('🔍 First 3 search results:', filteredHadiths.slice(0, 3).map(h => ({
          id: h.id,
          hadith_number: h.hadith_number,
          narrator: h.narrator,
          collection: h.collection
        })));
      } else {
        // Debug: If no results, show what we're searching for
        console.log('🔍 No results found. Debug info:');
        console.log('🔍 Search term:', searchTerm);
        console.log('🔍 Search words:', searchWords);
        if (filteredHadiths.length > 0) {
          const sampleHadith = filteredHadiths[0];
          console.log('🔍 Sample hadith content preview:', {
            translation_en: sampleHadith.translation_en ? sampleHadith.translation_en.substring(0, 100) : 'N/A',
            narrator: sampleHadith.narrator,
            collection: sampleHadith.collection
          });
        }
      }
    }
    
    // Apply sorting client-side (with proper null safety)
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'book':
          filteredHadiths.sort((a, b) => {
            const aBook = (a.collection || '').toString();
            const bBook = (b.collection || '').toString();
            return aBook.localeCompare(bBook);
          });
          break;
        case 'narrator':
          filteredHadiths.sort((a, b) => {
            const aNarrator = (a.narrator || '').toString();
            const bNarrator = (b.narrator || '').toString();
            return aNarrator.localeCompare(bNarrator);
          });
          break;
        case 'category':
          filteredHadiths.sort((a, b) => {
            const aCategory = (a.category || '').toString();
            const bCategory = (b.category || '').toString();
            return aCategory.localeCompare(bCategory);
          });
          break;
        case 'hadithNumber':
          filteredHadiths.sort((a, b) => {
            const aNum = parseInt(a.hadith_number) || 0;
            const bNum = parseInt(b.hadith_number) || 0;
            return aNum - bNum;
          });
          break;
        default:
          // Default sort by hadith number
          filteredHadiths.sort((a, b) => {
            const aNum = parseInt(a.hadith_number) || 0;
            const bNum = parseInt(b.hadith_number) || 0;
            return aNum - bNum;
          });
      }
    } else {
      // Default sort by hadith number
      filteredHadiths.sort((a, b) => {
        const aNum = parseInt(a.hadith_number) || 0;
        const bNum = parseInt(b.hadith_number) || 0;
        return aNum - bNum;
      });
    }
    
    // Apply pagination client-side
    let paginatedHadiths;
    let hasMore = false;
    let lastDocValue = null;
    
    if (searchQuery.trim()) {
      // For search queries, return all results (no pagination)
      paginatedHadiths = filteredHadiths;
      hasMore = false;
      lastDocValue = filteredHadiths.length;
    } else {
      // For regular browsing, apply pagination
      const startIndex = lastDoc ? parseInt(lastDoc) : 0;
      paginatedHadiths = filteredHadiths.slice(startIndex, startIndex + pageSize);
      hasMore = startIndex + pageSize < filteredHadiths.length;
      lastDocValue = startIndex + pageSize;
    }
    
    // Get total database count for stats
    const totalDatabaseCount = allHadiths.length;
    
    return {
      hadiths: paginatedHadiths,
      lastDoc: lastDocValue,
      hasMore: hasMore,
      totalCount: filteredHadiths.length,
      totalDatabaseCount: totalDatabaseCount
    };
    
  } catch (error) {
    console.error('Error searching hadiths:', error);
    throw error;
  }
}

// Get hadith by ID
export async function getHadithById(id) {
  try {
    const docRef = doc(db, 'hadiths', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting hadith by ID:', error);
    throw error;
  }
}

// Get hadiths by book (ALL HADITHS)
export async function getHadithsByBook(bookId, limit = 50) {
  try {
    const allHadiths = await getAllHadiths();
    
    // Map book IDs to collection names
    const bookCollectionMap = {
      'sahih-bukhari': 'Sahih al-Bukhari',
      'sahih-muslim': 'Sahih Muslim',
      'sunan-abu-dawud': 'Sunan Abu Dawud',
      'sunan-tirmidhi': 'Sunan Tirmidhi',
      'sunan-nasai': 'Sunan An-Nasai',
      'sunan-ibn-majah': 'Sunan Ibn Majah'
    };
    
    const targetCollection = bookCollectionMap[bookId];
    if (!targetCollection) {
      console.warn(`Unknown book ID: ${bookId}`);
      return [];
    }
    
    const hadiths = allHadiths.filter(hadith => 
      hadith.collection === targetCollection
    );
    
    // Sort by hadith number
    hadiths.sort((a, b) => {
      const aNum = parseInt(a.hadith_number) || 0;
      const bNum = parseInt(b.hadith_number) || 0;
      return aNum - bNum;
    });
    
    return hadiths.slice(0, limit);
  } catch (error) {
    console.error('Error getting hadiths by book:', error);
    throw error;
  }
}

// Get hadiths by narrator (ALL HADITHS)
export async function getHadithsByNarrator(narrator, limit = 50) {
  try {
    const allHadiths = await getAllHadiths();
    const narratorSearch = normalizeSearchText(narrator);
    
    const hadiths = allHadiths.filter(hadith => {
      const hadithNarrator = normalizeSearchText(hadith.narrator || '');
      return hadithNarrator.includes(narratorSearch);
    });
    
    return hadiths.slice(0, limit);
  } catch (error) {
    console.error('Error getting hadiths by narrator:', error);
    throw error;
  }
}

// Get hadiths by category (ALL HADITHS)
export async function getHadithsByCategory(category, limit = 50) {
  try {
    const allHadiths = await getAllHadiths();
    
    const hadiths = allHadiths.filter(hadith => 
      hadith.category === category
    );
    
    return hadiths.slice(0, limit);
  } catch (error) {
    console.error('Error getting hadiths by category:', error);
    throw error;
  }
}

// Get random hadith (ALL HADITHS)
export async function getRandomHadith() {
  try {
    const allHadiths = await getAllHadiths();
    
    if (allHadiths.length === 0) {
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * allHadiths.length);
    return allHadiths[randomIndex];
  } catch (error) {
    console.error('Error getting random hadith:', error);
    throw error;
  }
}

// Get unique categories (ALL HADITHS)
export async function getCategories() {
  try {
    const allHadiths = await getAllHadiths();
    
    const categories = new Set();
    allHadiths.forEach(hadith => {
      if (hadith.category) {
        categories.add(hadith.category);
      }
    });
    
    return Array.from(categories).sort();
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
}

// Get unique narrators (ALL HADITHS)
export async function getNarrators() {
  try {
    const allHadiths = await getAllHadiths();
    
    const narrators = new Set();
    allHadiths.forEach(hadith => {
      if (hadith.narrator) {
        narrators.add(hadith.narrator);
      }
    });
    
    return Array.from(narrators).sort();
  } catch (error) {
    console.error('Error getting narrators:', error);
    throw error;
  }
}

// Get hadith statistics (ALL HADITHS)
export async function getHadithStats() {
  try {
    const allHadiths = await getAllHadiths();
    
    console.log('📊 Stats Debug - Total hadiths:', allHadiths.length);
    
    if (allHadiths.length === 0) {
      console.warn('⚠️ No hadiths found in database. Please import data first.');
      return {
        totalHadiths: 0,
        books: {},
        categories: {},
        narrators: {},
        isEmpty: true
      };
    }
    
    console.log('📊 Stats Debug - First hadith:', allHadiths[0]);
    
    const stats = {
      totalHadiths: allHadiths.length,
      books: {},
      categories: {},
      narrators: {},
      isEmpty: false
    };
    
    allHadiths.forEach(hadith => {
      // Count by collection/book
      if (hadith.collection) {
        stats.books[hadith.collection] = (stats.books[hadith.collection] || 0) + 1;
      }
      
      // Count by category
      if (hadith.category) {
        stats.categories[hadith.category] = (stats.categories[hadith.category] || 0) + 1;
      }
      
      // Count by narrator
      if (hadith.narrator) {
        stats.narrators[hadith.narrator] = (stats.narrators[hadith.narrator] || 0) + 1;
      }
    });
    
    console.log('📊 Stats Debug - Final stats:', stats);
    return stats;
  } catch (error) {
    console.error('Error getting hadith stats:', error);
    throw error;
  }
}

// Check if database is empty
export async function isDatabaseEmpty() {
  try {
    const allHadiths = await getAllHadiths();
    return allHadiths.length === 0;
  } catch (error) {
    console.error('Error checking if database is empty:', error);
    return true; // Assume empty if error
  }
}

// Export HADITH_BOOKS for use in components
export { HADITH_BOOKS }; 