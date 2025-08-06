# Package Dependencies for Bukhari Hadith System

## Required Dependencies

Add these to your `package.json`:

```json
{
  "dependencies": {
    "firebase": "^10.7.0",
    "firebase-admin": "^12.0.0"
  },
  "devDependencies": {
    "csv-parser": "^3.0.0",
    "xml2js": "^0.6.2"
  }
}
```

## Installation Commands

```bash
# Install Firebase SDKs
npm install firebase firebase-admin

# Install conversion utilities (optional)
npm install --save-dev csv-parser xml2js

# Or install all at once
npm install firebase firebase-admin && npm install --save-dev csv-parser xml2js
```

## Firebase CLI (Optional but Recommended)

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init

# Deploy security rules
firebase deploy --only firestore:rules
```

## Environment Variables

Create a `.env` file in your project root:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id

# Admin SDK (for import scripts)
GOOGLE_APPLICATION_CREDENTIALS=./path/to/serviceAccountKey.json
FIREBASE_PROJECT_ID=your-project-id
```

## Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "import-hadiths": "node scripts/import-hadiths.js",
    "convert-csv": "node scripts/convert-hadith-data.js csv",
    "convert-xml": "node scripts/convert-hadith-data.js xml",
    "validate-data": "node scripts/convert-hadith-data.js validate",
    "generate-sample": "node scripts/convert-hadith-data.js sample",
    "deploy-rules": "firebase deploy --only firestore:rules"
  }
}
```

## Usage Examples

```bash
# Import hadiths
npm run import-hadiths

# Convert CSV data
npm run convert-csv input.csv output.json

# Validate JSON data
npm run validate-data data/bukhari.json

# Generate sample data
npm run generate-sample data/sample.json 20

# Deploy security rules
npm run deploy-rules
```

## Version Compatibility

- **Firebase**: v10+ (modular API)
- **Firebase Admin**: v12+ (latest stable)
- **Node.js**: v16+ (for import scripts)
- **TypeScript**: v4.5+ (for frontend utilities)

## Troubleshooting

### Peer Dependency Issues

If you encounter peer dependency conflicts:

```bash
# Use legacy peer deps flag
npm install firebase firebase-admin --legacy-peer-deps

# Or use yarn
yarn add firebase firebase-admin
```

### TypeScript Issues

If you get TypeScript errors:

```bash
# Install Firebase types
npm install --save-dev @types/firebase

# Or use the built-in types (recommended)
# Firebase v9+ includes TypeScript definitions
```

### Import Issues

If you get module resolution errors:

```bash
# Check Node.js version
node --version

# Update to latest LTS if needed
nvm install --lts
nvm use --lts
``` 