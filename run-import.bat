@echo off
echo Setting up environment variables...
set FIREBASE_PROJECT_ID=namaz-hadith-db

echo Running hadith import...
node scripts/import-hadiths.js

echo Import completed!
pause 