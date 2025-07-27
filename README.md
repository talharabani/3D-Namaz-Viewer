# Qibla Direction App

A React Native (Expo) app that helps Muslims find the direction to the Kaaba (Qibla) using their device's compass and GPS location.

## Features

- 🌍 **Real-time GPS Location**: Gets your current location to calculate the Qibla direction
- 🧭 **Compass Integration**: Uses device magnetometer for accurate heading
- 🎯 **Visual Compass**: Beautiful circular compass with rotating needle
- ✅ **Alignment Detection**: Shows when you're facing the Qibla (within ±10 degrees)
- 📊 **Accuracy Display**: Visual accuracy bar and numerical precision
- 📱 **Cross-platform**: Works on both iOS and Android
- 🎨 **Beautiful UI**: Dark theme with Islamic-inspired design

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Setup

1. **Clone or create the project:**
   ```bash
   # If starting fresh
   npx create-expo-app qibla-direction-app --template blank-typescript
   cd qibla-direction-app
   ```

2. **Install dependencies:**
   ```bash
   npm install expo-location expo-sensors
   ```

3. **Copy the files:**
   - Replace `App.tsx` with the provided version
   - Add `QiblaDirectionScreen.tsx` to your project
   - Update `app.json` with the provided configuration
   - Update `package.json` with the required dependencies

4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Run on device/simulator:**
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   
   # Or scan QR code with Expo Go app
   ```

## Usage

1. **Grant Permissions**: The app will request location and sensor permissions
2. **Hold Device Flat**: Keep your device horizontal for accurate compass readings
3. **Rotate Device**: Turn your device until the needle points to the Kaaba icon
4. **Check Alignment**: The app will show "Perfect! You are facing the Qibla" when aligned

## Technical Details

### Dependencies

- **expo-location**: For GPS location services
- **expo-sensors**: For magnetometer/compass data
- **react-native**: Core React Native framework
- **expo**: Expo development platform

### Key Components

- **Location Services**: Uses `expo-location` to get current GPS coordinates
- **Compass Data**: Uses `expo-sensors` Magnetometer for heading information
- **Qibla Calculation**: Implements spherical trigonometry for accurate bearing calculation
- **Cross-platform Support**: Handles iOS (`webkitCompassHeading`) and Android (`alpha`) compass data

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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on both iOS and Android
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
