@echo off
echo 🚀 Starting Namaz Web deployment to Vercel...

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Vercel CLI is not installed. Installing...
    npm install -g vercel
)

REM Check if user is logged in to Vercel
vercel whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo 🔐 Please log in to Vercel:
    vercel login
)

REM Build the project
echo 📦 Building project...
npm run build

if %errorlevel% equ 0 (
    echo ✅ Build completed successfully!
    
    REM Deploy to Vercel
    echo 🚀 Deploying to Vercel...
    vercel --prod
    
    if %errorlevel% equ 0 (
        echo 🎉 Deployment completed successfully!
        echo 📝 Don't forget to set up environment variables in Vercel dashboard:
        echo    - VITE_FIREBASE_API_KEY
        echo    - VITE_FIREBASE_AUTH_DOMAIN
        echo    - VITE_FIREBASE_PROJECT_ID
        echo    - VITE_FIREBASE_STORAGE_BUCKET
        echo    - VITE_FIREBASE_MESSAGING_SENDER_ID
        echo    - VITE_FIREBASE_APP_ID
        echo    - VITE_FIREBASE_MEASUREMENT_ID
        echo    - VITE_GEMINI_API_KEY
    ) else (
        echo ❌ Deployment failed!
        exit /b 1
    )
) else (
    echo ❌ Build failed!
    exit /b 1
)
