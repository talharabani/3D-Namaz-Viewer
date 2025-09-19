#!/bin/bash

# Namaz Web - Vercel Deployment Script
echo "🚀 Starting Namaz Web deployment to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed. Installing..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please log in to Vercel:"
    vercel login
fi

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    
    # Deploy to Vercel
    echo "🚀 Deploying to Vercel..."
    vercel --prod
    
    if [ $? -eq 0 ]; then
        echo "🎉 Deployment completed successfully!"
        echo "📝 Don't forget to set up environment variables in Vercel dashboard:"
        echo "   - VITE_FIREBASE_API_KEY"
        echo "   - VITE_FIREBASE_AUTH_DOMAIN"
        echo "   - VITE_FIREBASE_PROJECT_ID"
        echo "   - VITE_FIREBASE_STORAGE_BUCKET"
        echo "   - VITE_FIREBASE_MESSAGING_SENDER_ID"
        echo "   - VITE_FIREBASE_APP_ID"
        echo "   - VITE_FIREBASE_MEASUREMENT_ID"
        echo "   - VITE_GEMINI_API_KEY"
    else
        echo "❌ Deployment failed!"
        exit 1
    fi
else
    echo "❌ Build failed!"
    exit 1
fi
