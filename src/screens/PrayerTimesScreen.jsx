import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import audioService from '../utils/audioService';
import notificationService from '../utils/notificationService';
import prayerTimesService from '../utils/prayerTimesService';
import { ToggleLeft } from '../components/ToggleLeft';
import { useSettings } from '../contexts/SettingsContext';
import { useTranslation } from '../utils/translations';
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem, 
  pageTransition,
  buttonPress,
  transitions,
  pulseAnimation,
  mosqueGlow
} from '../utils/animations';

const PRAYERS = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
const AZAN_AUDIO = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
const METHODS = [
  { id: 2, name: 'ISNA' },
  { id: 3, name: 'MWL' },
  { id: 4, name: 'Umm Al-Qura' },
  { id: 5, name: 'Egyptian' },
  { id: 12, name: 'Dubai' },
  { id: 1, name: 'University of Islamic Sciences, Karachi' },
];
const FIQHS = [
  { id: 'shafi', name: 'Shafi' },
  { id: 'hanafi', name: 'Hanafi' },
  { id: 'ahl-e-hadith', name: 'Ahl-e-Hadith' },
];

function getTimeDiff(target) {
  const now = new Date();
  let diff = (target - now) / 1000;
  if (diff < 0) diff += 24 * 3600; // next day
  const h = Math.floor(diff / 3600);
  const m = Math.floor((diff % 3600) / 60);
  const s = Math.floor(diff % 60);
  return { h, m, s, total: diff };
}

// Function to adjust prayer times according to Ahl-e-Hadith fiqh
function adjustPrayerTimesForAhlEHadith(timings) {
  if (!timings) return timings;
  
  const adjusted = { ...timings };
  
  // Ahl-e-Hadith specific adjustments based on authentic hadith:
  
  // 1. Fajr: When true dawn appears (Subh Sadiq)
  // - API already provides this correctly
  
  // 2. Dhuhr: When sun passes zenith (Zawal)
  // - API already provides this correctly
  
  // 3. Asr: When shadow of an object equals its height (Shadow = 1)
  // - This is already handled by API with school=0 (Shafi method)
  
  // 4. Maghrib: Immediately after sunset (Ghurub)
  // - Ensure Maghrib is set to sunset time
  if (adjusted.Sunset) {
    adjusted.Maghrib = adjusted.Sunset;
  }
  
  // 5. Isha: When twilight disappears (Shafaq)
  // - Ahl-e-Hadith prays Isha earlier than Hanafi
  // - API with school=0 provides this correctly
  
  // 6. Additional Ahl-e-Hadith considerations:
  // - They follow the authentic hadith more strictly
  // - Avoid delaying prayers unnecessarily
  // - Pray in congregation when possible
  
  return adjusted;
}

// Prayer notification messages (kept as-is to preserve Arabic phrases within)
const PRAYER_MESSAGES = {
  'Fajr': 'Allahu Akbar! Time for Fajr prayer. Come to Allah, He is calling you.',
  'Dhuhr': 'Allahu Akbar! Time for Dhuhr prayer. Come to Allah, He is calling you.',
  'Asr': 'Allahu Akbar! Time for Asr prayer. Come to Allah, He is calling you.',
  'Maghrib': 'Allahu Akbar! Time for Maghrib prayer. Come to Allah, He is calling you.',
  'Isha': 'Allahu Akbar! Time for Isha prayer. Come to Allah, He is calling you.',
};

export default function PrayerTimesScreen() {
  const { t } = useTranslation();
  const { settings } = useSettings();
  const [times, setTimes] = useState(null);
  const [hijri, setHijri] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextIdx, setNextIdx] = useState(0);
  const [countdown, setCountdown] = useState({ h: 0, m: 0, s: 0, total: 0 });
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showNotificationAlert, setShowNotificationAlert] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [prayerHistory, setPrayerHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [qiblaDirection, setQiblaDirection] = useState(null);
  const [showQibla, setShowQibla] = useState(false);
  const [currentPrayerAlert, setCurrentPrayerAlert] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  
  const azanRef = useRef();
  const [coords, setCoords] = useState(null);

  const getPrayerDisplayName = (key) => {
    switch (key) {
      case 'Fajr': return t('fajr');
      case 'Sunrise': return t('sunrise');
      case 'Dhuhr': return t('dhuhr');
      case 'Asr': return t('asr');
      case 'Maghrib': return t('maghrib');
      case 'Isha': return t('isha');
      default: return key;
    }
  };

  const getPrayerIcon = (key) => {
    switch (key) {
      case 'Fajr': return '🌅';
      case 'Sunrise': return '☀️';
      case 'Dhuhr': return '🌞';
      case 'Asr': return '🌇';
      case 'Maghrib': return '🌆';
      case 'Isha': return '🌙';
      default: return '🕌';
    }
  };

  // Format time based on settings
  const formatTime = (timeString) => {
    if (!timeString) return '';
    
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes), 0);
    
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: !settings.militaryTime
    };
    
    if (settings.showSeconds) {
      options.second = '2-digit';
    }
    
    return date.toLocaleTimeString('en-US', options);
  };

  // Format countdown time based on settings
  const formatCountdown = (countdown) => {
    const { h, m, s } = countdown;
    
    if (settings.militaryTime) {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}${settings.showSeconds ? `:${s.toString().padStart(2, '0')}` : ''}`;
    } else {
      const totalMinutes = h * 60 + m;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      
      let result = `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
      if (settings.showSeconds) {
        result += `:${s.toString().padStart(2, '0')}`;
      }
      return result;
    }
  };

  // Check notification permission status (without requesting)
  useEffect(() => {
    const checkNotificationStatus = async () => {
      await notificationService.checkPermissionStatus();
      const enabled = notificationService.isEnabled();
      setNotificationsEnabled(enabled);
    };
    checkNotificationStatus();
  }, []);

  // Show prayer notification
  const showPrayerNotification = async (prayerName) => {
    const enhancedMessage = `🕌 Allahu Akbar! Allah is calling you for ${prayerName} prayer at ${times[prayerName]}`;
    
    // Show browser notification with enhanced features
    await notificationService.showPrayerNotification(prayerName, times[prayerName]);

    // Show in-app alert with enhanced message
    setCurrentPrayerAlert({
      prayer: prayerName,
      message: enhancedMessage,
      timestamp: Date.now()
    });

    // Play Allahu Akbar sound once with vibration
    audioService.playNotificationWithVibration();

    // Auto-hide alert after 30 seconds
    setTimeout(() => {
      setCurrentPrayerAlert(null);
    }, 30000);
  };

  // Get user location and fetch prayer times
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    const fetchPrayerTimes = async (latitude, longitude) => {
      // Prevent excessive API calls
      const now = Date.now();
      const timeSinceLastFetch = now - lastFetchTime;
      const minFetchInterval = 60000; // 60 seconds minimum between fetches
      
      if (isFetching || (timeSinceLastFetch < minFetchInterval && lastFetchTime > 0)) {
        console.log('Skipping fetch - too soon or already fetching');
        return;
      }
      
      // If we have cached data and it's recent, don't fetch
      if (times && lastFetchTime > 0 && timeSinceLastFetch < 300000) { // 5 minutes
        console.log('Using existing data - too recent to refetch');
        return;
      }
      
      // Check if offline
      if (!navigator.onLine) {
        console.log('Offline - using cached data or mock data');
        setLoading(false);
        return;
      }
      
      try {
        setIsFetching(true);
        setLastFetchTime(now);
        
        // Handle different fiqh calculations using settings
        let school = 0; // Default Shafi
        if (settings.fiqh === 'hanafi') {
          school = 1;
        } else if (settings.fiqh === 'ahl-e-hadith') {
          school = 0; // Similar to Shafi but with specific adjustments
        }
        
        // Use our prayer times service with CORS handling
        const data = await prayerTimesService.getPrayerTimes(
          latitude, 
          longitude, 
          settings.prayerMethod, 
          school
        );
        if (data.code === 200 && data.data && data.data.timings) {
          let prayerTimes = data.data.timings;
          
          // Apply Ahl-e-Hadith specific adjustments if selected
          if (settings.fiqh === 'ahl-e-hadith') {
            prayerTimes = adjustPrayerTimesForAhlEHadith(prayerTimes);
          }
          
          setTimes(prayerTimes);
          setHijri(`${data.data.date.hijri.day} ${data.data.date.hijri.month.en} ${data.data.date.hijri.year} AH`);
          
          // Schedule notifications for all prayer times
          await notificationService.schedulePrayerNotifications(prayerTimes);
        } else {
          throw new Error('Invalid prayer times data received');
        }
      } catch (error) {
        console.error('Prayer times fetch error:', error);
        setError(t('failedToFetchPrayerTimes'));
      } finally {
        setLoading(false);
        setIsFetching(false);
      }
    };

    if (!navigator.geolocation) {
      setError(t('geolocationNotSupported'));
      setLoading(false);
      return;
    }

    // Try to get location with better error handling
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ latitude, longitude });
        await fetchPrayerTimes(latitude, longitude);
      },
      (error) => {
        console.warn('Geolocation error:', error);
        let errorMessage = t('locationDeniedOrUnavailable');
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location permissions in your browser settings.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable. Please check your device settings.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again.';
            break;
        }
        
        setError(errorMessage);
      setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000 // 5 minutes
      }
    );
  }, [settings.prayerMethod, settings.fiqh, t]);

  // Find next prayer and update countdown
  useEffect(() => {
    if (!times) return;
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const prayerTimes = PRAYERS.map(p => {
      const [h, m] = times[p].split(':').map(Number);
      const tdate = new Date(today + 'T' + times[p].padStart(5, '0'));
      tdate.setHours(h, m, 0, 0);
      return tdate;
    });
    let idx = prayerTimes.findIndex((t, i) => t > now && PRAYERS[i] !== 'Sunrise');
    if (idx === -1) idx = 0; // next day
    setNextIdx(idx);
    const diff = getTimeDiff(prayerTimes[idx]);
    setCountdown(diff);
    
    // Check if it's prayer time (within 1 minute)
    if (diff.total < 60 && diff.total > 0) {
      const prayerName = PRAYERS[idx];
      if (prayerName !== 'Sunrise') {
        showPrayerNotification(prayerName);
      }
    }
    
    // Azan sound when time is up
    if (diff.total < 1 && azanRef.current) {
      azanRef.current.currentTime = 0;
      azanRef.current.play();
    }
    
    const interval = setInterval(() => {
      const now2 = new Date();
      const diff2 = getTimeDiff(prayerTimes[idx]);
      setCountdown(diff2);
      
      // Check for prayer time again
      if (diff2.total < 60 && diff2.total > 0) {
        const prayerName = PRAYERS[idx];
        if (prayerName !== 'Sunrise') {
          showPrayerNotification(prayerName);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [times]);

  // Enable notifications
  const enableNotifications = async () => {
    const enabled = await notificationService.requestPermission();
    setNotificationsEnabled(enabled);
    if (enabled) {
      setShowNotificationAlert(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#44403c] via-[#78716c] to-[#d6d3d1] flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">🕋</div>
        <div className="text-xl text-brass font-bold">{t('loadingPrayerTimes')}</div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#44403c] via-[#78716c] to-[#d6d3d1] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="text-6xl mb-6">⚠️</div>
        <div className="text-xl text-error font-bold mb-4">{error}</div>
        <div className="text-gray-300 mb-6">
          Please check your internet connection and location permissions.
        </div>
        <button
          onClick={() => {
            setError(null);
            setLoading(true);
            // Trigger re-fetch by updating a dummy state
            window.location.reload();
          }}
          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-gray-900 font-bold rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 shadow-lg"
        >
          🔄 Try Again
        </button>
      </div>
    </div>
  );
  
  if (!times) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-40 w-60 h-60 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-3000"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center gap-8 sm:gap-12 py-6 sm:py-12 px-3 sm:px-4">

        {/* Header Section */}
        <motion.div 
          className="w-full text-center mb-8 sm:mb-12"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={transitions.smooth}
        >
          <div className="relative">
            <motion.div 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent"
              variants={pulseAnimation}
              animate="animate"
            >
              🕌 {t('prayerTimesHeader')}
            </motion.div>
            <div className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-2">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className="text-lg text-amber-300 mt-2">
              {hijri}
            </div>
            <motion.button
              onClick={() => {
                setLoading(true);
                setError(null);
                window.location.reload();
              }}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 Refresh Times
            </motion.button>
          </div>
        </motion.div>

        {/* Prayer Time Alert Modal */}
        {currentPrayerAlert && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-card dark:bg-darkcard rounded-2xl shadow-2xl max-w-md w-full p-8 text-center border border-brass/20">
              <div className="text-6xl mb-6">🕌</div>
              <h2 className="text-3xl font-heading text-brass font-bold mb-4">
                {t('prayerTimeTitle', { prayer: getPrayerDisplayName(currentPrayerAlert.prayer) })}
              </h2>
              <p className="text-text dark:text-darktext text-lg mb-8 leading-relaxed">
                {currentPrayerAlert.message}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentPrayerAlert(null)}
                  className="flex-1 py-4 rounded-xl bg-gradient-to-r from-brass to-wood text-white font-bold hover:from-wood hover:to-brass transition-all duration-300 shadow-lg"
                >
                  {t('dismiss')}
                </button>
                <button
                  onClick={() => {
                    setCurrentPrayerAlert(null);
                    // Navigate to prayer guide or tracker
                  }}
                  className="flex-1 py-4 rounded-xl bg-gradient-to-r from-accent to-accent2 text-white font-bold hover:from-accent2 hover:to-accent transition-all duration-300 shadow-lg"
                >
                  {t('startPrayer')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notification Permission Alert */}
        {showNotificationAlert && (
          <div className="w-full max-w-4xl">
            <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-2xl p-6 shadow-xl border border-amber-200 dark:border-amber-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-amber-800 dark:text-amber-200 font-bold text-lg mb-2">{t('enablePrayerNotificationsTitle')}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{t('enablePrayerNotificationsDesc')}</p>
                </div>
                <button
                  onClick={enableNotifications}
                  className="px-6 py-3 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-all duration-300 shadow-lg"
                >
                  {t('enable')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Settings Info Section */}
        <div className="w-full max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
              <div className="text-lg sm:text-xl md:text-2xl font-heading text-amber-800 dark:text-amber-200 font-bold">{t('currentSettings')}</div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs sm:text-sm">
                <div className="text-gray-700 dark:text-gray-300">
                  <span className="text-amber-600 dark:text-amber-400 font-bold">{t('methodLabel')}</span> {METHODS.find(m => m.id === settings.prayerMethod)?.name}
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  <span className="text-amber-600 dark:text-amber-400 font-bold">{t('fiqhLabel')}</span> {FIQHS.find(f => f.id === settings.fiqh)?.name}
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  <span className="text-amber-600 dark:text-amber-400 font-bold">{t('timeFormatLabel')}</span> {settings.militaryTime ? '24h' : '12h'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prayer Times Display */}
        <motion.div 
          className="w-full max-w-6xl"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div 
            className="p-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl"
            variants={staggerItem}
          >
            <div className="flex justify-between items-center mb-8">
              <div className="text-sm text-gray-300">
                <span className="text-amber-400 font-bold">{t('fiqhLabel')}</span> {FIQHS.find(f => f.id === settings.fiqh)?.name}
                {settings.fiqh === 'ahl-e-hadith' && (
                  <span className="ml-2 text-xs text-amber-300">
                    {t('fiqhNoteAhlEHadith')}
                  </span>
                )}
              </div>
              <div className="text-right text-amber-300 font-bold">{hijri}</div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {PRAYERS.map((p, i) => (
                <motion.div
                  key={p}
                  className={`relative p-4 sm:p-6 rounded-2xl sm:rounded-3xl transition-all duration-500 backdrop-blur-sm ${
                    i === nextIdx 
                      ? 'bg-gradient-to-br from-amber-500/30 to-orange-500/30 border-2 border-amber-400/50 shadow-2xl shadow-amber-500/25' 
                      : 'bg-white/10 border border-white/20 hover:bg-white/20'
                  }`}
                  variants={staggerItem}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{getPrayerIcon(p)}</div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{getPrayerDisplayName(p)}</h3>
                    <div className="text-xl sm:text-2xl font-bold text-amber-300 mb-3 sm:mb-4">{formatTime(times[p])}</div>
                    
                    {i === nextIdx && p !== 'Sunrise' && (
                      <div className="mt-3 sm:mt-4">
                        <div className="text-xs sm:text-sm text-gray-300 mb-1 sm:mb-2">Next Prayer In:</div>
                        <div className="text-base sm:text-lg font-bold text-amber-300">{formatCountdown(countdown)}</div>
                        <div className="text-xl sm:text-2xl mt-1 sm:mt-2 animate-pulse">🔊</div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Notification Status */}
        <motion.div 
          className="w-full max-w-4xl"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ ...transitions.smooth, delay: 0.3 }}
        >
          <div className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold text-xl mb-2">{t('prayerNotificationsTitle')}</h3>
                <p className="text-gray-300">
                  {notificationsEnabled 
                    ? t('notificationsEnabledStatus')
                    : t('notificationsDisabledStatus')
                  }
                </p>
              </div>
              <motion.button
                onClick={enableNotifications}
                className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-xl font-bold transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {notificationsEnabled ? t('disable') : t('enable')}
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        <audio ref={azanRef} src={AZAN_AUDIO} preload="auto" />
      </div>
    </div>
  );
} 