@echo off
echo ========================================
echo    Sahih al-Bukhari Hadith Import
echo ========================================
echo.

echo Setting up environment...
set FIREBASE_PROJECT_ID=namaz-hadith-db

echo.
echo Starting import process...
echo.

node scripts/simple-import.cjs

echo.
echo Import process completed!
echo.
echo Next steps:
echo 1. Check Firebase Console to verify data
echo 2. Test your app's Hadith screen
echo.
pause 