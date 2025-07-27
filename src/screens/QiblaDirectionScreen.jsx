import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Kaaba coordinates
const KAABA_LAT = 21.4225;
const KAABA_LON = 39.8262;

// Islamic quotes for when Qibla is aligned
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
function RecenterButton({ userLatLng }) {
  const map = useMap();
  return (
    <button
      className="absolute top-3 right-3 z-[1000] bg-brass text-mocha rounded-full px-3 py-1 shadow hover:bg-wood transition"
      style={{ fontWeight: 600, fontSize: 14 }}
      onClick={() => userLatLng && map.setView(userLatLng, 12)}
      title="Re-center on your location"
    >
      📍 Center
    </button>
  );
}

// Helper for dark mode tiles
function getTileLayerUrl(isDark) {
  return isDark
    ? 'https://tiles.stadiamaps.com/tiles/alidade_dark/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
}

export default function QiblaDirectionScreen() {
  const [angle, setAngle] = useState(getInitialAngle());
  const [hasOrientation, setHasOrientation] = useState(false);
  const [qibla, setQibla] = useState(0); // Qibla bearing
  const [geoError, setGeoError] = useState(null);
  const [coords, setCoords] = useState(null); // { latitude, longitude }
  const [accuracy, setAccuracy] = useState(0); // Accuracy in degrees
  const [isAligned, setIsAligned] = useState(false);
  const [currentQuote, setCurrentQuote] = useState('');
  const [showQuote, setShowQuote] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [headingSource, setHeadingSource] = useState(''); // For debug
  const [orientationPermission, setOrientationPermission] = useState(false); // New: permission state
  const requestRef = useRef();
  const lastAngleRef = useRef(angle);
  const [isSupported, setIsSupported] = useState(true);
  const [isCalibrating, setIsCalibrating] = useState(false);
  // Add a new state to track if we ever received real orientation data
  const [gotRealOrientation, setGotRealOrientation] = useState(false);

  // Function to request device orientation permission
  const requestOrientationPermission = () => {
    if (window.DeviceOrientationEvent && typeof window.DeviceOrientationEvent.requestPermission === 'function') {
      window.DeviceOrientationEvent.requestPermission()
        .then((response) => {
          if (response === 'granted') {
            setOrientationPermission(true);
            setIsSupported(true);
            // Start listening immediately after permission is granted
            startOrientationListener();
          } else {
            setIsSupported(false);
            console.log('Device orientation permission denied');
          }
        })
        .catch((error) => {
          console.error('Error requesting device orientation permission:', error);
          setIsSupported(false);
        });
    } else {
      // For browsers that don't require permission
      setOrientationPermission(true);
      setIsSupported(true);
      // Start listening immediately
      startOrientationListener();
    }
  };

  // Function to start orientation listener
  const startOrientationListener = () => {
    function handleOrientation(e) {
      let heading = null;
      let source = '';
      // iOS: webkitCompassHeading (true north)
      if ('webkitCompassHeading' in e && e.webkitCompassHeading != null) {
        heading = e.webkitCompassHeading;
        source = 'iOS (webkitCompassHeading)';
      } else if (typeof e.alpha === 'number' && e.alpha != null) {
        // Android/Chrome: alpha (magnetic north)
        heading = 360 - e.alpha;
        source = 'Android/Chrome (alpha)';
      }
      if (heading !== null && !isAligned) {
        setAngle(heading);
        lastAngleRef.current = heading;
        setHeadingSource(source);
        setHasOrientation(true); // Mark that we have real orientation data
        setGotRealOrientation(true); // Mark that we got real data
      }
      if (heading !== null) {
        setHasOrientation(true);
        setGotRealOrientation(true);
      }
    }

    // Check if device orientation is supported
    if (!window.DeviceOrientationEvent) {
      setIsSupported(false);
      // Start demo mode
      let a = lastAngleRef.current;
      if (!isAligned) {
        requestRef.current = setInterval(() => {
          a = (a + 2) % 360;
          setAngle(a);
          lastAngleRef.current = a;
        }, 30);
      }
    } else {
      // Add event listener since permission is already granted
      window.addEventListener('deviceorientation', handleOrientation, true);
    }
  };

  // Detect dark mode
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  // Get user location and calculate Qibla
  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation not supported.');
      setIsSupported(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        setCoords({ latitude, longitude });
        setQibla(getQiblaBearing(latitude, longitude));
        setIsSupported(true);
      },
      err => {
        setGeoError('Location denied or unavailable.');
        setIsSupported(false);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  // Device orientation support (improved for browser compatibility)
  useEffect(() => {
    // Only start listening if permission is granted
    if (!orientationPermission) {
      return;
    }

    // Start the orientation listener
    startOrientationListener();
    
    return () => {
      window.removeEventListener('deviceorientation', startOrientationListener, true);
      if (requestRef.current) clearInterval(requestRef.current);
    };
  }, [orientationPermission, isAligned]);

  // Calculate accuracy and alignment
  useEffect(() => {
    const needleAngle = (qibla - angle + 360) % 360;
    const accuracyDegrees = Math.abs(((needleAngle + 180) % 360) - 180);
    setAccuracy(accuracyDegrees);
    const aligned = accuracyDegrees < 10;
    
    // Only set aligned if we have real orientation data (not demo mode)
    const shouldShowAligned = aligned && hasOrientation && orientationPermission;
    setIsAligned(shouldShowAligned);
    
    if (shouldShowAligned && !showQuote) {
      setShowQuote(true);
      setCurrentQuote(QIBLA_QUOTES[Math.floor(Math.random() * QIBLA_QUOTES.length)]);
      setTimeout(() => setShowQuote(false), 5000);
    }
  }, [angle, qibla, showQuote, hasOrientation, orientationPermission]);

  // The needle should point to (qibla - device heading)
  const needleAngle = (qibla - angle + 360) % 360;

  // Map rendering (Leaflet)
  let distance = null;
  let userLatLng = null, kaabaLatLng = null;
  if (coords) {
    const { latitude, longitude } = coords;
    distance = getDistanceKm(latitude, longitude, KAABA_LAT, KAABA_LON);
    userLatLng = [latitude, longitude];
    kaabaLatLng = [KAABA_LAT, KAABA_LON];
  }

  // Get accuracy status and color
  const getAccuracyStatus = () => {
    if (accuracy < 5) return { status: 'Perfect!', color: 'text-green-500', bgColor: 'bg-green-500' };
    if (accuracy < 10) return { status: 'Excellent', color: 'text-green-400', bgColor: 'bg-green-400' };
    if (accuracy < 20) return { status: 'Good', color: 'text-yellow-500', bgColor: 'bg-yellow-500' };
    if (accuracy < 45) return { status: 'Fair', color: 'text-orange-500', bgColor: 'bg-orange-500' };
    return { status: 'Adjust', color: 'text-red-500', bgColor: 'bg-red-500' };
  };
  const accuracyInfo = getAccuracyStatus();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-mocha via-sand to-wood relative overflow-x-hidden">
      {/* Decorative Islamic pattern overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-10" style={{backgroundImage: 'url(https://www.toptal.com/designers/subtlepatterns/uploads/islamic.png)', backgroundSize: '400px 400px', backgroundRepeat: 'repeat'}} />

      {/* Main Content */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8 py-8 px-4 relative z-10">
        
        {/* Header Card */}
        <div className="glassmorph-card w-full rounded-3xl p-6 shadow-2xl border border-brass backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl"><span role="img" aria-label="Kaaba">🕋</span></span>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-brass tracking-tight">Qibla Direction</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${accuracyInfo.bgColor} animate-pulse`}></div>
              <span className={`text-base font-semibold ${accuracyInfo.color}`}>{accuracyInfo.status}</span>
            </div>
          </div>
          
          {/* Accuracy Bar & Info */}
          <div className="w-full bg-sand/30 rounded-full h-2 overflow-hidden mb-4">
            <div className={`h-2 rounded-full transition-all duration-500 ${accuracyInfo.bgColor}`} style={{ width: `${Math.max(0, 100 - (accuracy / 45) * 100)}%` }}></div>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm font-mono text-secondary">
            <span>Accuracy: {accuracy.toFixed(1)}°</span>
            <span>Qibla: {qibla.toFixed(1)}°</span>
            <span>Device: {angle.toFixed(1)}°</span>
            <span>{headingSource}</span>
          </div>
        </div>

        {/* Enable Compass Button */}
        {(!orientationPermission || (!gotRealOrientation && orientationPermission)) && (
          <div className="w-full flex flex-col items-center">
            <button
              onClick={requestOrientationPermission}
              className="bg-gradient-to-r from-brass to-wood text-mocha font-bold rounded-full px-8 py-4 text-lg shadow-xl border-2 border-wood hover:from-wood hover:to-brass hover:text-mocha transition-all duration-300 transform hover:scale-105 mb-4"
            >
              <span role="img" aria-label="Compass">🧭</span> Enable Compass
            </button>
            <div className="text-secondary text-sm text-center max-w-md">
              Click this button to enable your device's compass for accurate Qibla direction detection.
              {!window.DeviceOrientationEvent && (
                <div className="mt-2 text-red-500 font-semibold">
                  Compass is only available on supported mobile devices. Please use a phone or tablet.
                </div>
              )}
              {!gotRealOrientation && orientationPermission && (
                <div className="mt-2 text-red-500 font-semibold">
                  No compass data received. If you are on a desktop or unsupported device, try using a mobile phone.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Success Message */}
        {showQuote && (
          <div className="w-full bg-highlight/20 border border-highlight rounded-2xl p-6 animate-fadeIn shadow-lg">
            <div className="text-center">
              <div className="text-3xl mb-3 font-bold text-green-500">🎯 Perfect Direction!</div>
              <div className="text-brass font-arabic text-lg italic">"{currentQuote}"</div>
            </div>
          </div>
        )}

        {/* Compass Section */}
        <div className="w-full flex flex-col items-center">
          <div className="relative flex items-center justify-center w-80 h-80 md:w-96 md:h-96 bg-white/10 rounded-full shadow-2xl border-2 border-brass mb-6">
            {/* Compass base */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="100%" height="100%" viewBox="0 0 320 320">
                <circle cx="160" cy="160" r="150" fill="#fff" fillOpacity="0.10" stroke="#B5A642" strokeWidth="4" />
                {[...Array(12)].map((_, i) => (
                  <line
                    key={i}
                    x1={160}
                    y1="40"
                    x2={160}
                    y2="70"
                    stroke="#B5A642"
                    strokeWidth={i % 3 === 0 ? 4 : 2}
                    transform={`rotate(${i * 30} 160 160)`}
                  />
                ))}
                {/* Direction labels */}
                <text x="160" y="30" textAnchor="middle" fill="#B5A642" fontSize="20" fontWeight="bold">N</text>
                <text x="160" y="305" textAnchor="middle" fill="#B5A642" fontSize="20" fontWeight="bold">S</text>
                <text x="30" y="165" textAnchor="middle" fill="#B5A642" fontSize="20" fontWeight="bold">W</text>
                <text x="305" y="165" textAnchor="middle" fill="#B5A642" fontSize="20" fontWeight="bold">E</text>
              </svg>
            </div>
            
            {/* Rotating needle to Qibla */}
            <div
              className={`absolute left-1/2 top-1/2 origin-bottom transition-transform duration-300 ${isAligned ? 'qibla-glow' : ''}`}
              style={{
                transform: `translate(-50%, -100%) rotate(${needleAngle}deg)`,
                height: '140px',
              }}
            >
              <svg width="20" height="140" viewBox="0 0 20 140">
                <rect x="9" y="25" width="2" height="90" fill="#B5A642" />
                <polygon points="10,0 20,35 0,35" fill="#B5A642" />
                {/* Animated direction arrow */}
                <polyline points="10,110 10,135 16,127 10,139 4,127 10,135" fill="none" stroke="#10B981" strokeWidth="2" opacity={isAligned ? 1 : 0.5} />
                {/* Accuracy indicator */}
                <circle 
                  cx="10" 
                  cy="10" 
                  r="8" 
                  fill={isAligned ? "#10B981" : "#B5A642"} 
                  stroke="#fff" 
                  strokeWidth="2"
                />
              </svg>
            </div>
            
            {/* Floating Kaaba icon */}
            <div className="absolute left-1/2 top-1/2" style={{ transform: 'translate(-50%, -50%)' }}>
              <span
                className={`text-7xl animate-float-kaaba ${isAligned ? 'animate-pulse' : ''}`}
                style={{ filter: 'drop-shadow(0 2px 8px #0006)' }}
                role="img"
                aria-label="Kaaba"
              >
                🕋
              </span>
            </div>
            
            {/* Accuracy ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg width="100%" height="100%" viewBox="0 0 320 320">
                <circle 
                  cx="160" 
                  cy="160" 
                  r="135" 
                  fill="none" 
                  stroke={isAligned ? "#10B981" : "#B5A642"} 
                  strokeWidth="3" 
                  strokeDasharray="5 5"
                  opacity="0.6"
                />
              </svg>
            </div>
            
            {/* Demo mode label */}
            {!gotRealOrientation && orientationPermission && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-sand/90 text-mocha px-4 py-2 rounded-full text-xs font-bold shadow border border-brass">
                Demo Mode: Compass not supported on this device
              </div>
            )}
          </div>

          {/* Status Message */}
          <div className="text-center mb-8">
            <div className={`text-xl md:text-2xl font-semibold mb-2 ${accuracyInfo.color} font-sans`}> 
              {isAligned ? '🎯 Perfect! You are facing the Qibla' : '📱 Rotate your device to align with Qibla'}
            </div>
            <div className="text-secondary text-base md:text-lg">
              {geoError ? geoError : gotRealOrientation ? 'Live compass (move your phone)' : 'Demo: auto-rotating needle'}
            </div>
          </div>
        </div>

        {/* Map Section */}
        {userLatLng && kaabaLatLng && (
          <div className="w-full flex flex-col items-center">
            <div className="text-sm text-secondary mb-4">Your location and the Kaaba</div>
            <div className="w-full h-80 rounded-3xl overflow-hidden border-2 border-brass shadow-2xl relative" style={{ maxWidth: 600 }}>
              <MapContainer center={userLatLng} zoom={4} scrollWheelZoom={true} style={{ width: '100%', height: '100%' }} zoomControl={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url={getTileLayerUrl(isDark)}
                />
                <Marker position={userLatLng} icon={userIcon}>
                  <Popup>You are here</Popup>
                </Marker>
                <Marker position={kaabaLatLng} icon={kaabaIcon}>
                  <Popup>Kaaba</Popup>
                </Marker>
                <Polyline positions={[userLatLng, kaabaLatLng]} color={isAligned ? '#10B981' : '#B5A642'} weight={5} opacity={0.8} />
                <FitBounds userLatLng={userLatLng} kaabaLatLng={kaabaLatLng} />
                <ZoomControl position="bottomright" />
                <RecenterButton userLatLng={userLatLng} />
              </MapContainer>
              {/* Distance label positioned on the map */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000]">
                <span className="bg-brass text-mocha rounded-full px-6 py-2 text-base font-bold shadow border border-wood">
                  Distance: {distance} km
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Calibration Instructions */}
        <div className="w-full flex flex-col items-center">
          <button 
            onClick={() => setIsCalibrating(!isCalibrating)}
            className="bg-gradient-to-r from-brass to-wood text-mocha rounded-full px-6 py-3 font-semibold shadow-lg border border-wood hover:from-wood hover:to-brass hover:text-mocha transition-all duration-300 mb-4"
          >
            {isCalibrating ? 'Hide' : 'Show'} Calibration Instructions
          </button>
          {isCalibrating && (
            <div className="glassmorph-card border border-brass rounded-2xl p-6 w-full max-w-md shadow-lg">
              <h3 className="text-brass mb-3 text-lg font-bold">📱 Calibrate Your Compass</h3>
              <ol className="list-decimal pl-5 text-secondary space-y-1">
                <li>Hold your device flat</li>
                <li>Move it in a figure-8 pattern</li>
                <li>Rotate it 360° in all directions</li>
                <li>Stay away from metal objects</li>
                <li>Wait for the compass to stabilize</li>
              </ol>
            </div>
          )}
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