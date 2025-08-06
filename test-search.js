// Browser-compatible test script for search functionality
// Run this in the browser console after the app is loaded

async function testSearchFunctionality() {
  try {
    console.log('🧪 Starting search functionality test...');

    // Check if the search functions are available
    if (typeof window.searchHadiths === 'undefined') {
      console.error('❌ searchHadiths function not found. Make sure the app is loaded.');
      return;
    }

    // Clear cache first
    if (typeof window.clearHadithCache === 'function') {
      window.clearHadithCache();
    }

    // Test 1: Search for "intention"
    console.log('\n🔍 Test 1: Searching for "intention"');
    const intentionResults = await window.searchHadiths('intention');
    console.log(`Found ${intentionResults.hadiths.length} hadiths for "intention"`);
    console.log(`Total database count: ${intentionResults.totalDatabaseCount}`);

    if (intentionResults.hadiths.length > 0) {
      console.log('First result:', {
        id: intentionResults.hadiths[0].id,
        hadith_number: intentionResults.hadiths[0].hadith_number,
        narrator: intentionResults.hadiths[0].narrator,
        collection: intentionResults.hadiths[0].collection
      });
    }

    // Test 2: Search for "donation"
    console.log('\n🔍 Test 2: Searching for "donation"');
    const donationResults = await window.searchHadiths('donation');
    console.log(`Found ${donationResults.hadiths.length} hadiths for "donation"`);
    console.log(`Total database count: ${donationResults.totalDatabaseCount}`);

    if (donationResults.hadiths.length > 0) {
      console.log('First result:', {
        id: donationResults.hadiths[0].id,
        hadith_number: donationResults.hadiths[0].hadith_number,
        narrator: donationResults.hadiths[0].narrator,
        collection: donationResults.hadiths[0].collection
      });
    }

    // Test 3: Search for "umar"
    console.log('\n🔍 Test 3: Searching for "umar"');
    const umarResults = await window.searchHadiths('umar');
    console.log(`Found ${umarResults.hadiths.length} hadiths for "umar"`);
    console.log(`Total database count: ${umarResults.totalDatabaseCount}`);

    if (umarResults.hadiths.length > 0) {
      console.log('First result:', {
        id: umarResults.hadiths[0].id,
        hadith_number: umarResults.hadiths[0].hadith_number,
        narrator: umarResults.hadiths[0].narrator,
        collection: umarResults.hadiths[0].collection
      });
    }

    // Test 4: Empty search (should return all hadiths)
    console.log('\n🔍 Test 4: Empty search');
    const emptyResults = await window.searchHadiths('');
    console.log(`Found ${emptyResults.hadiths.length} hadiths for empty search`);
    console.log(`Total database count: ${emptyResults.totalDatabaseCount}`);

    console.log('\n✅ Search functionality test completed!');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Instructions for running the test
console.log(`
🧪 SEARCH FUNCTIONALITY TEST
============================

To run this test:

1. Open your browser and navigate to the app
2. Open the browser console (F12)
3. Copy and paste this entire script
4. Run: testSearchFunctionality()

This will test:
- Search for "intention" (should find results, no duplicates)
- Search for "donation" (should find results)
- Search for "umar" (should find results)
- Empty search (should return all hadiths)

Each test will show:
- Number of results found
- Total database count
- First result details (if any found)
`);

// Export the test function
window.testSearchFunctionality = testSearchFunctionality; 