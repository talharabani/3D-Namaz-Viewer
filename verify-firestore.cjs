const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

console.log('🔍 Verifying Firestore database...');

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function verifyHadiths() {
  try {
    console.log('📖 Counting hadiths in Firestore...');
    
    const snapshot = await db.collection('hadiths').get();
    
    console.log(`📊 Total hadiths in Firestore: ${snapshot.size}`);
    
    if (snapshot.size === 7275) {
      console.log('✅ SUCCESS: All 7,275 hadiths are in Firestore!');
    } else {
      console.log(`❌ ISSUE: Expected 7,275 hadiths, but found ${snapshot.size}`);
    }
    
    console.log('\n📋 Sample document IDs:');
    snapshot.docs.slice(0, 5).forEach(doc => {
      console.log(`  - ${doc.id}`);
    });
    
    console.log('\n📋 Last 5 document IDs:');
    snapshot.docs.slice(-5).forEach(doc => {
      console.log(`  - ${doc.id}`);
    });
    
    // Check for Bukhari hadiths specifically
    const bukhariHadiths = snapshot.docs.filter(doc => 
      doc.id.startsWith('bukhari_') || 
      doc.data().collection === 'Sahih al-Bukhari'
    );
    
    console.log(`\n📚 Bukhari hadiths found: ${bukhariHadiths.length}`);
    
    if (bukhariHadiths.length === 7275) {
      console.log('✅ All Sahih al-Bukhari hadiths are present!');
    } else {
      console.log(`❌ Missing ${7275 - bukhariHadiths.length} Bukhari hadiths`);
    }
    
  } catch (error) {
    console.error('❌ Error verifying database:', error);
  } finally {
    process.exit(0);
  }
}

verifyHadiths(); 