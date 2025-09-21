import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ToggleLeft } from '../components/ToggleLeft';
import { useSettings } from '../contexts/SettingsContext';
import { useTranslation } from '../utils/translations';
import ThemeToggle from '../components/ThemeToggle';
import LanguageToggle from '../components/LanguageToggle';
import { useToast } from '../components/Toast';
import ParticleBackground from '../components/ParticleBackground';
import SearchBar from '../components/SearchBar';
import AuthModal from '../components/AuthModal';
import authService from '../utils/authService';
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

export default function SettingsScreen() {
  const { t, currentLang, setLanguage } = useTranslation();
  const { success, error } = useToast();
  const { 
    settings, 
    updateSettings, 
    updateNotificationSetting, 
    updateAdvanceMinutes, 
    updateLocation, 
    updateTheme, 
    updateAccessibility, 
    updateDataUsage, 
    resetToDefaults 
  } = useSettings();

  const [loading, setLoading] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState('default');
  const [activeSection, setActiveSection] = useState('profile');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  useEffect(() => {
    // Check notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }

    // Check authentication status
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setIsAuthenticated(true);
      setUser(currentUser);
    }

    // Listen for auth changes
    const handleAuthChange = (user, authenticated) => {
      setIsAuthenticated(authenticated);
      setUser(user);
    };

    authService.addListener(handleAuthChange);

    return () => {
      authService.removeListener(handleAuthChange);
    };
  }, []);

  const showToastMessage = (message, type = 'success') => {
    if (type === 'success') {
      success(message);
    } else {
      error(message);
    }
  };

  const handleLocationUpdate = async () => {
    setLoading(true);
    try {
      const result = await updateLocation();
      setLoading(false);
      showToastMessage(result.message, result.success ? 'success' : 'error');
    } catch (err) {
      setLoading(false);
      showToastMessage('Failed to update location', 'error');
    }
  };

  const handleThemeUpdate = (theme) => {
    updateTheme(theme);
    showToastMessage(t('themeUpdatedSuccessfully'));
  };

  const handleAccessibilityUpdate = (accessibility) => {
    updateAccessibility(accessibility);
    showToastMessage(t('accessibilitySettingsUpdated'));
  };

  const handleDataUsageUpdate = (dataUsage) => {
    updateDataUsage(dataUsage);
    showToastMessage(t('dataSettingsUpdated'));
  };

  const handleNotificationUpdate = (prayer, enabled) => {
    updateNotificationSetting(prayer, enabled);
    showToastMessage(t('prayerNotificationsToggle', { prayer, state: enabled ? t('enabled') : t('disabled') }));
  };

  const handleAdvanceMinutesUpdate = (minutes) => {
    updateAdvanceMinutes(minutes);
    showToastMessage(t('advanceNotificationSetTo', { minutes }));
  };

  const handleResetToDefaults = () => {
    if (confirm(t('resetSettingsConfirm'))) {
      resetToDefaults();
      showToastMessage(t('settingsReset'));
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      if (permission === 'granted') {
        showToastMessage(t('notificationsEnabledMessage'));
      } else {
        showToastMessage(t('enableNotificationsInBrowser'));
      }
    }
  };

  const prayerMethods = [
    { value: 2, label: 'ISNA', description: 'Islamic Society of North America' },
    { value: 3, label: 'MWL', description: 'Muslim World League' },
    { value: 4, label: 'Umm Al-Qura', description: 'Makkah, Saudi Arabia' },
    { value: 5, label: 'Egyptian', description: 'Egyptian General Authority' },
    { value: 12, label: 'Dubai', description: 'Dubai, UAE' }
  ];

  const fiqhOptions = [
    { value: 'shafi', label: 'Shafi', description: "Shafi'i School" },
    { value: 'hanafi', label: 'Hanafi', description: 'Hanafi School' },
    { value: 'ahl-e-hadith', label: 'Ahl-e-Hadith', description: 'Ahl-e-Hadith' }
  ];

  const sections = [
    { id: 'profile', icon: '👤', title: t('profile'), color: 'emerald' },
    { id: 'notifications', icon: '🔔', title: t('notifications'), color: 'amber' },
    { id: 'location', icon: '📍', title: t('location'), color: 'blue' },
    { id: 'prayer', icon: '🕌', title: t('prayer'), color: 'green' },
    { id: 'appearance', icon: '🎨', title: t('appearanceTab'), color: 'purple' },
    { id: 'accessibility', icon: '♿', title: t('accessibility'), color: 'indigo' },
    { id: 'data', icon: '📊', title: t('dataSync'), color: 'teal' },
    { id: 'reset', icon: '🔄', title: t('reset'), color: 'red' }
  ];

  const handleAuthSuccess = (user) => {
    console.log('Authentication successful:', user);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    authService.logout();
    setActiveSection('profile');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            {isAuthenticated ? (
              // User Profile View
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl">
                <div className="text-center mb-8">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-4xl text-white font-bold">
                    {user?.name?.charAt(0)?.toUpperCase() || '👤'}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{user?.name || 'User'}</h3>
                  <p className="text-emerald-200">{user?.email}</p>
                  <div className="flex items-center justify-center mt-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                      {user?.provider === 'google.com' ? '🔗 Google' : '📧 Email'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-white mb-2">Account Information</h4>
                    <div className="space-y-2 text-sm text-emerald-200">
                      <p><strong className="text-emerald-300">User ID:</strong> {user?.id}</p>
                      <p><strong className="text-emerald-300">Joined:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                      <p><strong className="text-emerald-300">Last Login:</strong> {user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A'}</p>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-white mb-2">Quick Actions</h4>
                    <div className="space-y-3">
                      <button
                        onClick={() => setActiveSection('notifications')}
                        className="w-full text-left p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white border border-white/20"
                      >
                        🔔 Notification Settings
                      </button>
                      <button
                        onClick={() => setActiveSection('appearance')}
                        className="w-full text-left p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white border border-white/20"
                      >
                        🎨 Appearance Settings
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleLogout}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center"
                  >
                    🚪 Sign Out
                  </button>
                  <button
                    onClick={() => setActiveSection('data')}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center"
                  >
                    📊 Data & Privacy
                  </button>
                </div>
              </div>
            ) : (
              // Guest User View
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-4xl text-white">
                  👤
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Welcome to Namaz Web</h3>
                <p className="text-emerald-200 mb-8 max-w-md mx-auto">
                  Sign in to access your personalized profile, track your prayer progress, and sync your data across devices.
                </p>
                
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      setAuthMode('login');
                      setShowAuthModal(true);
                    }}
                    className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-105"
                  >
                    🔑 Sign In
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode('signup');
                      setShowAuthModal(true);
                    }}
                    className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 ml-0 sm:ml-4"
                  >
                    ✨ Create Account
                  </button>
                </div>

                <div className="mt-8 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                  <h4 className="text-lg font-semibold text-white mb-3">Benefits of Signing In:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-emerald-200">
                    <div className="flex items-center">
                      <span className="mr-2">📊</span>
                      Track prayer progress
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">☁️</span>
                      Sync across devices
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">🔔</span>
                      Personalized notifications
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">⚙️</span>
                      Custom settings
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-amber-200 mb-4">{t('prayerNotificationsTitle')}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {Object.entries(settings.notifications).filter(([key]) => ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].includes(key)).map(([prayer, enabled]) => (
                  <div key={prayer} className="flex items-center justify-between p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <div>
                      <span className="text-white font-semibold capitalize">{prayer}</span>
                      <p className="text-sm text-emerald-200">{t('dailyPrayerReminder')}</p>
                    </div>
                    <ToggleLeft
                      isActive={enabled}
                      onChange={(active) => handleNotificationUpdate(prayer, active)}
                      stroke="#92400e"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div>
                    <span className="text-white font-semibold">{t('advanceNotification')}</span>
                    <p className="text-sm text-emerald-300">{t('minutesBeforePrayerTime')}</p>
                  </div>
                  <select
                    value={settings.notifications.advanceMinutes}
                    onChange={(e) => handleAdvanceMinutesUpdate(Number(e.target.value))}
                    className="rounded-lg border border-amber-300 dark:border-amber-600 bg-white dark:bg-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value={5}>5 {t('minutes')}</option>
                    <option value={10}>10 {t('minutes')}</option>
                    <option value={15}>15 {t('minutes')}</option>
                    <option value={20}>20 {t('minutes')}</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div>
                    <span className="text-white font-semibold">{t('notificationPermission')}</span>
                    <p className="text-sm text-emerald-300">{t('notificationPermissionStatus')}</p>
                  </div>
                  <button
                    onClick={requestNotificationPermission}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      notificationPermission === 'granted'
                        ? 'bg-green-600 text-white'
                        : 'bg-amber-600 text-white hover:bg-amber-700'
                    }`}
                  >
                    {notificationPermission === 'granted' ? `✅ ${t('enabled')}` : `🔔 ${t('enable')}`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-blue-200 mb-4">{t('locationSettings')}</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div>
                    <span className="text-white font-semibold">{t('currentLocation')}</span>
                    <p className="text-sm text-emerald-300">
                      {settings.location.city && settings.location.country 
                        ? `${settings.location.city}, ${settings.location.country}`
                        : t('locationNotSet')
                      }
                    </p>
                  </div>
                  <button
                    onClick={handleLocationUpdate}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? `🔄 ${t('updating')}` : `📍 ${t('updateLocationButton')}`}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <h4 className="font-semibold text-white mb-2">{t('locationInfo')}</h4>
                  <div className="space-y-2 text-sm text-emerald-200">
                    <div>{t('city')}: {settings.location.city || t('notDetected')}</div>
                    <div>{t('country')}: {settings.location.country || t('notDetected')}</div>
                    <div>{t('timezone')}: {settings.location.timezone || t('notDetected')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'prayer':
        return (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-green-200 mb-4">{t('prayerCalculation')}</h3>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <label className="block text-white font-semibold mb-2">{t('calculationMethod')}</label>
                  <select
                    value={settings.prayerMethod}
                    onChange={(e) => {
                      updateSettings({ ...settings, prayerMethod: Number(e.target.value) });
                      showToastMessage(t('prayerMethodUpdated'));
                    }}
                    className="w-full rounded-lg border border-green-300 dark:border-green-600 bg-white dark:bg-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {prayerMethods.map(method => (
                      <option key={method.value} value={method.value}>
                        {method.label} - {method.description}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <label className="block text-white font-semibold mb-2">{t('fiqhSchool')}</label>
                  <select
                    value={settings.fiqh}
                    onChange={(e) => {
                      updateSettings({ ...settings, fiqh: e.target.value });
                      showToastMessage(t('fiqhUpdated'));
                    }}
                    className="w-full rounded-lg border border-green-300 dark:border-green-600 bg-white dark:bg-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {fiqhOptions.map(fiqh => (
                      <option key={fiqh.value} value={fiqh.value}>
                        {fiqh.label} - {fiqh.description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-purple-200 mb-4">{t('appearanceSettings')}</h3>
              
              <div className="space-y-6">
                {/* Theme Toggle */}
                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <ThemeToggle 
                    theme={settings.theme} 
                    onThemeChange={handleThemeUpdate}
                    className="justify-center"
                  />
                </div>
                
                {/* Language Toggle */}
                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <LanguageToggle 
                    currentLang={currentLang} 
                    onLanguageChange={setLanguage}
                    className="justify-center"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <div>
                      <span className="text-white font-semibold">{t('showSeconds')}</span>
                      <p className="text-sm text-emerald-300">{t('displaySecondsInTime')}</p>
                    </div>
                    <ToggleLeft
                      isActive={settings.showSeconds}
                      onChange={(active) => {
                        updateSettings({ ...settings, showSeconds: active });
                        showToastMessage(`${t('showSeconds')} ${active ? t('enabled') : t('disabled')}!`);
                      }}
                      stroke="#7c3aed"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <div>
                      <span className="text-white font-semibold">{t('militaryTime')}</span>
                      <p className="text-sm text-emerald-300">{t('twentyFourHourFormat')}</p>
                    </div>
                    <ToggleLeft
                      isActive={settings.militaryTime}
                      onChange={(active) => {
                        updateSettings({ ...settings, militaryTime: active });
                        showToastMessage(`${t('militaryTime')} ${active ? t('enabled') : t('disabled')}!`);
                      }}
                      stroke="#7c3aed"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'accessibility':
        return (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-indigo-200 mb-4">{t('accessibility')}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div>
                    <span className="text-white font-semibold">{t('accessibilityLargeText')}</span>
                    <p className="text-sm text-emerald-300">{t('increaseFontSize')}</p>
                  </div>
                  <ToggleLeft
                    isActive={settings.accessibility.largeText}
                    onChange={(active) => handleAccessibilityUpdate({ largeText: active })}
                    stroke="#4f46e5"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div>
                    <span className="text-white font-semibold">{t('accessibilityHighContrast')}</span>
                    <p className="text-sm text-emerald-300">{t('enhancedContrast')}</p>
                  </div>
                  <ToggleLeft
                    isActive={settings.accessibility.highContrast}
                    onChange={(active) => handleAccessibilityUpdate({ highContrast: active })}
                    stroke="#4f46e5"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div>
                    <span className="text-white font-semibold">{t('reduceMotion')}</span>
                    <p className="text-sm text-emerald-300">{t('minimizeAnimations')}</p>
                  </div>
                  <ToggleLeft
                    isActive={settings.accessibility.reduceMotion}
                    onChange={(active) => handleAccessibilityUpdate({ reduceMotion: active })}
                    stroke="#4f46e5"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div>
                    <span className="text-white font-semibold">{t('screenReader')}</span>
                    <p className="text-sm text-emerald-300">{t('accessibilitySupport')}</p>
                  </div>
                  <ToggleLeft
                    isActive={settings.accessibility.screenReader}
                    onChange={(active) => handleAccessibilityUpdate({ screenReader: active })}
                    stroke="#4f46e5"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-teal-200 mb-4">{t('dataAndSync')}</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <div>
                      <span className="text-white font-semibold">{t('autoSync')}</span>
                      <p className="text-sm text-emerald-300">{t('syncDataAutomatically')}</p>
                    </div>
                    <ToggleLeft
                      isActive={settings.dataUsage.autoSync}
                      onChange={(active) => handleDataUsageUpdate({ autoSync: active })}
                      stroke="#0f766e"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                    <div>
                      <span className="text-white font-semibold">{t('backgroundSync')}</span>
                      <p className="text-sm text-emerald-300">{t('syncInBackground')}</p>
                    </div>
                    <ToggleLeft
                      isActive={settings.dataUsage.backgroundSync}
                      onChange={(active) => handleDataUsageUpdate({ backgroundSync: active })}
                      stroke="#0f766e"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <label className="block text-white font-semibold mb-2">{t('syncIntervalMinutes')}</label>
                  <select
                    value={settings.dataUsage.syncInterval}
                    onChange={(e) => handleDataUsageUpdate({ syncInterval: Number(e.target.value) })}
                    className="w-full rounded-lg border border-teal-300 dark:border-teal-600 bg-white dark:bg-gray-700 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value={15}>15 {t('minutes')}</option>
                    <option value={30}>30 {t('minutes')}</option>
                    <option value={60}>60 {t('minutes')}</option>
                    <option value={120}>120 {t('minutes')}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'reset':
        return (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-red-200 mb-4">{t('resetSettingsTitle')}</h3>
              
              <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-center">
                  <div className="text-4xl mb-4">⚠️</div>
                  <h4 className="text-lg font-semibold text-white mb-2">{t('resetToDefaultsTitle')}</h4>
                  <p className="text-emerald-200 mb-6">
                    {t('resetSettingsWarning')}
                  </p>
                  <button
                    onClick={handleResetToDefaults}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    🔄 {t('resetAllSettings')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-40 w-60 h-60 bg-emerald-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-3000"></div>
      </div>

      {/* Search Bar Section - Floating */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-2xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SearchBar />
        </motion.div>
      </div>

      {/* Floating Authentication Button */}
      {!isAuthenticated && (
        <motion.div
          className="fixed top-20 right-4 z-40"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <button
            onClick={() => {
              setAuthMode('login');
              setShowAuthModal(true);
            }}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:from-emerald-700 hover:to-teal-700 transition-all transform hover:scale-105"
          >
            🔑 Sign In
          </button>
        </motion.div>
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center gap-12 py-12 px-4 pt-32">
        {/* Header Section */}
        <motion.div 
          className="w-full text-center mb-12"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={transitions.smooth}
        >
          <div className="relative">
            <motion.div 
              className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent"
              variants={pulseAnimation}
              animate="animate"
            >
            ⚙️ {t('settings')}
            </motion.div>
            <div className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('settingsHeaderSubtitle')}
            </div>
        </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div 
          className="w-full max-w-4xl mb-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div 
            className="flex flex-wrap gap-3 justify-center"
            variants={staggerContainer}
          >
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-6 py-3 rounded-2xl transition-all font-medium backdrop-blur-sm ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                }`}
                variants={staggerItem}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-2">{section.icon}</span>
                {section.title}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Content Area */}
        <div className="max-w-4xl mx-auto">
          {renderSection()}
        </div>

      </div>

      {/* Authentication Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        mode={authMode}
      />
    </div>
  );
} 
