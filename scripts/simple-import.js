const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

console.log('🔄 Starting simple hadith import...');

// Configuration
const DATA_FILE = path.join(__dirname, '../data/complete-bukhari.json');
const COLLECTION_NAME = 'hadiths';

// Initialize Firebase (you'll need to add your service account key)
function initializeFirebase() {
  try {
    // Option 1: If you have serviceAccountKey.json in project root
    const keyPath = path.join(__dirname, '../serviceAccountKey.json');
    if (fs.existsSync(keyPath)) {
      const serviceAccount = require(keyPath);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      console.log('✅ Firebase initialized with service account key');
      return;
    }
    
    // Option 2: Use environment variable
    if (process.env.FIREBASE_PROJECT_ID) {
      admin.initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID
      });
      console.log('✅ Firebase initialized with project ID');
      return;
    }
    
    // Option 3: Default initialization
    admin.initializeApp();
    console.log('✅ Firebase initialized with default credentials');
    
  } catch (error) {
    console.error('❌ Failed to initialize Firebase:', error.message);
    console.log('\n💡 To fix this:');
    console.log('   1. Download service account key from Firebase Console');
    console.log('   2. Save it as "serviceAccountKey.json" in project root');
    console.log('   3. Or set FIREBASE_PROJECT_ID environment variable');
    process.exit(1);
  }
}

async function importHadiths() {
  try {
    // Read data
    console.log(`📖 Reading data from: ${DATA_FILE}`);
    const rawData = fs.readFileSync(DATA_FILE, 'utf8');
    const hadiths = JSON.parse(rawData);
    
    console.log(`📊 Found ${hadiths.length} hadiths to import`);
    
    if (!Array.isArray(hadiths)) {
      throw new Error('Data must be an array');
    }
    
    const db = admin.firestore();
    
    // Import in batches
    const BATCH_SIZE = 500;
    let totalImported = 0;
    let totalBatches = Math.ceil(hadiths.length / BATCH_SIZE);
    
    console.log(`🔄 Processing ${totalBatches} batches...`);
    
    for (let i = 0; i < hadiths.length; i += BATCH_SIZE) {
      const batch = db.batch();
      const batchHadiths = hadiths.slice(i, i + BATCH_SIZE);
      
      batchHadiths.forEach((hadith) => {
        const docId = `bukhari_${hadith.book_number}_${hadith.hadith_number}`;
        const docRef = db.collection(COLLECTION_NAME).doc(docId);
        
        batch.set(docRef, {
          ...hadith,
          id: docId,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      });
      
      await batch.commit();
      totalImported += batchHadiths.length;
      
      console.log(`✅ Batch ${Math.floor(i / BATCH_SIZE) + 1}/${totalBatches}: ${totalImported}/${hadiths.length} imported`);
    }
    
    console.log('🎉 Import completed successfully!');
    console.log(`📊 Total hadiths imported: ${totalImported}`);
    
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
}

// Main execution
async function main() {
  try {
    initializeFirebase();
    await importHadiths();
    console.log('\n🎉 All done! Check Firebase Console to verify the data.');
  } catch (error) {
    console.error('❌ Main execution failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
} 