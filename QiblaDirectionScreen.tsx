import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';

// Kaaba coordinates
const KAABA_LAT = 21.4225;
const KAABA_LON = 39.8262;

interface LocationData {
  latitude: number;
  longitude: number;
}

interface QiblaData {
  bearing: number;
  distance: number;
}

export default function QiblaDirectionScreen() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [qiblaData, setQiblaData] = useState<QiblaData | null>(null);
  const [heading, setHeading] = useState<number>(0);
  const [isAligned, setIsAligned] = useState<boolean>(false);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Calculate Qibla bearing using spherical trigonometry
  const calculateQiblaBearing = (lat: number, lon: number): QiblaData => {
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
    bearing = (bearing + 360) % 360;

    // Calculate distance using Haversine formula
    const R = 6371; // Earth's radius in km
    const dLat = lat2 - lat1;
    const dLonDist = lon2 - lon1;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLonDist / 2) * Math.sin(dLonDist / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = Math.round(R * c);

    return { bearing, distance };
  };

  // Request location permissions
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setHasPermission(true);
        getCurrentLocation();
      } else {
        setError('Location permission denied');
        Alert.alert(
          'Permission Required',
          'Location permission is required to calculate Qibla direction.',
          [{ text: 'OK' }]
        );
      }
    } catch (err) {
      setError('Failed to request location permission');
    }
  };

  // Get current location
  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const locationData: LocationData = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setLocation(locationData);
      const qibla = calculateQiblaBearing(locationData.latitude, locationData.longitude);
      setQiblaData(qibla);
    } catch (err) {
      setError('Failed to get location');
    }
  };

  // Handle magnetometer data
  const handleMagnetometer = (data: any) => {
    let heading = 0;

    if (Platform.OS === 'ios') {
      // iOS: Use webkitCompassHeading if available
      if (data.webkitCompassHeading !== undefined) {
        heading = data.webkitCompassHeading;
      } else {
        // Fallback for iOS
        heading = data.alpha || 0;
      }
    } else {
      // Android: Use alpha value
      heading = data.alpha || 0;
    }

    setHeading(heading);
  };

  // Check alignment
  useEffect(() => {
    if (qiblaData && heading !== null) {
      const difference = Math.abs(qiblaData.bearing - heading);
      const accuracyDegrees = Math.min(difference, 360 - difference);
      setAccuracy(accuracyDegrees);
      setIsAligned(accuracyDegrees <= 10);
    }
  }, [qiblaData, heading]);

  // Initialize sensors and permissions
  useEffect(() => {
    const initializeApp = async () => {
      // Check location permission
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status === 'granted') {
        setHasPermission(true);
        getCurrentLocation();
      } else {
        requestLocationPermission();
      }

      // Start magnetometer
      Magnetometer.setUpdateInterval(100);
      Magnetometer.addListener(handleMagnetometer);
    };

    initializeApp();

    // Cleanup
    return () => {
      Magnetometer.removeAllListeners();
    };
  }, []);

  // Get status message and color
  const getStatusInfo = () => {
    if (accuracy <= 5) {
      return { message: '✅ Perfect! You are facing the Qibla', color: '#10B981' };
    } else if (accuracy <= 10) {
      return { message: '✅ Excellent! Almost aligned with Qibla', color: '#059669' };
    } else if (accuracy <= 20) {
      return { message: '🔄 Good! Rotate to align with Qibla', color: '#F59E0B' };
    } else if (accuracy <= 45) {
      return { message: '🔄 Fair! Turn towards Qibla direction', color: '#F97316' };
    } else {
      return { message: '🔄 Adjust! Rotate to align with Qibla', color: '#EF4444' };
    }
  };

  const statusInfo = getStatusInfo();

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.retryText} onPress={requestLocationPermission}>
          Tap to retry
        </Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Requesting permissions...</Text>
      </View>
    );
  }

  if (!location || !qiblaData) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🕋 Qibla Direction</Text>
        <Text style={styles.subtitle}>Find the direction to the Kaaba</Text>
      </View>

      {/* Status Card */}
      <View style={styles.statusCard}>
        <Text style={[styles.statusText, { color: statusInfo.color }]}>
          {statusInfo.message}
        </Text>
        
        {/* Accuracy Bar */}
        <View style={styles.accuracyBar}>
          <View 
            style={[
              styles.accuracyFill, 
              { 
                width: `${Math.max(0, 100 - (accuracy / 45) * 100)}%`,
                backgroundColor: statusInfo.color 
              }
            ]} 
          />
        </View>

        {/* Accuracy Info */}
        <Text style={styles.accuracyText}>
          Accuracy: {accuracy.toFixed(1)}°
        </Text>
      </View>

      {/* Compass Display */}
      <View style={styles.compassContainer}>
        <View style={styles.compass}>
          {/* Compass Ring */}
          <View style={styles.compassRing}>
            <Text style={styles.directionLabel}>N</Text>
            <Text style={[styles.directionLabel, styles.eastLabel]}>E</Text>
            <Text style={[styles.directionLabel, styles.southLabel]}>S</Text>
            <Text style={[styles.directionLabel, styles.westLabel]}>W</Text>
          </View>

          {/* Needle */}
          <View 
            style={[
              styles.needle,
              { 
                transform: [{ rotate: `${qiblaData.bearing - heading}deg` }],
                borderColor: isAligned ? '#10B981' : '#956D37'
              }
            ]}
          >
            <View style={[styles.needleTip, { backgroundColor: isAligned ? '#10B981' : '#956D37' }]} />
          </View>

          {/* Center Kaaba Icon */}
          <View style={styles.centerIcon}>
            <Text style={styles.kaabaIcon}>🕋</Text>
          </View>
        </View>
      </View>

      {/* Information Panel */}
      <View style={styles.infoPanel}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Your Location:</Text>
          <Text style={styles.infoValue}>
            {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
          </Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Qibla Bearing:</Text>
          <Text style={styles.infoValue}>{qiblaData.bearing.toFixed(1)}°</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Your Heading:</Text>
          <Text style={styles.infoValue}>{heading.toFixed(1)}°</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Distance to Kaaba:</Text>
          <Text style={styles.infoValue}>{qiblaData.distance} km</Text>
        </View>
      </View>

      {/* Instructions */}
      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          Hold your device flat and rotate until the needle points to the Kaaba icon
        </Text>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D2A24',
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#956D37',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#C9B59B',
    textAlign: 'center',
  },
  statusCard: {
    backgroundColor: '#3B372F',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#C9B59B',
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 15,
  },
  accuracyBar: {
    height: 8,
    backgroundColor: '#C9B59B20',
    borderRadius: 4,
    marginBottom: 10,
    overflow: 'hidden',
  },
  accuracyFill: {
    height: '100%',
    borderRadius: 4,
  },
  accuracyText: {
    fontSize: 14,
    color: '#C9B59B',
    textAlign: 'center',
  },
  compassContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  compass: {
    width: Math.min(width - 80, 300),
    height: Math.min(width - 80, 300),
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  compassRing: {
    width: '100%',
    height: '100%',
    borderRadius: Math.min(width - 80, 300) / 2,
    borderWidth: 4,
    borderColor: '#956D37',
    backgroundColor: '#3B372F',
    position: 'relative',
  },
  directionLabel: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#956D37',
  },
  eastLabel: {
    right: 20,
    top: '50%',
    marginTop: -10,
  },
  southLabel: {
    bottom: 20,
    left: '50%',
    marginLeft: -10,
  },
  westLabel: {
    left: 20,
    top: '50%',
    marginTop: -10,
  },
  needle: {
    position: 'absolute',
    width: 4,
    height: Math.min(width - 80, 300) / 2 - 20,
    backgroundColor: 'transparent',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: '#956D37',
    top: 20,
    transformOrigin: 'bottom',
  },
  needleTip: {
    position: 'absolute',
    top: -8,
    left: -6,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#956D37',
  },
  centerIcon: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kaabaIcon: {
    fontSize: 40,
  },
  infoPanel: {
    backgroundColor: '#3B372F',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#C9B59B',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: '#C9B59B',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#F5F1E9',
    fontWeight: '600',
  },
  instructions: {
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 14,
    color: '#C9B59B',
    textAlign: 'center',
    lineHeight: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryText: {
    fontSize: 16,
    color: '#956D37',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  loadingText: {
    fontSize: 16,
    color: '#C9B59B',
    textAlign: 'center',
  },
}); 