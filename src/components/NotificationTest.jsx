import React, { useState } from 'react';
import { motion } from 'framer-motion';
import notificationService from '../utils/notificationService';
import { useTranslation } from '../utils/translations';
import { buttonPress } from '../utils/animations';

const NotificationTest = () => {
  const { t } = useTranslation();
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState('default');

  React.useEffect(() => {
    setIsSupported(notificationService.isSupported);
    setPermission(Notification.permission);
  }, []);

  const testNotification = async () => {
    try {
      await notificationService.showDailyDuaNotification();
    } catch (error) {
      console.error('Error showing test notification:', error);
    }
  };

  const requestPermission = async () => {
    try {
      const granted = await notificationService.requestPermission();
      setPermission(Notification.permission);
      if (granted) {
        alert('Notification permission granted!');
      } else {
        alert('Notification permission denied.');
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
    }
  };

  if (!isSupported) {
    return (
      <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-lg">
        <p className="text-red-800 dark:text-red-200">
          Notifications are not supported in this browser.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
      <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
        🔔 Notification Test
      </h3>
      
      <div className="space-y-3">
        <div className="text-sm text-blue-700 dark:text-blue-300">
          <strong>Status:</strong> {permission === 'granted' ? '✅ Enabled' : '❌ Disabled'}
        </div>
        
        <div className="flex gap-2">
          {permission !== 'granted' && (
            <motion.button
              onClick={requestPermission}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              {...buttonPress}
            >
              Request Permission
            </motion.button>
          )}
          
          {permission === 'granted' && (
            <motion.button
              onClick={testNotification}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              {...buttonPress}
            >
              Test Notification
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationTest;

