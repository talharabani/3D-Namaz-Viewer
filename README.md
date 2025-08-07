# Namaz Learning Website

A comprehensive Islamic prayer learning website with detailed instructions, Arabic text, transliterations, and visual guides from authentic Islamic sources.

## 🌟 Features

### 📚 Learning Modes
- **Step-by-Step Learning**: Learn each prayer step individually
- **Comprehensive Learning**: Complete prayer structure with detailed guides
- **Prayer Structure**: Complete overview of all prayer types

### 🎯 Interactive Features
- **Audio Recitations**: Listen to proper Arabic pronunciations
- **Video Tutorials**: Visual demonstrations of prayer steps
- **Image Galleries**: Multiple angles and views for each prayer step
- **Zoom Functionality**: Detailed examination of prayer postures
- **Quiz System**: Test your knowledge and earn certificates

### 🖼️ Visual Learning
- **Step-Specific Images**: Each prayer step has its own relevant images
- **Multiple Views**: Front, side, and close-up views for better understanding
- **Interactive Galleries**: Click to zoom and examine details
- **Responsive Design**: Works perfectly on all devices

### 📱 Modern Interface
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Dark/Light Mode**: Comfortable viewing in any lighting
- **Smooth Animations**: Engaging user experience
- **Accessibility**: Screen reader friendly and keyboard navigable

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/namaz-learning.git
   cd namaz-learning
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Building for Production

### Local Build
```bash
npm run build
npm run preview
```

### Deployment Options

#### 1. **Netlify** (Recommended)
```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

#### 2. **Vercel**
```bash
npm install -g vercel
vercel
```

#### 3. **GitHub Pages**
```bash
npm run build
# Push the 'dist' folder to gh-pages branch
```

#### 4. **Firebase Hosting**
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 📁 Project Structure

```
namaz-learning/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/            # Main application screens
│   ├── assets/             # Images, icons, and static files
│   ├── data/               # Prayer data and configurations
│   ├── utils/              # Utility functions and services
│   └── App.jsx             # Main application component
├── public/                 # Public assets
├── dist/                   # Production build output
└── package.json           # Dependencies and scripts
```

## 🎨 Customization

### Adding New Prayer Steps
1. Add images to `src/assets/`
2. Update image arrays in `src/screens/LearnScreen.jsx`
3. Add step data to prayer configuration files

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Colors**: Brass and wood theme colors
- **Responsive**: Mobile-first design approach

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_GOOGLE_AI_API_KEY=your_google_ai_api_key
```

## 📱 PWA Features

The website includes Progressive Web App features:
- **Offline Support**: Works without internet connection
- **Installable**: Can be installed on mobile devices
- **Fast Loading**: Optimized for performance
- **Responsive**: Works on all screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Islamic scholars and sources for authentic prayer guidance
- Open source community for amazing tools and libraries
- Contributors and users for feedback and improvements

## 📞 Support

For support, email support@namaz-learning.com or create an issue in the repository.

---

**Made with ❤️ for the Muslim community**
