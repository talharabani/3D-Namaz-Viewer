# Firebase Setup for Hadith Database

## ✅ **COMPLETED SETUP**

Your Firebase configuration has been successfully set up! Here's what's been done:

### 1. ✅ Firebase Project Created
- Project ID: `namaz-hadith-db`
- Firebase configuration has been added to `src/utils/firebase.js`

### 2. ✅ Firestore Database Enabled
- Database is ready for use
- Security rules set to allow read access

### 3. ✅ Firebase SDK Installed
- Firebase v10+ installed with `--legacy-peer-deps` flag
- All necessary imports are working

### 4. ✅ App Integration Complete
- HadithScreen updated to use Firestore
- Search, filtering, and pagination implemented
- Loading and error states added
- Import functionality ready

## 🚀 **NEXT STEPS**

### 1. Import Sample Data
1. Open your app in the browser
2. Navigate to the Hadith screen
3. Click the "📥 Import Sample Data to Firestore" button
4. This will import 9 sample hadiths and 6 book metadata entries

### 2. Test the Functionality
- Search for hadiths using the search bar
- Filter by book, category, or narrator
- Click on hadiths to view details
- Use the random hadith feature

### 3. Add More Data
You can add more hadiths by:
- Using the import script in browser console: `runCompleteImport()`
- Manually adding documents to Firestore
- Creating a larger dataset

## 📊 **Current Configuration**

Your Firebase config in `src/utils/firebase.js`:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD0ji6hpzQFABnVIBbXC59H_G8nkgTSEFc",
  authDomain: "namaz-hadith-db.firebaseapp.com",
  projectId: "namaz-hadith-db",
  storageBucket: "namaz-hadith-db.firebasestorage.app",
  messagingSenderId: "942434588018",
  appId: "1:942434588018:web:0036b8fedf677d730679eb",
  measurementId: "G-QCYLK59HEB"
};
```

## 5. Firestore Security Rules

Update your Firestore security rules to allow read access:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to hadiths collection
    match /hadiths/{document} {
      allow read: if true;
    }
    
    // Allow read access to books collection
    match /books/{document} {
      allow read: if true;
    }
  }
}
```

## 6. Data Structure

Your Firestore collections should have this structure:

### Collection: `hadiths`
Each document should contain:
```javascript
{
  bookId: "sahih-bukhari",
  book: "Sahih Bukhari",
  hadithNumber: "1",
  title: "Actions Are by Intentions",
  arabicText: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ...",
  englishText: "The Prophet Muhammad ﷺ said...",
  narrator: "Umar ibn Al-Khattab",
  category: "Intentions",
  grade: "Sahih",
  chapter: "Book of Revelation"
}
```

### Collection: `books` (optional)
Each document should contain:
```javascript
{
  bookId: "sahih-bukhari",
  name: "Sahih Bukhari",
  arabic: "صحيح البخاري",
  author: "Imam Muhammad ibn Ismail al-Bukhari",
  totalHadiths: 7563,
  description: "The most authentic collection...",
  color: "#8B4513"
}
```

## 7. Import Sample Data

You can use the sample data from `src/data/hadithDatabase.js` as a starting point. Convert the arrays to individual documents in Firestore.

## 8. Test the Connection

Once configured, the app will:
- Load hadiths from Firestore instead of local data
- Provide real-time search and filtering
- Support pagination for large datasets
- Show loading and error states

## 9. Environment Variables (Optional)

For better security, you can use environment variables:

1. Create `.env` file in your project root
2. Add your Firebase config:
```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

3. Update `src/utils/firebase.js`:
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## 10. Deployment Considerations

- Update Firestore security rules for production
- Consider implementing user authentication if needed
- Set up proper indexes for complex queries
- Monitor usage and costs 