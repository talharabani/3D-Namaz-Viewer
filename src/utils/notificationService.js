// Notification service for prayer time alerts

class NotificationService {
  constructor() {
    this.settings = this.loadSettings();
    this.notifications = [];
    this.isSupported = 'Notification' in window;
  }

  loadSettings() {
    try {
      const saved = localStorage.getItem('namaz_settings');
      return saved ? JSON.parse(saved) : this.getDefaultSettings();
    } catch (error) {
      console.error('Error loading notification settings:', error);
      return this.getDefaultSettings();
    }
  }

  getDefaultSettings() {
    return {
      notifications: {
        fajr: true,
        dhuhr: true,
        asr: true,
        maghrib: true,
        isha: true,
        sunrise: false,
        advanceMinutes: 10
      },
      soundEnabled: true,
      vibrationEnabled: true
    };
  }

  async requestPermission() {
    if (!this.isSupported) {
      console.warn('Notifications not supported in this browser');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission === 'denied') {
      console.warn('Notification permission denied');
      return false;
    }

    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  async schedulePrayerNotification(prayerName, prayerTime) {
    if (!this.isSupported || !this.settings.notifications[prayerName.toLowerCase()]) {
      return;
    }

    const hasPermission = await this.requestPermission();
    if (!hasPermission) {
      return;
    }

    const advanceMinutes = this.settings.notifications.advanceMinutes;
    const notificationTime = new Date(prayerTime.getTime() - (advanceMinutes * 60 * 1000));
    const now = new Date();

    // If notification time is in the past, schedule for next day
    if (notificationTime <= now) {
      notificationTime.setDate(notificationTime.getDate() + 1);
    }

    const timeUntilNotification = notificationTime.getTime() - now.getTime();

    // Schedule the notification
    setTimeout(() => {
      this.showPrayerNotification(prayerName, prayerTime);
    }, timeUntilNotification);

    // Store notification info for debugging
    this.notifications.push({
      prayer: prayerName,
      scheduledTime: notificationTime,
      actualTime: prayerTime
    });
  }

  showPrayerNotification(prayerName, prayerTime) {
    if (!this.isSupported || Notification.permission !== 'granted') {
      return;
    }

    const notification = new Notification('Prayer Time Reminder', {
      body: `${prayerName} prayer time is approaching. It's time to prepare for salah.`,
      icon: '/favicon.ico', // You can add a custom icon
      badge: '/favicon.ico',
      tag: `prayer-${prayerName.toLowerCase()}`,
      requireInteraction: false,
      silent: !this.settings.soundEnabled
    });

    // Add click handler
    notification.onclick = () => {
      window.focus();
      notification.close();
      // You can add navigation logic here
    };

    // Vibrate if enabled
    if (this.settings.vibrationEnabled && 'vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }

    // Auto close after 10 seconds
    setTimeout(() => {
      notification.close();
    }, 10000);
  }

  showAchievementNotification(achievement) {
    if (!this.isSupported || Notification.permission !== 'granted') {
      return;
    }

    const notification = new Notification('Achievement Unlocked! 🏆', {
      body: `${achievement.title}: ${achievement.description}`,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      tag: `achievement-${achievement.id}`,
      requireInteraction: false,
      silent: !this.settings.soundEnabled
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
      // Navigate to progress dashboard
      window.location.href = '/progress';
    };

    if (this.settings.vibrationEnabled && 'vibrate' in navigator) {
      navigator.vibrate([100, 50, 100, 50, 100]);
    }

    setTimeout(() => {
      notification.close();
    }, 8000);
  }

  showGeneralNotification(title, message, options = {}) {
    if (!this.isSupported || Notification.permission !== 'granted') {
      return;
    }

    const notification = new Notification(title, {
      body: message,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      requireInteraction: false,
      silent: !this.settings.soundEnabled,
      ...options
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    setTimeout(() => {
      notification.close();
    }, 5000);
  }

  // Schedule notifications for all prayer times
  async scheduleAllPrayerNotifications(prayerTimes) {
    const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    
    prayers.forEach(prayer => {
      const prayerTime = prayerTimes[prayer.toLowerCase()];
      if (prayerTime) {
        this.schedulePrayerNotification(prayer, new Date(prayerTime));
      }
    });
  }

  // Clear all scheduled notifications
  clearAllNotifications() {
    if (this.isSupported) {
      // Close any existing notifications
      if ('serviceWorker' in navigator && 'getNotifications' in navigator.serviceWorker) {
        navigator.serviceWorker.getNotifications().then(notifications => {
          notifications.forEach(notification => notification.close());
        });
      }
    }
    
    // Clear scheduled timeouts (this is a simplified approach)
    this.notifications = [];
  }

  // Update settings
  updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    // You might want to reschedule notifications with new settings
  }

  // Get notification status
  getStatus() {
    return {
      isSupported: this.isSupported,
      permission: this.isSupported ? Notification.permission : 'not-supported',
      settings: this.settings,
      scheduledNotifications: this.notifications.length
    };
  }
}

// Export singleton instance
export const notificationService = new NotificationService(); 