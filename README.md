# Namaz Web - Islamic Prayer Companion

A comprehensive web application that helps Muslims with their daily prayers, Islamic knowledge, and spiritual guidance. Features include prayer times, Qibla direction, learning resources, and an AI-powered Islamic assistant.

## Features

- 🌍 **Real-time GPS Location**: Gets your current location to calculate the Qibla direction
- 🧭 **Compass Integration**: Uses device magnetometer for accurate heading
- 🎯 **Visual Compass**: Beautiful circular compass with rotating needle
- ✅ **Alignment Detection**: Shows when you're facing the Qibla (within ±10 degrees)
- 📊 **Accuracy Display**: Visual accuracy bar and numerical precision
- 🤖 **AI Islamic Assistant**: Powered by Google Gemini AI for Islamic knowledge and guidance
- 📖 **Prayer Learning**: Step-by-step guides for all prayers
- 📱 **Prayer Tracking**: Track your daily prayers and progress
- 🕌 **Islamic Resources**: Hadith, Duas, and Islamic teachings
- 🎨 **Beautiful UI**: Islamic-inspired design with brass and wood color scheme

## Features

- 🌍 **Real-time GPS Location**: Gets your current location to calculate the Qibla direction
- 🧭 **Compass Integration**: Uses device magnetometer for accurate heading
- 🎯 **Visual Compass**: Beautiful circular compass with rotating needle
- ✅ **Alignment Detection**: Shows when you're facing the Qibla (within ±10 degrees)
- 📊 **Accuracy Display**: Visual accuracy bar and numerical precision
- 📱 **Cross-platform**: Works on both iOS and Android
- 🎨 **Beautiful UI**: Dark theme with Islamic-inspired design

## AI Assistant Setup

### Gemini AI Configuration

The app includes an AI-powered Islamic assistant powered by Google Gemini AI. To use this feature:

1. **Get a Gemini API Key:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the API key

2. **Configure Environment Variables:**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit .env and add your API key
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **Restart the development server:**
   ```bash
   npm run dev
   ```

### AI Assistant Features

- **Prayer Guidance**: Get detailed instructions on how to perform prayers correctly
- **Islamic Knowledge**: Ask questions about Islamic teachings, Hadith, and Quran
- **Dua & Supplications**: Learn about various duas and when to recite them
- **Spiritual Advice**: Get personalized spiritual guidance and advice
- **Hadith Explanations**: Understand the meaning and significance of Hadith
- **Islamic Etiquette**: Learn about Islamic manners and proper conduct

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Modern web browser with GPS and compass support

### Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd namaz-web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure AI Assistant (Optional):**
   ```bash
   # Copy environment file
   cp env.example .env
   
   # Add your Gemini API key to .env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   - Navigate to `http://localhost:5173`
   - The app will work in any modern browser

## Usage

### Prayer Times & Qibla
1. **Grant Permissions**: The app will request location and sensor permissions
2. **Hold Device Flat**: Keep your device horizontal for accurate compass readings
3. **Rotate Device**: Turn your device until the needle points to the Kaaba icon
4. **Check Alignment**: The app will show "Perfect! You are facing the Qibla" when aligned

### AI Islamic Assistant
1. **Navigate to AI Assistant**: Click the 🤖 icon in the navigation or use the quick action on the home screen
2. **Ask Questions**: Type your questions about Islam, prayers, duas, or any Islamic topic
3. **Get Guidance**: Receive accurate, respectful answers based on authentic Islamic sources
4. **Quick Questions**: Use the pre-loaded common questions for instant guidance

### Prayer Learning
1. **Select Prayer**: Choose from Fajr, Dhuhr, Asr, Maghrib, or Isha prayers
2. **Follow Steps**: Use the detailed step-by-step guides with Arabic text and translations
3. **Track Progress**: Mark prayers as completed and monitor your daily progress

## Technical Details

### Dependencies

- **@google/generative-ai**: Google Gemini AI integration
- **react**: Core React framework
- **react-router-dom**: Client-side routing
- **axios**: HTTP client for API requests
- **leaflet**: Interactive maps for Qibla direction
- **react-leaflet**: React components for Leaflet maps
- **three.js**: 3D graphics for enhanced UI
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Useful helpers for React Three Fiber
- **tailwindcss**: Utility-first CSS framework

### Key Components

- **AI Service**: `src/utils/geminiService.js` - Handles Gemini AI interactions with Islamic context
- **AI Chat Component**: `src/components/AIChatComponent.jsx` - Interactive chat interface
- **AI Assistant Screen**: `src/screens/AIAssistantScreen.jsx` - Main AI assistant interface
- **Location Services**: Uses browser Geolocation API for GPS coordinates
- **Compass Data**: Uses browser DeviceOrientation API for heading information
- **Qibla Calculation**: Implements spherical trigonometry for accurate bearing calculation
- **Prayer Tracking**: Local storage-based prayer completion tracking
- **Islamic Design System**: Custom color palette with brass, wood, and mocha themes

### Qibla Calculation

The app uses the spherical trigonometry formula to calculate the bearing from your location to the Kaaba:

```typescript
const calculateQiblaBearing = (lat: number, lon: number) => {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const lat1 = toRad(lat);
  const lon1 = toRad(lon);
  const lat2 = toRad(KAABA_LAT);
  const lon2 = toRad(KAABA_LON);

  const dLon = lon2 - lon1;
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  
  let bearing = Math.atan2(y, x);
  bearing = toDeg(bearing);
  return (bearing + 360) % 360;
};
```

## Permissions

The app requires the following permissions:

- **Location**: To determine your current position
- **Sensors**: To access the device's magnetometer/compass

### iOS
- `NSLocationWhenInUseUsageDescription`
- `NSLocationAlwaysAndWhenInUseUsageDescription`

### Android
- `ACCESS_FINE_LOCATION`
- `ACCESS_COARSE_LOCATION`

## Troubleshooting

### Common Issues

1. **Compass not working:**
   - Ensure device has a magnetometer
   - Calibrate compass by moving device in figure-8 pattern
   - Stay away from metal objects and electronics

2. **Location not accurate:**
   - Enable high-accuracy GPS
   - Move to an open area
   - Wait for GPS signal to stabilize

3. **App crashes on startup:**
   - Check that all dependencies are installed
   - Ensure permissions are properly configured
   - Clear app cache and restart

### Platform-specific Notes

- **iOS**: Uses `webkitCompassHeading` for true north
- **Android**: Uses `alpha` value from magnetometer
- **Web**: Limited compass support, may not work in all browsers

## AI Integration Details

### Gemini AI Service Architecture

The AI assistant is built with a modular architecture:

```javascript
// Initialize Gemini AI with Islamic context
const geminiService = new GeminiService();

// Send messages with context
await geminiService.sendMessage("How do I perform Wudu?", {
  prayerType: "wudu",
  userLevel: "beginner"
});

// Specialized methods
await geminiService.getPrayerGuidance("Fajr", "What if I miss the time?");
await geminiService.getIslamicAdvice("patience");
await geminiService.explainHadith("The Prophet said...");
```

### Islamic Context System

The AI is configured with a comprehensive Islamic context system that:

- **Authentic Sources**: All responses are based on authentic Islamic sources
- **Cultural Sensitivity**: Maintains respect for different Islamic traditions
- **Arabic Integration**: Uses appropriate Arabic terms and Islamic terminology
- **Practical Guidance**: Provides actionable, practical advice
- **Scholarly Approach**: Encourages consultation with local scholars for complex matters

### Security & Privacy

- **API Key Management**: Uses environment variables for secure API key storage
- **No Data Storage**: Chat conversations are not stored permanently
- **Client-side Processing**: All AI interactions happen client-side
- **Respectful Content**: AI is trained to provide respectful, appropriate responses

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the application thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues and questions:
- Check the troubleshooting section
- Review Expo documentation
- Open an issue on GitHub

---

**Note**: This app is designed for religious purposes to help Muslims find the Qibla direction. Always verify the direction using multiple sources for important religious activities.
