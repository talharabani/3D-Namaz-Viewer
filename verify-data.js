const fs = require('fs');

console.log('🔍 Verifying complete Bukhari dataset...');

try {
  // Read the complete dataset
  const data = JSON.parse(fs.readFileSync('./data/complete-bukhari.json', 'utf8'));
  
  console.log(`📊 Total hadiths: ${data.length}`);
  
  if (data.length === 7275) {
    console.log('✅ Dataset verification successful!');
    console.log('📋 Sample hadiths:');
    
    // Show first 3 hadiths
    for (let i = 0; i < 3; i++) {
      const hadith = data[i];
      console.log(`\n${i + 1}. Hadith #${hadith.hadith_number}`);
      console.log(`   Book: ${hadith.book_name}`);
      console.log(`   Arabic: ${hadith.text_arabic.substring(0, 50)}...`);
      console.log(`   English: ${hadith.translation_en.substring(0, 50)}...`);
    }
    
    // Show last hadith
    const lastHadith = data[data.length - 1];
    console.log(`\n📖 Last hadith #${lastHadith.hadith_number}`);
    console.log(`   Book: ${lastHadith.book_name}`);
    console.log(`   Arabic: ${lastHadith.text_arabic.substring(0, 50)}...`);
    
    console.log('\n🎉 Dataset is ready for import to Firestore!');
    console.log('\n📝 Next steps:');
    console.log('   1. Set up Firebase service account key');
    console.log('   2. Run: node scripts/import-hadiths.js');
    console.log('   3. Verify data in Firebase Console');
    
  } else {
    console.log(`❌ Expected 7275 hadiths, but found ${data.length}`);
  }
  
} catch (error) {
  console.error('❌ Error reading dataset:', error.message);
} 