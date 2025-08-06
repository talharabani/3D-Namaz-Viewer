// Utility script to import hadith data into Firestore
// Run this script to populate your Firestore database with hadiths from JSON files

import { db } from './firebase';
import { collection, addDoc, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { clearHadithCache } from './hadithService';

// Function to load hadith data from JSON files
async function loadHadithData() {
  try {
    console.log('📂 Loading hadith data from JSON files...');
    
    let allHadiths = [];
    
    // Try to load data using fetch (more reliable than dynamic import)
    try {
      // Load bukhari data
      const bukhariResponse = await fetch('/data/bukhari.json');
      if (bukhariResponse.ok) {
        const bukhariData = await bukhariResponse.json();
        console.log(`📊 Bukhari data loaded: ${bukhariData.length} hadiths`);
        
        // Process bukhari data
        bukhariData.forEach((hadith, index) => {
          allHadiths.push({
            id: `bukhari-${hadith.hadith_number}`,
            collection: hadith.collection || 'Sahih al-Bukhari',
            book_number: hadith.book_number || 1,
            book_name: `Book ${hadith.book_number || 1}`, // Generate book name from book number
            chapter_number: hadith.chapter_number || 1,
            chapter_name: `Chapter ${hadith.chapter_number || 1}`, // Generate chapter name from chapter number
            hadith_number: hadith.hadith_number,
            text_arabic: hadith.text_arabic || '',
            translation_en: hadith.translation_en || '',
            chain_of_narrators: hadith.chain_of_narrators || '',
            reference: `${hadith.book_number || 1}.${hadith.chapter_number || 1}.${hadith.hadith_number}`,
            tags: hadith.tags || [],
            grade: hadith.grade || 'Sahih',
            narrator: hadith.narrator || 'Unknown',
            category: hadith.category || 'General',
            createdAt: new Date(),
            updatedAt: new Date()
          });
        });
      }
    } catch (error) {
      console.warn('⚠️ Could not load bukhari.json:', error.message);
    }
    
    // Try to load complete bukhari data
    try {
      const completeResponse = await fetch('/data/complete-bukhari.json');
      if (completeResponse.ok) {
        const completeData = await completeResponse.json();
        console.log(`📊 Complete Bukhari data loaded: ${completeData.length} hadiths`);
        
        // Process complete bukhari data
        completeData.forEach((hadith, index) => {
          // Check if this hadith is already added
          const exists = allHadiths.find(h => h.hadith_number === hadith.hadith_number);
          if (!exists) {
            allHadiths.push({
              id: `complete-bukhari-${hadith.hadith_number}`,
              collection: hadith.collection || 'Sahih al-Bukhari',
              book_number: hadith.book_number || 1,
              book_name: `Book ${hadith.book_number || 1}`, // Generate book name from book number
              chapter_number: hadith.chapter_number || 1,
              chapter_name: `Chapter ${hadith.chapter_number || 1}`, // Generate chapter name from chapter number
              hadith_number: hadith.hadith_number,
              text_arabic: hadith.text_arabic || '',
              translation_en: hadith.translation_en || '',
              chain_of_narrators: hadith.chain_of_narrators || '',
              reference: `${hadith.book_number || 1}.${hadith.chapter_number || 1}.${hadith.hadith_number}`,
              tags: hadith.tags || [],
              grade: hadith.grade || 'Sahih',
              narrator: hadith.narrator || 'Unknown',
              category: hadith.category || 'General',
              createdAt: new Date(),
              updatedAt: new Date()
            });
          }
        });
      }
    } catch (error) {
      console.warn('⚠️ Could not load complete-bukhari.json:', error.message);
    }
    
    // Try to load realistic bukhari data
    try {
      const realisticResponse = await fetch('/data/realistic-bukhari.json');
      if (realisticResponse.ok) {
        const realisticData = await realisticResponse.json();
        console.log(`📊 Realistic Bukhari data loaded: ${realisticData.length} hadiths`);
        
        // Process realistic bukhari data
        realisticData.forEach((hadith, index) => {
          // Check if this hadith is already added
          const exists = allHadiths.find(h => h.hadith_number === hadith.hadith_number);
          if (!exists) {
            allHadiths.push({
              id: `realistic-bukhari-${hadith.hadith_number}`,
              collection: hadith.collection || 'Sahih al-Bukhari',
              book_number: hadith.book_number || 1,
              book_name: `Book ${hadith.book_number || 1}`, // Generate book name from book number
              chapter_number: hadith.chapter_number || 1,
              chapter_name: `Chapter ${hadith.chapter_number || 1}`, // Generate chapter name from chapter number
              hadith_number: hadith.hadith_number,
              text_arabic: hadith.text_arabic || '',
              translation_en: hadith.translation_en || '',
              chain_of_narrators: hadith.chain_of_narrators || '',
              reference: `${hadith.book_number || 1}.${hadith.chapter_number || 1}.${hadith.hadith_number}`,
              tags: hadith.tags || [],
              grade: hadith.grade || 'Sahih',
              narrator: hadith.narrator || 'Unknown',
              category: hadith.category || 'General',
              createdAt: new Date(),
              updatedAt: new Date()
            });
          }
        });
      }
    } catch (error) {
      console.warn('⚠️ Could not load realistic-bukhari.json:', error.message);
    }
    
    // If no data was loaded, fall back to sample data
    if (allHadiths.length === 0) {
      console.log('🔄 No JSON data found, falling back to sample data...');
      return getSampleHadiths();
    }
    
    console.log(`📖 Total unique hadiths to import: ${allHadiths.length}`);
    return allHadiths;
    
  } catch (error) {
    console.error('❌ Error loading hadith data:', error);
    // Fallback to sample data if JSON import fails
    console.log('🔄 Falling back to sample data...');
    return getSampleHadiths();
  }
}

// Fallback sample hadith data
function getSampleHadiths() {
  return [
    {
      id: 'sample-1',
      collection: 'Sahih al-Bukhari',
      book_number: 1,
      book_name: 'Book of Revelation',
      chapter_number: 1,
      chapter_name: 'How the Divine Inspiration started',
      hadith_number: 1,
      text_arabic: 'حَدَّثَنَا الْحُمَيْدِيُّ عَبْدُ اللَّهِ بْنُ الزُّبَيْرِ، قَالَ حَدَّثَنَا سُفْيَانُ، قَالَ حَدَّثَنَا يَحْيَى بْنُ سَعِيدٍ الأَنْصَارِيُّ، قَالَ أَخْبَرَنِي مُحَمَّدُ بْنُ إِبْرَاهِيمَ التَّيْمِيُّ، أَنَّهُ سَمِعَ عَلْقَمَةَ بْنَ وَقَّاصٍ اللَّيْثِيَّ، يَقُولُ سَمِعْتُ عُمَرَ بْنَ الْخَطَّابِ ـ رضى الله عنه ـ عَلَى الْمِنْبَرِ قَالَ سَمِعْتُ رَسُولَ اللَّهِ صلى الله عليه وسلم يَقُولُ " إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ ".',
      translation_en: 'Narrated \'Umar bin Al-Khattab: I heard Allah\'s Apostle saying, "The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended. So whoever emigrated for worldly benefits or for a woman to marry, his emigration was for what he emigrated for."',
      chain_of_narrators: 'Al-Humaidi \'Abdullah bin Az-Zubair → Sufyan → Yahya bin Sa\'id Al-Ansari → Muhammad bin Ibrahim At-Taimi → \'Alqama bin Waqqas Al-Laithi → \'Umar bin Al-Khattab',
      reference: '1.1.1',
      tags: ['intentions', 'emigration', 'rewards', 'actions'],
      grade: 'Sahih',
      narrator: 'Umar ibn Al-Khattab',
      category: 'Intentions and Actions',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'sample-2',
      collection: 'Sahih al-Bukhari',
      book_number: 2,
      book_name: 'Book of Belief',
      chapter_number: 1,
      chapter_name: 'What is said regarding the deeds of the heart',
      hadith_number: 8,
      text_arabic: 'حَدَّثَنَا أَبُو الْيَمَانِ، قَالَ أَخْبَرَنَا شُعَيْبٌ، عَنِ الزُّهْرِيِّ، قَالَ أَخْبَرَنِي أَبُو سَلَمَةَ بْنُ عَبْدِ الرَّحْمَنِ، أَنَّ أَبَا هُرَيْرَةَ، قَالَ كَانَ النَّبِيُّ صلى الله عليه وسلم بَارِزًا يَوْمًا لِلنَّاسِ، فَأَتَاهُ جِبْرِيلُ فَقَالَ مَا الإِيمَانُ قَالَ " الإِيمَانُ أَنْ تُؤْمِنَ بِاللَّهِ وَمَلاَئِكَتِهِ وَكُتُبِهِ وَبِلِقَائِهِ وَرُسُلِهِ وَتُؤْمِنَ بِالْبَعْثِ ".',
      translation_en: 'Narrated Abu Huraira: One day while the Prophet was sitting in the company of some people, (The angel) Gabriel came and asked, "What is faith?" Allah\'s Apostle replied, \'Faith is to believe in Allah, His angels, (the) meeting with Him, His Apostles, and to believe in Resurrection.\'',
      chain_of_narrators: 'Abu Al-Yaman → Shu\'aib → Az-Zuhri → Abu Salama bin \'Abdur-Rahman → Abu Huraira',
      reference: '2.1.8',
      tags: ['faith', 'islam', 'belief', 'angels'],
      grade: 'Sahih',
      narrator: 'Abu Huraira',
      category: 'Faith and Belief',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
}

// Function to import hadiths to Firestore
export async function importHadithData() {
  try {
    console.log('🚀 Starting hadith data import...');
    
    // Load hadith data from JSON files
    const hadithsToImport = await loadHadithData();
    
    const hadithsCollection = collection(db, 'hadiths');
    let successCount = 0;
    let errorCount = 0;
    
    console.log(`📤 Importing ${hadithsToImport.length} hadiths to Firestore...`);
    
    // Import in batches to avoid overwhelming Firestore
    const batchSize = 50;
    for (let i = 0; i < hadithsToImport.length; i += batchSize) {
      const batch = hadithsToImport.slice(i, i + batchSize);
      
      console.log(`📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(hadithsToImport.length / batchSize)} (${batch.length} hadiths)`);
      
      for (const hadith of batch) {
        try {
          await addDoc(hadithsCollection, hadith);
          successCount++;
          if (successCount % 10 === 0) {
            console.log(`✅ Imported ${successCount} hadiths so far...`);
          }
        } catch (error) {
          errorCount++;
          console.error(`❌ Failed to import hadith ${hadith.hadith_number}:`, error.message);
        }
      }
      
      // Small delay between batches to be nice to Firestore
      if (i + batchSize < hadithsToImport.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    console.log(`\n📊 Import Summary:`);
    console.log(`✅ Successfully imported: ${successCount} hadiths`);
    console.log(`❌ Failed to import: ${errorCount} hadiths`);
    console.log(`📖 Total processed: ${hadithsToImport.length} hadiths`);
    
    return { successCount, errorCount, total: hadithsToImport.length };
    
  } catch (error) {
    console.error('❌ Error during import:', error);
    throw error;
  }
}

// Function to clear all hadiths from Firestore
export async function clearAllHadiths() {
  try {
    console.log('🗑️ Clearing all hadiths from Firestore...');
    
    const hadithsCollection = collection(db, 'hadiths');
    const querySnapshot = await getDocs(hadithsCollection);
    
    let deletedCount = 0;
    for (const doc of querySnapshot.docs) {
      await deleteDoc(doc.ref);
      deletedCount++;
    }
    
    console.log(`✅ Deleted ${deletedCount} hadiths from Firestore`);
    return deletedCount;
  } catch (error) {
    console.error('❌ Error clearing hadiths:', error);
    throw error;
  }
}

// Function to import book metadata
export async function importBookMetadata() {
  try {
    console.log('Starting book metadata import...');
    
    const booksCollection = collection(db, 'books');
    const books = [
      {
        bookId: 'sahih-bukhari',
        name: 'Sahih Bukhari',
        arabic: 'صحيح البخاري',
        author: 'Imam Muhammad ibn Ismail al-Bukhari',
        totalHadiths: 7563,
        description: 'The most authentic collection of hadith, compiled by Imam Bukhari (810-870 CE)',
        color: '#8B4513'
      },
      {
        bookId: 'sahih-muslim',
        name: 'Sahih Muslim',
        arabic: 'صحيح مسلم',
        author: 'Imam Muslim ibn al-Hajjaj',
        totalHadiths: 7563,
        description: 'Second most authentic hadith collection, compiled by Imam Muslim (817-875 CE)',
        color: '#2E8B57'
      },
      {
        bookId: 'sunan-abu-dawud',
        name: 'Sunan Abu Dawud',
        arabic: 'سنن أبي داود',
        author: 'Imam Abu Dawud',
        totalHadiths: 5274,
        description: 'Collection focusing on legal hadith, compiled by Imam Abu Dawud (817-889 CE)',
        color: '#4682B4'
      },
      {
        bookId: 'sunan-tirmidhi',
        name: 'Sunan Tirmidhi',
        arabic: 'سنن الترمذي',
        author: 'Imam Abu Isa Muhammad at-Tirmidhi',
        totalHadiths: 3956,
        description: 'Collection with detailed commentary, compiled by Imam Tirmidhi (824-892 CE)',
        color: '#D2691E'
      },
      {
        bookId: 'sunan-nasai',
        name: 'Sunan An-Nasai',
        arabic: 'سنن النسائي',
        author: 'Imam Ahmad ibn Shuayb an-Nasai',
        totalHadiths: 5662,
        description: 'Collection known for its authenticity, compiled by Imam Nasai (829-915 CE)',
        color: '#8A2BE2'
      },
      {
        bookId: 'sunan-ibn-majah',
        name: 'Sunan Ibn Majah',
        arabic: 'سنن ابن ماجه',
        author: 'Imam Muhammad ibn Yazid ibn Majah',
        totalHadiths: 4341,
        description: 'One of the six major hadith collections, compiled by Imam Ibn Majah (824-887 CE)',
        color: '#DC143C'
      }
    ];
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const book of books) {
      try {
        // Use setDoc with the bookId as document ID for easier querying
        await setDoc(doc(booksCollection, book.bookId), {
          ...book,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        successCount++;
        console.log(`✅ Imported book: ${book.name}`);
      } catch (error) {
        errorCount++;
        console.error(`❌ Failed to import book: ${book.name}`, error);
      }
    }
    
    console.log(`\n📚 Book Import Summary:`);
    console.log(`✅ Successfully imported: ${successCount} books`);
    console.log(`❌ Failed to import: ${errorCount} books`);
    console.log(`📖 Total processed: ${books.length} books`);
    
    return { successCount, errorCount, total: books.length };
    
  } catch (error) {
    console.error('❌ Error during book import:', error);
    throw error;
  }
}

// Function to run complete import
export async function runCompleteImport() {
  try {
    console.log('🚀 Starting complete Firestore import...\n');
    
    // Import books first
    const bookResult = await importBookMetadata();
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Import hadiths
    const hadithResult = await importHadithData();
    console.log('\n' + '='.repeat(50) + '\n');
    
    console.log('🎉 Import completed successfully!');
    console.log(`📚 Books imported: ${bookResult.successCount}/${bookResult.total}`);
    console.log(`📖 Hadiths imported: ${hadithResult.successCount}/${hadithResult.total}`);
    
    return {
      books: bookResult,
      hadiths: hadithResult
    };
    
  } catch (error) {
    console.error('❌ Complete import failed:', error);
    throw error;
  }
}

// Function to reset and reimport all data
export async function resetAndReimport() {
  try {
    console.log('🔄 Starting reset and reimport process...');
    
    // Clear all existing data
    const deletedCount = await clearAllHadiths();
    console.log(`🗑️ Cleared ${deletedCount} existing hadiths`);
    
    // Clear cache
    if (typeof clearHadithCache === 'function') {
      clearHadithCache();
    }
    
    // Wait a moment for Firestore to process deletions
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reimport all data
    const result = await runCompleteImport();
    
    console.log('✅ Reset and reimport completed successfully');
    return result;
    
  } catch (error) {
    console.error('❌ Error during reset and reimport:', error);
    throw error;
  }
}

// Export for use in browser console or other scripts
if (typeof window !== 'undefined') {
  window.importHadithData = importHadithData;
  window.importBookMetadata = importBookMetadata;
  window.runCompleteImport = runCompleteImport;
  window.clearAllHadiths = clearAllHadiths;
  window.resetAndReimport = resetAndReimport;
} 