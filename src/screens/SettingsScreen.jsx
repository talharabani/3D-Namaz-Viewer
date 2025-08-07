import { useEffect, useState } from 'react';
import { ToggleLeft } from '../components/ToggleLeft';
import { useSettings } from '../contexts/SettingsContext';

export default function SettingsScreen() {
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
  const [activeSection, setActiveSection] = useState('notifications');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    // Check notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleLocationUpdate = async () => {
    setLoading(true);
    const result = await updateLocation();
    setLoading(false);
    showToastMessage(result.message);
  };

  const handleThemeUpdate = (theme) => {
    updateTheme(theme);
    showToastMessage('Theme updated successfully!');
  };

  const handleAccessibilityUpdate = (accessibility) => {
    updateAccessibility(accessibility);
    showToastMessage('Accessibility settings updated!');
  };

  const handleDataUsageUpdate = (dataUsage) => {
    updateDataUsage(dataUsage);
    showToastMessage('Data settings updated!');
  };

  const handleNotificationUpdate = (prayer, enabled) => {
    updateNotificationSetting(prayer, enabled);
    showToastMessage(`${prayer} notifications ${enabled ? 'enabled' : 'disabled'}!`);
  };

  const handleAdvanceMinutesUpdate = (minutes) => {
    updateAdvanceMinutes(minutes);
    showToastMessage(`Advance notification set to ${minutes} minutes!`);
  };

  const handleResetToDefaults = () => {
    if (confirm('This will reset all settings to default values. Are you sure?')) {
      resetToDefaults();
      showToastMessage('Settings reset to defaults!');
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      if (permission === 'granted') {
        showToastMessage('Notifications enabled! You will receive prayer time alerts.');
      } else {
        showToastMessage('Please enable notifications in your browser settings to receive prayer alerts.');
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
    { value: 'shafi', label: 'Shafi', description: 'Shafi\'i School' },
    { value: 'hanafi', label: 'Hanafi', description: 'Hanafi School' },
    { value: 'ahl-e-hadith', label: 'Ahl-e-Hadith', description: 'Ahl-e-Hadith' }
  ];

  const sections = [
    { id: 'notifications', icon: '🔔', title: 'Notifications', color: 'amber' },
    { id: 'location', icon: '📍', title: 'Location', color: 'blue' },
    { id: 'prayer', icon: '🕌', title: 'Prayer Settings', color: 'green' },
    { id: 'appearance', icon: '🎨', title: 'Appearance', color: 'purple' },
    { id: 'accessibility', icon: '♿', title: 'Accessibility', color: 'indigo' },
    { id: 'data', icon: '📊', title: 'Data & Sync', color: 'teal' },
    { id: 'reset', icon: '🔄', title: 'Reset', color: 'red' }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
              <h3 className="text-xl font-bold text-amber-800 dark:text-amber-200 mb-4">Prayer Notifications</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {Object.entries(settings.notifications).filter(([key]) => ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].includes(key)).map(([prayer, enabled]) => (
                  <div key={prayer} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 border border-amber-200 dark:border-amber-700">
                    <div>
                      <span className="text-gray-700 dark:text-gray-300 font-semibold capitalize">{prayer}</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Daily prayer reminder</p>
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
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 border border-amber-200 dark:border-amber-700">
                  <div>
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">Advance Notification</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Minutes before prayer time</p>
                  </div>
                  <select
                    value={settings.notifications.advanceMinutes}
                    onChange={(e) => handleAdvanceMinutesUpdate(Number(e.target.value))}
                    className="rounded-lg border border-amber-300 dark:border-amber-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value={5}>5 minutes</option>
                    <option value={10}>10 minutes</option>
                    <option value={15}>15 minutes</option>
                    <option value={20}>20 minutes</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 border border-amber-200 dark:border-amber-700">
                  <div>
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">Notification Permission</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Browser notification status</p>
                  </div>
                  <button
                    onClick={requestNotificationPermission}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      notificationPermission === 'granted'
                        ? 'bg-green-600 text-white'
                        : 'bg-amber-600 text-white hover:bg-amber-700'
                    }`}
                  >
                    {notificationPermission === 'granted' ? '✅ Enabled' : '🔔 Enable'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'location':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
              <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200 mb-4">Location Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 border border-blue-200 dark:border-blue-700">
                  <div>
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">Current Location</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {settings.location.city && settings.location.country 
                        ? `${settings.location.city}, ${settings.location.country}`
                        : 'Location not set'
                      }
                    </p>
                  </div>
                  <button
                    onClick={handleLocationUpdate}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? '🔄 Updating...' : '📍 Update Location'}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 border border-blue-200 dark:border-blue-700">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Location Info</h4>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <div>City: {settings.location.city || 'Not detected'}</div>
                    <div>Country: {settings.location.country || 'Not detected'}</div>
                    <div>Timezone: {settings.location.timezone || 'Not detected'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'prayer':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
              <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-4">Prayer Calculation</h3>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 border border-green-200 dark:border-green-700">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Calculation Method</label>
                  <select
                    value={settings.prayerMethod}
                    onChange={(e) => {
                      updateSettings({ ...settings, prayerMethod: Number(e.target.value) });
                      showToastMessage('Prayer method updated!');
                    }}
                    className="w-full rounded-lg border border-green-300 dark:border-green-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {prayerMethods.map(method => (
                      <option key={method.value} value={method.value}>
                        {method.label} - {method.description}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 border border-green-200 dark:border-green-700">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Fiqh School</label>
                  <select
                    value={settings.fiqh}
                    onChange={(e) => {
                      updateSettings({ ...settings, fiqh: e.target.value });
                      showToastMessage('Fiqh school updated!');
                    }}
                    className="w-full rounded-lg border border-green-300 dark:border-green-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
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
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
              <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-4">Appearance Settings</h3>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 border border-purple-200 dark:border-purple-700">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Theme</label>
                  <select
                    value={settings.theme}
                    onChange={(e) => handleThemeUpdate(e.target.value)}
                    className="w-full rounded-lg border border-purple-300 dark:border-purple-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="auto">Auto (System)</option>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 border border-purple-200 dark:border-purple-700">
                    <div>
                      <span className="text-gray-700 dark:text-gray-300 font-semibold">Show Seconds</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Display seconds in time</p>
                    </div>
                    <ToggleLeft
                      isActive={settings.showSeconds}
                      onChange={(active) => {
                        updateSettings({ ...settings, showSeconds: active });
                        showToastMessage(`Show seconds ${active ? 'enabled' : 'disabled'}!`);
                      }}
                      stroke="#7c3aed"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 border border-purple-200 dark:border-purple-700">
                    <div>
                      <span className="text-gray-700 dark:text-gray-300 font-semibold">Military Time</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">24-hour format</p>
                    </div>
                    <ToggleLeft
                      isActive={settings.militaryTime}
                      onChange={(active) => {
                        updateSettings({ ...settings, militaryTime: active });
                        showToastMessage(`Military time ${active ? 'enabled' : 'disabled'}!`);
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
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
              <h3 className="text-xl font-bold text-indigo-800 dark:text-indigo-200 mb-4">Accessibility</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 border border-indigo-200 dark:border-indigo-700">
                  <div>
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">Large Text</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Increase font size</p>
                  </div>
                  <ToggleLeft
                    isActive={settings.accessibility.largeText}
                    onChange={(active) => handleAccessibilityUpdate({ largeText: active })}
                    stroke="#4f46e5"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 border border-indigo-200 dark:border-indigo-700">
                  <div>
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">High Contrast</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Enhanced contrast</p>
                  </div>
                  <ToggleLeft
                    isActive={settings.accessibility.highContrast}
                    onChange={(active) => handleAccessibilityUpdate({ highContrast: active })}
                    stroke="#4f46e5"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 border border-indigo-200 dark:border-indigo-700">
                  <div>
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">Reduce Motion</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Minimize animations</p>
                  </div>
                  <ToggleLeft
                    isActive={settings.accessibility.reduceMotion}
                    onChange={(active) => handleAccessibilityUpdate({ reduceMotion: active })}
                    stroke="#4f46e5"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 border border-indigo-200 dark:border-indigo-700">
                  <div>
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">Screen Reader</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Accessibility support</p>
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
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
              <h3 className="text-xl font-bold text-teal-800 dark:text-teal-200 mb-4">Data & Sync</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 border border-teal-200 dark:border-teal-700">
                    <div>
                      <span className="text-gray-700 dark:text-gray-300 font-semibold">Auto Sync</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Sync data automatically</p>
                    </div>
                    <ToggleLeft
                      isActive={settings.dataUsage.autoSync}
                      onChange={(active) => handleDataUsageUpdate({ autoSync: active })}
                      stroke="#0f766e"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 border border-teal-200 dark:border-teal-700">
                    <div>
                      <span className="text-gray-700 dark:text-gray-300 font-semibold">Background Sync</span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Sync in background</p>
                    </div>
                    <ToggleLeft
                      isActive={settings.dataUsage.backgroundSync}
                      onChange={(active) => handleDataUsageUpdate({ backgroundSync: active })}
                      stroke="#0f766e"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 border border-teal-200 dark:border-teal-700">
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Sync Interval (minutes)</label>
                  <select
                    value={settings.dataUsage.syncInterval}
                    onChange={(e) => handleDataUsageUpdate({ syncInterval: Number(e.target.value) })}
                    className="w-full rounded-lg border border-teal-300 dark:border-teal-600 bg-white dark:bg-gray-700 px-3 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={120}>2 hours</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'reset':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
              <h3 className="text-xl font-bold text-red-800 dark:text-red-200 mb-4">Reset Settings</h3>
              
              <div className="p-6 rounded-xl bg-gradient-to-r from-red-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 border border-red-200 dark:border-red-700">
                <div className="text-center">
                  <div className="text-4xl mb-4">⚠️</div>
                  <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Reset to Defaults</h4>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    This will reset all settings to their default values. This action cannot be undone.
                  </p>
                  <button
                    onClick={handleResetToDefaults}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    🔄 Reset All Settings
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-heading text-amber-800 dark:text-amber-200 font-bold mb-4 drop-shadow">
            ⚙️ Settings
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Customize your prayer experience and app preferences
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-lg transition-all font-medium ${
                  activeSection === section.id
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700 border border-amber-300 dark:border-amber-600'
                }`}
              >
                <span className="mr-2">{section.icon}</span>
                {section.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-4xl mx-auto">
          {renderSection()}
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slideIn">
            {toastMessage}
          </div>
        )}
      </div>
    </div>
  );
} 