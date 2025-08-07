# 🚀 Namaz Learning Website Deployment Guide

This guide will help you deploy the Namaz Learning website to various platforms.

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git repository

## 🏗️ Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

## 🌐 Deployment Options

### Option 1: Netlify (Recommended - Easiest)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login
   - Drag and drop the `dist` folder
   - Your site will be live in minutes!

3. **Custom Domain** (Optional)
   - Add your custom domain in Netlify settings
   - Update DNS records as instructed

### Option 2: Vercel (Fast & Easy)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts**
   - Link to your Git repository
   - Choose project settings
   - Deploy!

### Option 3: GitHub Pages

1. **Create gh-pages branch**
   ```bash
   git checkout -b gh-pages
   ```

2. **Build and copy files**
   ```bash
   npm run build
   cp -r dist/* .
   ```

3. **Commit and push**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```

4. **Enable GitHub Pages**
   - Go to repository settings
   - Enable GitHub Pages
   - Select gh-pages branch

### Option 4: Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```

4. **Build and Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

### Option 5: Traditional Web Hosting

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload files**
   - Upload contents of `dist` folder to your web server
   - Ensure your server supports SPA routing

3. **Configure server**
   - Set up URL rewriting for React Router
   - Configure HTTPS

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_GOOGLE_AI_API_KEY=your_google_ai_api_key
```

## 📱 PWA Configuration

The website includes Progressive Web App features:

- **Offline Support**: Works without internet
- **Installable**: Can be installed on mobile devices
- **Fast Loading**: Optimized for performance

### PWA Icons

Create these icons in the `public` folder:
- `icon-192x192.png`
- `icon-512x512.png`
- `apple-touch-icon.png`

## 🔍 SEO Optimization

The website includes:

- **Meta tags**: Proper title, description, keywords
- **Open Graph**: Social media sharing
- **Sitemap**: `sitemap.xml` for search engines
- **Robots.txt**: Search engine crawling rules

## 🚀 Performance Optimization

### Build Optimizations
- **Code Splitting**: Automatic chunk splitting
- **Tree Shaking**: Unused code removal
- **Minification**: Compressed JavaScript and CSS
- **Image Optimization**: Optimized image loading

### Runtime Optimizations
- **Lazy Loading**: Images load as needed
- **Caching**: Browser caching for static assets
- **CDN Ready**: Can be served from CDN

## 🔒 Security

### HTTPS
- Always use HTTPS in production
- Configure SSL certificates
- Enable HSTS headers

### Content Security Policy
Add CSP headers to your server:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.example.com;
```

## 📊 Analytics

### Google Analytics
Add Google Analytics tracking:

1. Create a Google Analytics account
2. Get your tracking ID
3. Add the tracking code to `index.html`

### Custom Analytics
Track user interactions with custom events.

## 🔄 Continuous Deployment

### GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Netlify

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v2
      with:
        node-version: '16'
    - run: npm install
    - run: npm run build
    - uses: nwtgck/actions-netlify@v1.2
      with:
        publish-dir: './dist'
        production-branch: main
        github-token: ${{ secrets.GITHUB_TOKEN }}
        deploy-message: "Deploy from GitHub Actions"
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails**
   - Check Node.js version (v16+)
   - Clear node_modules and reinstall
   - Check for syntax errors

2. **Routing Issues**
   - Configure server for SPA routing
   - Add fallback to index.html

3. **Images Not Loading**
   - Check file paths
   - Ensure images are in public folder
   - Verify build output

4. **Performance Issues**
   - Enable gzip compression
   - Use CDN for static assets
   - Optimize images

## 📞 Support

For deployment issues:
- Check the platform's documentation
- Review build logs
- Contact platform support

For application issues:
- Check browser console for errors
- Review network requests
- Test in different browsers

## 🎉 Success!

Once deployed, your website will be:
- ✅ Fast and responsive
- ✅ SEO optimized
- ✅ PWA ready
- ✅ Mobile friendly
- ✅ Accessible

**Your Namaz Learning website is now live! 🕌**

---

*Made with ❤️ for the Muslim community* 