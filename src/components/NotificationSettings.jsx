import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../utils/translations';
import notificationService from '../utils/notificationService';
import authService from '../utils/authService';
import { 
  fadeInUp, 
  buttonPress, 
  transitions 
} from '../utils/animations';

const NotificationSettings = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [permission, setPermission] = useState('default');
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState({ dailyDua: false, time: '19:00' });

  // Get current user from authService
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  useEffect(() => {
    if (isOpen && user) {
      loadNotificationPreferences();
      checkNotificationPermission();
    }
  }, [isOpen, user]);

  const loadNotificationPreferences = async () => {
    try {
      const prefs = await notificationService.getNotificationPreferences();
      setPreferences(prefs);
      setIsEnabled(prefs.dailyDua);
    } catch (error) {
      console.error('Error loading notification preferences:', error);
    }
  };

  const checkNotificationPermission = () => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  };

  const handleToggleNotifications = async () => {
    if (!user) return;

    setLoading(true);
    try {
      if (!isEnabled) {
        // Enable notifications
        const granted = await notificationService.requestPermission();
        if (granted) {
          await notificationService.initialize();
          await notificationService.scheduleDailyNotification();
          await notificationService.saveNotificationPreferences(true);
          setIsEnabled(true);
          setPermission('granted');
        } else {
          alert('Please allow notifications to receive daily dua reminders.');
        }
      } else {
        // Disable notifications
        await notificationService.saveNotificationPreferences(false);
        setIsEnabled(false);
      }
    } catch (error) {
      console.error('Error toggling notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestPermission = async () => {
    setLoading(true);
    try {
      const granted = await notificationService.requestPermission();
      if (granted) {
        setPermission('granted');
        await notificationService.initialize();
      } else {
        alert('Notification permission denied. Please enable it in your browser settings.');
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-200/50 dark:border-slate-700/50"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            📱 Notification Settings
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors text-2xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Daily Dua Notifications */}
          <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                  📿 Daily Dua Reminders
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Receive a different dua every day at 7:00 PM
                </p>
              </div>
              <div className="flex items-center">
                {permission === 'granted' ? (
                  <motion.button
                    onClick={handleToggleNotifications}
                    disabled={loading}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      isEnabled ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                    {...buttonPress}
                  >
                    <motion.div
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
                      animate={{ x: isEnabled ? 26 : 2 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={handleRequestPermission}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                    {...buttonPress}
                  >
                    {loading ? '...' : 'Enable'}
                  </motion.button>
                )}
              </div>
            </div>

            {/* Permission Status */}
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Status: {permission === 'granted' ? '✅ Enabled' : '❌ Disabled'}
            </div>
          </div>

          {/* Notification Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="text-blue-500 text-xl">ℹ️</div>
              <div>
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  How it works:
                </h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• You'll receive a notification at 7:00 PM daily</li>
                  <li>• Each day features a different dua</li>
                  <li>• Click the notification to view the full dua</li>
                  <li>• You can bookmark duas directly from notifications</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Test Notification */}
          {permission === 'granted' && (
            <motion.button
              onClick={() => notificationService.showDailyDuaNotification()}
              className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:from-emerald-500 hover:to-green-500 transition-all duration-300"
              {...buttonPress}
            >
              🧪 Test Notification
            </motion.button>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
            Notifications help you stay consistent with your daily dua practice
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default NotificationSettings;
