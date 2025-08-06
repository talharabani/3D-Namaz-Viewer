// Simple browser test script for hadith search
// Run this in the browser console after the app is loaded

console.log('🧪 Starting hadith search test...');

// Function to check for duplicates in search results
function checkForDuplicates(hadiths) {
  const seenIds = new Set();
  const seenContent = new Set();
  const duplicates = [];
  
  hadiths.forEach((hadith, index) => {
    // Check for duplicate IDs
    if (seenIds.has(hadith.id)) {
      duplicates.push({
        type: 'duplicate_id',
        index,
        hadith: {
          id: hadith.id,
          hadith_number: hadith.hadith_number,
          narrator: hadith.narrator,
          collection: hadith.collection
        }
      });
    }
    
    // Check for duplicate content
    const contentKey = `${hadith.collection}-${hadith.hadith_number}-${hadith.book_number}`;
    if (seenContent.has(contentKey)) {
      duplicates.push({
        type: 'duplicate_content',
        index,
        hadith: {
          id: hadith.id,
          hadith_number: hadith.hadith_number,
          narrator: hadith.narrator,
          collection: hadith.collection,
          contentKey
        }
      });
    }
    
    seenIds.add(hadith.id);
    seenContent.add(contentKey);
  });
  
  return duplicates;
}

// Test function
async function testHadithSearch() {
  try {
    // Check if functions are available
    if (typeof window.searchHadiths === 'undefined') {
      console.error('❌ searchHadiths function not found');
      return;
    }

    // Test 1: Check if database has data
    console.log('\n🔍 Test 1: Checking database...');
    const emptyResult = await window.searchHadiths('');
    console.log(`📊 Total hadiths in database: ${emptyResult.totalDatabaseCount}`);

    if (emptyResult.totalDatabaseCount === 0) {
      console.log('⚠️ Database is empty. Please import data first.');
      return;
    }

    // Test 2: Search for "donation" and check for duplicates
    console.log('\n🔍 Test 2: Searching for "donation"...');
    const donationResult = await window.searchHadiths('donation');
    console.log(`✅ Found ${donationResult.hadiths.length} hadiths for "donation"`);
    
    // Check for duplicates
    const donationDuplicates = checkForDuplicates(donationResult.hadiths);
    if (donationDuplicates.length > 0) {
      console.log(`❌ Found ${donationDuplicates.length} duplicates in donation search:`, donationDuplicates);
    } else {
      console.log('✅ No duplicates found in donation search');
    }

    if (donationResult.hadiths.length > 0) {
      console.log('📖 First result:', {
        id: donationResult.hadiths[0].id,
        hadith_number: donationResult.hadiths[0].hadith_number,
        narrator: donationResult.hadiths[0].narrator,
        collection: donationResult.hadiths[0].collection
      });
      
      // Show first few results to verify they're different
      console.log('📖 First 3 results:');
      donationResult.hadiths.slice(0, 3).forEach((hadith, index) => {
        console.log(`  ${index + 1}. ${hadith.collection} #${hadith.hadith_number} - ${hadith.narrator}`);
      });
    }

    // Test 3: Search for "intention"
    console.log('\n🔍 Test 3: Searching for "intention"...');
    const intentionResult = await window.searchHadiths('intention');
    console.log(`✅ Found ${intentionResult.hadiths.length} hadiths for "intention"`);
    
    // Check for duplicates
    const intentionDuplicates = checkForDuplicates(intentionResult.hadiths);
    if (intentionDuplicates.length > 0) {
      console.log(`❌ Found ${intentionDuplicates.length} duplicates in intention search:`, intentionDuplicates);
    } else {
      console.log('✅ No duplicates found in intention search');
    }

    if (intentionResult.hadiths.length > 0) {
      console.log('📖 First result:', {
        id: intentionResult.hadiths[0].id,
        hadith_number: intentionResult.hadiths[0].hadith_number,
        narrator: intentionResult.hadiths[0].narrator,
        collection: intentionResult.hadiths[0].collection
      });
    }

    // Test 4: Search for "umar"
    console.log('\n🔍 Test 4: Searching for "umar"...');
    const umarResult = await window.searchHadiths('umar');
    console.log(`✅ Found ${umarResult.hadiths.length} hadiths for "umar"`);
    
    // Check for duplicates
    const umarDuplicates = checkForDuplicates(umarResult.hadiths);
    if (umarDuplicates.length > 0) {
      console.log(`❌ Found ${umarDuplicates.length} duplicates in umar search:`, umarDuplicates);
    } else {
      console.log('✅ No duplicates found in umar search');
    }

    if (umarResult.hadiths.length > 0) {
      console.log('📖 First result:', {
        id: umarResult.hadiths[0].id,
        hadith_number: umarResult.hadiths[0].hadith_number,
        narrator: umarResult.hadiths[0].narrator,
        collection: umarResult.hadiths[0].collection
      });
    }

    console.log('\n✅ All tests completed!');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testHadithSearch();

// Quick test function for donation search (can be run directly in console)
async function testDonationSearch() {
  console.log('🧪 Testing donation search for duplicates...');
  
  if (typeof window.searchHadiths === 'undefined') {
    console.error('❌ searchHadiths function not found');
    return;
  }
  
  try {
    const result = await window.searchHadiths('donation');
    console.log(`📊 Found ${result.hadiths.length} hadiths for "donation"`);
    
    // Check for duplicates
    const duplicates = checkForDuplicates(result.hadiths);
    if (duplicates.length > 0) {
      console.log(`❌ Found ${duplicates.length} duplicates:`, duplicates);
    } else {
      console.log('✅ No duplicates found!');
    }
    
    // Show first 5 results
    console.log('📖 First 5 results:');
    result.hadiths.slice(0, 5).forEach((hadith, index) => {
      console.log(`  ${index + 1}. ${hadith.collection} #${hadith.hadith_number} - ${hadith.narrator}`);
    });
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Make the test function available globally
window.testDonationSearch = testDonationSearch; 