# Firebase Setup and Import Guide

## Step 1: Get Firebase Service Account Key

1. **Go to Firebase Console:**
   - Visit: https://console.firebase.google.com/
   - Select your project: `namaz-hadith-db`

2. **Navigate to Project Settings:**
   - Click the gear icon ⚙️ next to "Project Overview"
   - Select "Project settings"

3. **Go to Service Accounts Tab:**
   - Click on "Service accounts" tab
   - Click "Generate new private key"
   - Download the JSON file

4. **Save the Key File:**
   - Save the downloaded JSON file as `serviceAccountKey.json`
   - Place it in your project root directory

## Step 2: Update Import Script

Update the import script to use your service account key:

```javascript
// In scripts/import-hadiths.js, replace line 25 with:
const serviceAccount = require('../serviceAccountKey.json');
```

## Step 3: Run the Import

```bash
node scripts/import-hadiths.js
```

## Step 4: Verify in Firebase Console

1. Go to Firebase Console → Firestore Database
2. Check the `hadiths` collection
3. You should see 7,275 documents with IDs like `bukhari_1_1`, `bukhari_1_2`, etc.

## Step 5: Test Your App

1. Start your development server: `npm run dev`
2. Go to the Hadith screen
3. You should now see all 7,275 hadiths instead of just 18
4. Test search functionality

## Troubleshooting

- If you get authentication errors, make sure the service account key is correct
- If import fails, check your Firebase project ID matches
- If app doesn't show data, check Firestore security rules 