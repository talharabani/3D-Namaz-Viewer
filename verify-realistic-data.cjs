const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase
const keyPath = path.join(__dirname, 'serviceAccountKey.json');
const serviceAccount = require(keyPath);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function verifyData() {
  try {
    const db = admin.firestore();
    
    console.log('🔍 Verifying realistic hadith data...');
    
    // Get a few sample hadiths
    const snapshot = await db.collection('hadiths').limit(5).get();
    
    console.log(`📊 Found ${snapshot.size} sample hadiths`);
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      console.log('\n📖 Sample Hadith:');
      console.log(`   ID: ${doc.id}`);
      console.log(`   Number: ${data.hadith_number}`);
      console.log(`   Book: ${data.book_number}`);
      console.log(`   Narrator: ${data.narrator}`);
      console.log(`   Grade: ${data.grade}`);
      console.log(`   Arabic: ${data.text_arabic ? data.text_arabic.substring(0, 50) + '...' : 'N/A'}`);
      console.log(`   English: ${data.translation_en ? data.translation_en.substring(0, 100) + '...' : 'N/A'}`);
    });
    
    // Get total count
    const totalSnapshot = await db.collection('hadiths').get();
    console.log(`\n📈 Total hadiths in database: ${totalSnapshot.size}`);
    
    console.log('\n✅ Verification completed successfully!');
    
  } catch (error) {
    console.error('❌ Verification failed:', error);
  } finally {
    process.exit(0);
  }
}

verifyData(); 