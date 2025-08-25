import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTranslation } from '../utils/translations';
import { GlowCard } from '../components/nurui/spotlight-card';
import { 
  MotionDiv, 
  MotionCard, 
  MotionButton,
  fadeInUp, 
  staggerContainer, 
  staggerItem, 
  pageTransition,
  buttonPress,
  transitions
} from '../utils/animations';

// Simple Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Map Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

// Kaaba coordinates
const KAABA_LAT = 21.4225;
const KAABA_LON = 39.8262;

// Islamic quotes for when Qibla is aligned (Arabic/English content kept literal)
const QIBLA_QUOTES = [
  "Allah is the Light of the heavens and the earth. (Quran 24:35)",
  "Turn your face toward the Sacred Mosque. (Quran 2:144)",
  "The first House [of worship] established for mankind was that at Makkah. (Quran 3:96)",
  "Indeed, the first House [of worship] established for mankind was that at Bakkah [Makkah] - blessed and a guidance for the worlds. (Quran 3:96)",
  "And [mention] when We made the House a place of return for the people and [a place of] security. (Quran 2:125)",
  "The coolness of my eyes is in prayer. (Prophet Muhammad ﷺ)",
  "The closest a servant comes to his Lord is when he is prostrating. (Prophet Muhammad ﷺ)",
  "Successful indeed are the believers, those who humble themselves in prayer. (Quran 23:1-2)"
];

// Calculate Qibla bearing from user location
function getQiblaBearing(lat, lon) {
  const toRad = deg => (deg * Math.PI) / 180;
  const toDeg = rad => (rad * 180) / Math.PI;
  const dLon = toRad(KAABA_LON - lon);
  const lat1 = toRad(lat);
  const lat2 = toRad(KAABA_LAT);
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  let brng = Math.atan2(y, x);
  brng = toDeg(brng);
  return (brng + 360) % 360;
}

// Haversine formula for distance in km
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

function getInitialAngle() {
  return 0;
}

// Custom SVG Kaaba marker
const kaabaSVG = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="10" width="28" height="18" rx="4" fill="#2D2A24" stroke="#956D37" stroke-width="2"/><rect x="8" y="14" width="20" height="10" rx="2" fill="#956D37"/><rect x="12" y="18" width="12" height="4" rx="1" fill="#FFF9F0"/></svg>`;
const kaabaIcon = new L.DivIcon({
  html: kaabaSVG,
  className: '',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
});

// Pulsing user marker (CSS animation)
const userIcon = new L.DivIcon({
  html: `<div style="width:28px;height:28px;display:flex;align-items:center;justify-content:center;"><div class='pulse-marker'></div><div style='position:absolute;width:14px;height:14px;background:#38bdf8;border-radius:50%;border:2px solid #fff;'></div></div>`,
  className: '',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
});

// Helper to auto-fit bounds
function FitBounds({ userLatLng, kaabaLatLng }) {
  const map = useMap();
  useEffect(() => {
    if (userLatLng && kaabaLatLng) {
      const bounds = L.latLngBounds([userLatLng, kaabaLatLng]);
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [userLatLng, kaabaLatLng, map]);
  return null;
}

// Helper to re-center map on user
function RecenterButton({ userLatLng, label, title }) {
  const map = useMap();
  return (
    <button
      className="absolute top-3 right-3 z-[1000] bg-brass text-mocha rounded-full px-3 py-1 shadow hover:bg-wood transition"
      style={{ fontWeight: 600, fontSize: 14 }}
      onClick={() => userLatLng && map.setView(userLatLng, 12)}
      title={title}
    >
      📍 {label}
    </button>
  );
}

// Separate Map Component to prevent initialization issues
function QiblaMap({ userLatLng, kaabaLatLng, isAligned, isDark, distance, onMapCreated, onMapError, t }) {
  const mapRef = useRef(null);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch (error) {
          console.error('Error cleaning up map:', error);
        }
      }
    };
  }, []);

  if (!userLatLng || !kaabaLatLng) {
    return null;
  }

  return (
    <MapContainer 
      center={userLatLng} 
      zoom={4} 
      scrollWheelZoom={true} 
      style={{ width: '100%', height: '100%' }} 
      zoomControl={false}
      whenCreated={(map) => {
        try {
          mapRef.current = map;
          onMapCreated?.(map);
        } catch (error) {
          console.error('Error creating map:', error);
          onMapError?.(error);
        }
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={getTileLayerUrl(isDark)}
      />
      <Marker position={userLatLng} icon={userIcon}>
        <Popup>{t('youAreHere')}</Popup>
      </Marker>
      <Marker position={kaabaLatLng} icon={kaabaIcon}>
        <Popup>{t('kaaba')}</Popup>
      </Marker>
      <Polyline positions={[userLatLng, kaabaLatLng]} color={isAligned ? '#10B981' : '#B5A642'} weight={5} opacity={0.8} />
      <FitBounds userLatLng={userLatLng} kaabaLatLng={kaabaLatLng} />
      <ZoomControl position="bottomright" />
      <RecenterButton userLatLng={userLatLng} label={t('center')} title={t('reCenterOnYourLocation')} />
    </MapContainer>
  );
}

// Helper for dark mode tiles
function getTileLayerUrl(isDark) {
  return isDark
    ? 'https://tiles.stadiamaps.com/tiles/alidade_dark/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
}

// Global map cleanup function
function cleanupAllMaps() {
  try {
    // Remove all existing map containers
    const mapContainers = document.querySelectorAll('.leaflet-container');
    mapContainers.forEach(container => {
      if (container._leaflet_id) {
        container._leaflet_map?.remove();
      }
    });
  } catch (error) {
    console.error('Error cleaning up maps:', error);
  }
}

export default function QiblaDirectionScreen() {
  const { t } = useTranslation();
  const [userLatLng, setUserLatLng] = useState(null);
  const [kaabaLatLng] = useState([KAABA_LAT, KAABA_LON]);
  const [isAligned, setIsAligned] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [distance, setDistance] = useState(null);
  const [bearing, setBearing] = useState(0);
  const [accuracy, setAccuracy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [orientationPermission, setOrientationPermission] = useState('denied');
  const [currentQuote, setCurrentQuote] = useState(0);
  const mapRef = useRef(null);
  const orientationRef = useRef(null);

  // Check for dark mode
  useEffect(() => {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(darkMode);
  }, []);

  // Rotate quotes
  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % QIBLA_QUOTES.length);
    }, 8000);
    return () => clearInterval(quoteTimer);
  }, []);

  // Get user location
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy: acc } = position.coords;
          setUserLatLng([latitude, longitude]);
          setAccuracy(acc);
          const dist = getDistanceKm(latitude, longitude, KAABA_LAT, KAABA_LON);
          setDistance(dist);
          const qiblaBearing = getQiblaBearing(latitude, longitude);
          setBearing(qiblaBearing);
          setIsLoading(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setError(t('unableToGetLocation'));
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    } else {
      setError(t('geolocationNotSupportedBrowser'));
      setIsLoading(false);
    }
  }, [t]);

  // Request orientation permission
  const requestOrientationPermission = () => {
    if ('DeviceOrientationEvent' in window) {
      if ('requestPermission' in DeviceOrientationEvent) {
        DeviceOrientationEvent.requestPermission()
          .then((permission) => {
            setOrientationPermission(permission);
            if (permission === 'granted') {
              startOrientationListener();
            }
          })
          .catch((error) => {
            console.error('Orientation permission error:', error);
            setOrientationPermission('denied');
          });
      } else {
        // Permission not required, start listener directly
        startOrientationListener();
      }
    }
  };

  // Start orientation listener
  const startOrientationListener = () => {
    function handleOrientation(e) {
      if (e.alpha !== null && e.beta !== null && e.gamma !== null) {
        // Calculate compass heading
        let heading = e.alpha;
        if (typeof e.webkitCompassHeading !== 'undefined') {
          heading = e.webkitCompassHeading;
        } else {
          // Calculate heading from alpha, beta, gamma
          const alpha = e.alpha;
          const beta = e.beta;
          const gamma = e.gamma;
          
          if (alpha !== null && beta !== null && gamma !== null) {
            // Convert to radians
            const alphaRad = alpha * Math.PI / 180;
            const betaRad = beta * Math.PI / 180;
            const gammaRad = gamma * Math.PI / 180;
            
            // Calculate heading
            const headingRad = Math.atan2(
              Math.sin(alphaRad) * Math.cos(betaRad),
              Math.cos(alphaRad) * Math.cos(betaRad)
            );
            
            let hd = headingRad * 180 / Math.PI;
            hd = (hd + 360) % 360;
            heading = hd;
          }
        }
        
        // Calculate alignment
        const alignmentThreshold = 15; // degrees
        const bearingDiff = Math.abs(heading - bearing);
        const isAlignedNow = bearingDiff <= alignmentThreshold || bearingDiff >= (360 - alignmentThreshold);
        setIsAligned(isAlignedNow);
      }
    }

    if ('DeviceOrientationEvent' in window) {
      window.addEventListener('deviceorientation', handleOrientation);
      orientationRef.current = handleOrientation;
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      if (orientationRef.current) {
        window.removeEventListener('deviceorientation', orientationRef.current);
      }
      cleanupAllMaps();
    };
  }, []);

  // Get accuracy status
  const getAccuracyStatus = () => {
    if (!accuracy) return 'Unknown';
    if (accuracy <= 10) return 'Excellent';
    if (accuracy <= 50) return 'Good';
    if (accuracy <= 100) return 'Fair';
    return 'Poor';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🧭</div>
          <div className="text-xl text-amber-800 dark:text-amber-200 font-bold">{t('loadingQiblaDirection')}</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <div className="text-xl text-red-600 dark:text-red-400 font-bold">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-8 py-8 px-4 relative">
        {/* Decorative pattern */}
        <div className="absolute inset-0 -z-10 opacity-5 dark:opacity-10 pointer-events-none select-none">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23956D37' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        {/* Header Section */}
        <div className="w-full text-center mb-8">
          <div className="text-3xl md:text-4xl font-heading text-amber-800 dark:text-amber-200 font-bold drop-shadow mb-4">
            🧭 {t('qiblaDirectionHeader')}
          </div>
          <div className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            {t('findDirectionOfKaaba')}
          </div>
        </div>

        {/* Qibla Information */}
        <div className="w-full max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
                <div className="text-3xl text-amber-800 dark:text-amber-200 font-bold">{bearing.toFixed(1)}°</div>
                <div className="text-sm text-gray-700 dark:text-gray-300">{t('qiblaBearingLabel')}</div>
              </div>
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
                <div className="text-3xl text-amber-800 dark:text-amber-200 font-bold">{distance} km</div>
                <div className="text-sm text-gray-700 dark:text-gray-300">{t('distanceToKaabaLabel')}</div>
              </div>
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
                <div className="text-3xl text-amber-800 dark:text-amber-200 font-bold">{getAccuracyStatus()}</div>
                <div className="text-sm text-gray-700 dark:text-gray-300">{t('locationAccuracyLabel')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enable Compass Button */}
        {orientationPermission === 'denied' && (
          <div className="w-full flex flex-col items-center">
            <button
              onClick={requestOrientationPermission}
              className="bg-gradient-to-r from-brass to-wood text-mocha font-bold rounded-full px-8 py-4 text-lg shadow-xl border-2 border-wood hover:from-wood hover:to-brass hover:text-mocha transition-all duration-300 transform hover:scale-105 mb-4"
            >
              <span role="img" aria-label="Compass">🧭</span> {t('enableCompass')}
            </button>
            <div className="text-secondary text-sm text-center max-w-md">
              {t('enableCompassHelp')}
              {!('DeviceOrientationEvent' in window) && (
                <div className="mt-2 text-red-500 font-semibold">
                  {t('compassMobileOnly')}
                </div>
              )}
              {orientationPermission === 'denied' && (
                <div className="mt-2 text-red-500 font-semibold">
                  {t('noCompassData')}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Success Message */}
        {isAligned && (
          <div className="w-full bg-highlight/20 border border-highlight rounded-2xl p-6 animate-fadeIn shadow-lg">
            <div className="text-center">
              <div className="text-3xl mb-3 font-bold text-green-500">🎯 {t('perfectDirection')}</div>
              <div className="text-brass font-arabic text-lg italic">"{QIBLA_QUOTES[currentQuote]}"</div>
            </div>
          </div>
        )}

        {/* Qibla Compass */}
        <div className="w-full max-w-4xl">
          <div className="card p-8 bg-gradient-to-r from-brass/10 to-wood/10 border border-brass/20 backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="text-2xl font-heading text-brass font-bold mb-4">
                {isAligned ? `🎯 ${t('perfectFacingQibla')}` : `📱 ${t('rotateToAlignQibla')}`}
              </div>
              <div className="text-text dark:text-darktext">
                {error ? error : t('liveCompass')}
              </div>
            </div>

            {/* Compass Display */}
            <div className="relative w-64 h-64 mx-auto mb-8">
              <div className="absolute inset-0 rounded-full border-4 border-brass/30 bg-gradient-to-br from-card/80 to-card/60 shadow-2xl"></div>
              
              {/* Compass Needle */}
              <div 
                className={`absolute left-1/2 top-1/2 origin-bottom transition-transform duration-300 ${isAligned ? 'qibla-glow' : ''}`}
                style={{
                  transform: `translate(-50%, -100%) rotate(${bearing}deg)`,
                  height: '140px',
                }}
              >
                <svg width="8" height="140" viewBox="0 0 8 140" fill="none">
                  <path d="M4 0 L0 140 L8 140 Z" fill="#956D37" stroke="#DDC00F" strokeWidth="1"/>
                  <circle cx="4" cy="130" r="3" fill="#DDC00F"/>
                </svg>
              </div>

              {/* Center Point */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-brass rounded-full border-2 border-wood shadow-lg"></div>

              {/* Direction Labels */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-brass font-bold">N</div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-brass font-bold">S</div>
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-brass font-bold">W</div>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-brass font-bold">E</div>
            </div>

            {/* Demo mode label */}
            {!('DeviceOrientationEvent' in window) && (
              <div className="text-center">
                <div className="bg-gradient-to-r from-brass/20 to-wood/20 px-4 py-2 rounded-full text-xs font-bold border border-brass/30">
                  {t('demoModeCompassNotSupported')}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Map Section */}
        {userLatLng && kaabaLatLng && (
          <div className="w-full max-w-4xl">
            <div className="card p-6 bg-gradient-to-r from-brass/10 to-wood/10 border border-brass/20 backdrop-blur-sm">
              <div className="text-center mb-6">
                <div className="text-xl font-heading text-brass font-bold">{t('yourLocationAndKaaba')}</div>
              </div>
              <div className="w-full h-80 rounded-2xl overflow-hidden border-2 border-brass/30 shadow-2xl relative">
                <ErrorBoundary fallback={
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-r from-card/80 to-card/60 text-text dark:text-darktext p-4">
                    <div className="text-4xl mb-4">🗺️</div>
                    <div className="text-center">
                      <div className="font-semibold mb-2">{t('mapUnavailable')}</div>
                      <div className="text-sm mb-4">{t('distanceLabel')} {distance} km</div>
                      <button 
                        onClick={() => {
                          setShowMap(false);
                          setUserLatLng(null);
                          setBearing(0);
                          setAccuracy(null);
                          setDistance(null);
                          setError(null);
                          setIsLoading(true);
                        }}
                        className="bg-brass text-white px-4 py-2 rounded-xl text-sm hover:bg-wood transition-all duration-300"
                      >
                        {t('tryLoadingMapAgain')}
                      </button>
                    </div>
                  </div>
                }>
                  <QiblaMap
                    userLatLng={userLatLng}
                    kaabaLatLng={kaabaLatLng}
                    isAligned={isAligned}
                    isDark={isDark}
                    distance={distance}
                    onMapCreated={(map) => {
                      mapRef.current = map;
                      setShowMap(true);
                    }}
                    onMapError={(error) => {
                      setError(t('mapUnavailable'));
                      setShowMap(false);
                    }}
                    t={t}
                  />
                </ErrorBoundary>
                {/* Distance label positioned on the map */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000]">
                  <span className="bg-gradient-to-r from-brass to-wood text-white rounded-full px-6 py-2 text-base font-bold shadow-lg border border-wood">
                    {t('distanceLabel')} {distance} km
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Calibration Instructions */}
        <div className="w-full max-w-4xl">
          <div className="card p-6 bg-gradient-to-r from-brass/10 to-wood/10 border border-brass/20 backdrop-blur-sm">
            <div className="text-center">
              <h3 className="text-xl font-heading text-brass font-bold mb-4">📱 {t('calibrateCompassTitle')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-brass font-bold">1.</span>
                    <span className="text-text dark:text-darktext">{t('stepHoldDeviceFlat')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-brass font-bold">2.</span>
                    <span className="text-text dark:text-darktext">{t('stepMoveFigureEight')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-brass font-bold">3.</span>
                    <span className="text-text dark:text-darktext">{t('stepRotate360')}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-brass font-bold">4.</span>
                    <span className="text-text dark:text-darktext">{t('stepStayAwayMetal')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-brass font-bold">5.</span>
                    <span className="text-text dark:text-darktext">{t('stepWaitCompassStabilize')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-kaaba {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-kaaba {
          animation: float-kaaba 3s ease-in-out infinite;
        }
        .qibla-glow svg {
          filter: drop-shadow(0 0 12px #10B981) drop-shadow(0 0 24px #10B981);
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .pulse-marker {
          width: 24px;
          height: 24px;
          background: rgba(56,189,248,0.3);
          border-radius: 50%;
          position: absolute;
          left: 2px;
          top: 2px;
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.7; }
          70% { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
} 