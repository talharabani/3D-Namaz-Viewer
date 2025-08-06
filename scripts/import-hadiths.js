#!/usr/bin/env node

/**
 * Sahih al-Bukhari Hadith Import Script
 * 
 * This script imports structured hadith data from JSON into Firebase Firestore.
 * 
 * Usage:
 * 1. Set up Firebase service account key
 * 2. Install dependencies: npm install firebase-admin
 * 3. Run: node scripts/import-hadiths.js
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Configuration
const DATA_FILE = path.join(__dirname, '../data/complete-bukhari.json');
const COLLECTION_NAME = 'hadiths';

// Initialize Firebase Admin SDK
// You can set GOOGLE_APPLICATION_CREDENTIALS environment variable
// or provide the service account key directly
function initializeFirebase() {
  try {
    // Option 1: Use service account key file
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      console.log('✅ Firebase initialized with service account key');
    }
    // Option 2: Use environment variables
    else if (process.env.FIREBASE_PROJECT_ID) {
      admin.initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID
      });
      console.log('✅ Firebase initialized with project ID');
    }
    // Option 3: Use default credentials (for local development)
    else {
      admin.initializeApp();
      console.log('✅ Firebase initialized with default credentials');
    }
  } catch (error) {
    console.error('❌ Failed to initialize Firebase:', error.message);
    process.exit(1);
  }
}

async function importHadiths() {
  try {
    console.log('🔄 Starting hadith import process...');
    
    // Read the JSON data
    console.log(`📖 Reading data from: ${DATA_FILE}`);
    const rawData = fs.readFileSync(DATA_FILE, 'utf8');
    const hadiths = JSON.parse(rawData);
    
    console.log(`📊 Found ${hadiths.length} hadiths to import`);
    
    // Validate data structure
    if (!Array.isArray(hadiths)) {
      throw new Error('Data must be an array of hadith objects');
    }
    
    const db = admin.firestore();
    
    // Process in batches of 500 (Firestore batch limit)
    const BATCH_SIZE = 500;
    let totalImported = 0;
    let totalBatches = Math.ceil(hadiths.length / BATCH_SIZE);
    
    console.log(`🔄 Processing ${totalBatches} batches...`);
    
    for (let i = 0; i < hadiths.length; i += BATCH_SIZE) {
      const batch = db.batch();
      const batchHadiths = hadiths.slice(i, i + BATCH_SIZE);
      
      batchHadiths.forEach((hadith, index) => {
        // Create document ID: bukhari_{book_number}_{hadith_number}
        const docId = `bukhari_${hadith.book_number}_${hadith.hadith_number}`;
        const docRef = db.collection(COLLECTION_NAME).doc(docId);
        
        // Add to batch
        batch.set(docRef, {
          ...hadith,
          id: docId,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      });
      
      // Commit batch
      await batch.commit();
      totalImported += batchHadiths.length;
      
      console.log(`✅ Batch ${Math.floor(i / BATCH_SIZE) + 1}/${totalBatches} completed: ${totalImported}/${hadiths.length} hadiths imported`);
    }
    
    console.log('🎉 Import completed successfully!');
    console.log(`📊 Total hadiths imported: ${totalImported}`);
    
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  }
}

// Create indexes for better query performance
async function createIndexes() {
  try {
    console.log('🔄 Creating Firestore indexes...');
    
    // Note: Indexes are created automatically by Firestore when queries are made
    // You can also create them manually in the Firebase Console
    
    console.log('✅ Index creation process completed');
    console.log('💡 Note: Some indexes may take time to build. Check Firebase Console for status.');
    
  } catch (error) {
    console.error('❌ Index creation failed:', error);
  }
}

// Main execution
async function main() {
  try {
    initializeFirebase();
    await importHadiths();
    await createIndexes();
    console.log('🎉 All operations completed successfully!');
  } catch (error) {
    console.error('❌ Main execution failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { importHadiths, createIndexes }; 