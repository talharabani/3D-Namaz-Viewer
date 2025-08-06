// Test script to verify hadith import functionality
import { resetAndReimport, getHadithStats } from './src/utils/importHadithData.js';
import { clearHadithCache } from './src/utils/hadithService.js';

async function testImport() {
  try {
    console.log('🧪 Starting hadith import test...');
    
    // Clear cache first
    clearHadithCache();
    
    // Reset and reimport data
    const result = await resetAndReimport();
    
    console.log('✅ Import completed:', result);
    
    // Get stats to verify
    const stats = await getHadithStats();
    console.log('📊 Final stats:', stats);
    
    // Test search
    const { searchHadiths } = await import('./src/utils/hadithService.js');
    const searchResult = await searchHadiths('umar');
    console.log('🔍 Search for "umar" found:', searchResult.hadiths.length, 'hadiths');
    
    if (searchResult.hadiths.length > 0) {
      console.log('✅ Search is working!');
    } else {
      console.log('⚠️ Search returned no results');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testImport(); 