const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase
const keyPath = path.join(__dirname, 'serviceAccountKey.json');
const serviceAccount = require(keyPath);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function clearAndImport() {
  try {
    const db = admin.firestore();
    
    console.log('🗑️ Clearing existing hadith data...');
    
    // Delete all existing hadiths in smaller batches
    const DELETE_BATCH_SIZE = 100;
    let totalDeleted = 0;
    
    while (true) {
      const snapshot = await db.collection('hadiths').limit(DELETE_BATCH_SIZE).get();
      
      if (snapshot.empty) {
        break;
      }
      
      const batch = db.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      
      await batch.commit();
      totalDeleted += snapshot.docs.length;
      console.log(`✅ Deleted batch: ${totalDeleted} total deleted`);
    }
    
    console.log(`✅ Deleted ${totalDeleted} existing hadiths`);
    
    // Read and import realistic data
    console.log('📖 Reading realistic hadith data...');
    const dataPath = path.join(__dirname, 'data', 'realistic-bukhari.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const hadiths = JSON.parse(rawData);
    
    console.log(`📊 Found ${hadiths.length} hadiths to import`);
    
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
        const docRef = db.collection('hadiths').doc(docId);
        
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
    
    // Verify the import
    console.log('\n🔍 Verifying import...');
    const verifySnapshot = await db.collection('hadiths').limit(3).get();
    
    verifySnapshot.forEach((doc) => {
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
    
  } catch (error) {
    console.error('❌ Operation failed:', error);
  } finally {
    process.exit(0);
  }
}

clearAndImport(); 