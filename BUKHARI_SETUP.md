# Sahih al-Bukhari Hadith Database Setup Guide

This guide provides complete instructions for setting up a Sahih al-Bukhari hadith database using Firebase Firestore and integrating it with the Namaz app.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Firebase Setup](#firebase-setup)
4. [Data Preparation](#data-preparation)
5. [Import Process](#import-process)
6. [Frontend Integration](#frontend-integration)
7. [Security & Performance](#security--performance)
8. [Troubleshooting](#troubleshooting)

## 🎯 Overview

This system provides:
- **Structured hadith data** in JSON format
- **Firebase Firestore integration** for scalable storage
- **TypeScript frontend utilities** for querying and searching
- **Import scripts** for batch data processing
- **Security rules** for controlled access
- **Offline caching** capabilities

## 🔧 Prerequisites

### Required Software
- Node.js (v16 or higher)
- npm or yarn
- Firebase CLI (optional but recommended)

### Required Accounts
- Firebase project account
- Google Cloud Platform access

## 🚀 Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name (e.g., "namaz-hadith-db")
4. Enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (we'll update security rules later)
4. Select a location (choose closest to your users)
5. Click "Done"

### 3. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" → Web app
4. Register app with a nickname
5. Copy the configuration object

### 4. Set Up Service Account (for Admin Operations)

1. In Project Settings, go to "Service accounts" tab
2. Click "Generate new private key"
3. Download the JSON file
4. **Keep this file secure and never commit it to version control**

## 📊 Data Preparation

### 1. Data Schema

The system expects hadith data in this JSON structure:

```json
{
  "collection": "Sahih al-Bukhari",
  "book_number": 1,
  "book_name": "Book of Revelation",
  "chapter_number": 1,
  "chapter_name": "How the Divine Inspiration started",
  "hadith_number": 1,
  "text_arabic": "Arabic text here...",
  "translation_en": "English translation here...",
  "chain_of_narrators": "Narrator chain here...",
  "reference": "1.1.1",
  "tags": ["intentions", "emigration"],
  "grade": "Sahih",
  "narrator": "Umar ibn Al-Khattab",
  "category": "Intentions and Actions"
}
```

### 2. Sample Data

A sample dataset is provided in `data/bukhari.json` with 5 authentic hadiths.

### 3. Data Conversion

Use the conversion utility for different data formats:

```bash
# Convert CSV to JSON
node scripts/convert-hadith-data.js csv input.csv output.json

# Convert XML to JSON
node scripts/convert-hadith-data.js xml input.xml output.json

# Validate JSON data
node scripts/convert-hadith-data.js validate data.json

# Generate sample data
node scripts/convert-hadith-data.js sample data/sample.json 20
```

## 📥 Import Process

### 1. Install Dependencies

```bash
# Install Firebase Admin SDK
npm install firebase-admin

# Install conversion utilities (optional)
npm install csv-parser xml2js
```

### 2. Set Up Environment Variables

Create a `.env` file in your project root:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=./path/to/serviceAccountKey.json

# Optional: Use environment variables instead of service account file
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your-sender-id
FIREBASE_APP_ID=your-app-id
```

### 3. Run Import Script

```bash
# Import the sample data
node scripts/import-hadiths.js

# The script will:
# - Load data from data/bukhari.json
# - Validate each hadith
# - Import to Firestore in batches
# - Generate document IDs: bukhari_1_1, bukhari_1_2, etc.
# - Report success/failure statistics
```

### 4. Verify Import

1. Go to Firebase Console → Firestore Database
2. Check the `hadiths` collection
3. Verify documents are created with proper structure
4. Check document IDs follow the pattern `bukhari_{book}_{hadith}`

## 🎨 Frontend Integration

### 1. Update Firebase Configuration

Update `src/utils/firebase.js` with your project configuration:

```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

### 2. Use Bukhari Service

The `src/utils/bukhariService.ts` provides TypeScript utilities:

```typescript
import { 
  getHadithById, 
  searchHadiths, 
  getHadithsByBook,
  getRandomHadith 
} from './bukhariService';

// Get a specific hadith
const hadith = await getHadithById('bukhari_1_1');

// Search hadiths
const results = await searchHadiths({
  search: 'intentions',
  book_number: 1,
  limit: 10
});

// Get hadiths by book
const bookHadiths = await getHadithsByBook(1, { limit: 20 });

// Get random hadith
const randomHadith = await getRandomHadith();
```

### 3. Integrate with Namaz App

Update your Hadith screen to use the new service:

```typescript
// In src/screens/HadithScreen.jsx
import { searchHadiths, getCategories, getNarrators } from '../utils/bukhariService';

// Replace existing hadith loading logic
const loadHadiths = async () => {
  const result = await searchHadiths({
    search: searchQuery,
    book_number: selectedBook !== 'all' ? parseInt(selectedBook) : undefined,
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    narrator: selectedNarrator !== 'all' ? selectedNarrator : undefined,
    limit: 20
  });
  
  setHadiths(result.hadiths);
  setHasMore(result.hasMore);
};
```

## 🔒 Security & Performance

### 1. Deploy Security Rules

```bash
# Using Firebase CLI
firebase deploy --only firestore:rules

# Or manually in Firebase Console
# Copy content from firestore.rules
```

### 2. Create Indexes

For better performance, create these indexes in Firebase Console:

1. **Collection**: `hadiths`
   - **Fields**: `book_number` (Ascending), `hadith_number` (Ascending)

2. **Collection**: `hadiths`
   - **Fields**: `collection` (Ascending), `book_number` (Ascending)

3. **Collection**: `hadiths`
   - **Fields**: `category` (Ascending), `hadith_number` (Ascending)

### 3. Monitor Usage

- Set up Firebase usage alerts
- Monitor read/write operations
- Track storage costs
- Set up billing alerts

## 🛠️ Troubleshooting

### Common Issues

#### 1. Import Script Errors

**Problem**: "Failed to initialize Firebase"
**Solution**: 
- Check service account key path
- Verify environment variables
- Ensure Firebase project exists

**Problem**: "Batch commit failed"
**Solution**:
- Check Firestore quotas
- Reduce batch size (default: 500)
- Verify data structure

#### 2. Frontend Connection Issues

**Problem**: "Firebase not initialized"
**Solution**:
- Check Firebase configuration
- Verify environment variables
- Ensure Firebase app is initialized

**Problem**: "Permission denied"
**Solution**:
- Deploy security rules
- Check collection permissions
- Verify user authentication (if required)

#### 3. Performance Issues

**Problem**: Slow queries
**Solution**:
- Create proper indexes
- Use pagination
- Implement client-side caching
- Optimize query filters

### Debug Commands

```bash
# Validate data structure
node scripts/convert-hadith-data.js validate data/bukhari.json

# Test Firebase connection
node -e "
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
db.collection('test').add({test: true}).then(() => console.log('✅ Connected'));
"

# Check Firestore rules
firebase firestore:rules:get
```

## 📚 Additional Resources

### Data Sources

- **Sahih al-Bukhari**: Available in various digital formats
- **Hadith APIs**: Some public APIs provide hadith data
- **Academic databases**: University libraries often have structured data

### Firebase Documentation

- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Security Rules Guide](https://firebase.google.com/docs/firestore/security/get-started)
- [Performance Best Practices](https://firebase.google.com/docs/firestore/best-practices)

### TypeScript Resources

- [Firebase TypeScript Guide](https://firebase.google.com/docs/web/setup#typescript)
- [Firestore TypeScript Examples](https://github.com/firebase/firebase-js-sdk/tree/master/packages/firestore)

## 🎉 Next Steps

1. **Import your hadith data** using the provided scripts
2. **Test the frontend integration** with sample queries
3. **Deploy security rules** for production use
4. **Monitor performance** and optimize as needed
5. **Add more hadith collections** (Sahih Muslim, etc.)
6. **Implement advanced features** like user favorites, reading history

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review Firebase documentation
3. Check GitHub issues for similar problems
4. Create a new issue with detailed error information

---

**Note**: This system is designed for educational and religious purposes. Ensure compliance with copyright and licensing requirements when using hadith data. 