#!/bin/bash

# Namaz Learning Website Deployment Script
# This script helps deploy the website to various platforms

echo "🕌 Namaz Learning Website Deployment"
echo "====================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🏗️ Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Build output is in the 'dist' folder"
else
    echo "❌ Build failed. Please check the error messages above."
    exit 1
fi

echo ""
echo "🚀 Deployment Options:"
echo "1. Netlify (Drag and drop 'dist' folder)"
echo "2. Vercel (Run 'vercel' command)"
echo "3. GitHub Pages (Push 'dist' to gh-pages branch)"
echo "4. Firebase Hosting (Run 'firebase deploy')"
echo "5. Local preview (Run 'npm run preview')"
echo ""

read -p "Choose deployment option (1-5): " choice

case $choice in
    1)
        echo "🌐 Netlify Deployment:"
        echo "1. Go to https://netlify.com"
        echo "2. Drag and drop the 'dist' folder"
        echo "3. Your site will be live in minutes!"
        ;;
    2)
        echo "⚡ Vercel Deployment:"
        if command -v vercel &> /dev/null; then
            vercel
        else
            echo "Installing Vercel CLI..."
            npm install -g vercel
            vercel
        fi
        ;;
    3)
        echo "📚 GitHub Pages Deployment:"
        echo "1. Create a new branch called 'gh-pages'"
        echo "2. Copy contents of 'dist' folder to root"
        echo "3. Push to GitHub"
        echo "4. Enable GitHub Pages in repository settings"
        ;;
    4)
        echo "🔥 Firebase Hosting Deployment:"
        if command -v firebase &> /dev/null; then
            firebase login
            firebase init hosting
            firebase deploy
        else
            echo "Installing Firebase CLI..."
            npm install -g firebase-tools
            firebase login
            firebase init hosting
            firebase deploy
        fi
        ;;
    5)
        echo "👀 Starting local preview..."
        npm run preview
        ;;
    *)
        echo "❌ Invalid option. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment process completed!"
echo "📧 For support: support@namaz-learning.com" 