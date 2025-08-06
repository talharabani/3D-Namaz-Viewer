// Enhanced notification service for prayer times
class NotificationService {
  constructor() {
    this.isSupported = typeof window !== 'undefined' && 'Notification' in window;
    this.permission = this.isSupported ? Notification.permission : 'denied';
    this.notifications = new Map(); // Track active notifications
  }

  // Request notification permission
  async requestPermission() {
    if (!this.isSupported) {
      console.warn('Notifications not supported in this browser');
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      this.permission = permission;
      return permission === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }

  // Check if notifications are enabled
  isEnabled() {
    return this.isSupported && this.permission === 'granted';
  }

  // Play Allahu Akbar sound once
  playAllahuAkbarOnce() {
    const audio = new Audio();
    
    // Try to use a proper Islamic audio file
    const audioSources = [
      '/audio/takbir.mp3', // Primary source - existing file
      '/audio/allahu-akbar.mp3',
      'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' // Fallback
    ];
    
    let currentSourceIndex = 0;
    
    const playSound = () => {
      if (currentSourceIndex < audioSources.length) {
        audio.src = audioSources[currentSourceIndex];
        audio.volume = 0.8;
        
        // Play the sound once
        audio.play().catch(() => {
          // If play fails, try next source
          currentSourceIndex++;
          if (currentSourceIndex < audioSources.length) {
            playSound();
          }
        });
      }
    };
    
    playSound();
    return audio;
  }

  // Show prayer time notification with enhanced features
  showPrayerNotification(prayerName, time) {
    if (!this.isEnabled()) {
      console.log('Notifications not enabled');
      return null;
    }

    // Enhanced message with "Allah is calling you"
    const messages = {
      'Fajr': `🕌 Allahu Akbar! Allah is calling you for Fajr prayer at ${time}`,
      'Dhuhr': `🕌 Allahu Akbar! Allah is calling you for Dhuhr prayer at ${time}`,
      'Asr': `🕌 Allahu Akbar! Allah is calling you for Asr prayer at ${time}`,
      'Maghrib': `🕌 Allahu Akbar! Allah is calling you for Maghrib prayer at ${time}`,
      'Isha': `🕌 Allahu Akbar! Allah is calling you for Isha prayer at ${time}`,
    };

    const message = messages[prayerName] || `🕌 Allahu Akbar! Allah is calling you for ${prayerName} prayer at ${time}`;

    try {
      // Close any existing prayer notifications
      this.closePrayerNotifications();

      // Play Allahu Akbar sound once
      this.playAllahuAkbarOnce();

      const notification = new Notification('🕌 Prayer Time - Allah is Calling You', {
        body: message,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'prayer-notification',
        requireInteraction: true,
        silent: false,
        data: {
          prayer: prayerName,
          time: time,
          timestamp: Date.now()
        }
      });

      // Add click handler
      notification.onclick = () => {
        window.focus();
        notification.close();
        // You can add navigation logic here
        // window.location.href = '/prayer-times';
      };

      // Store notification reference
      this.notifications.set(prayerName, notification);

      // Auto-close after 5 minutes
      setTimeout(() => {
        this.closeNotification(prayerName);
      }, 5 * 60 * 1000);

      return notification;
    } catch (error) {
      console.error('Error showing notification:', error);
      return null;
    }
  }

  // Show reminder notification (5 minutes before prayer) with enhanced features
  showPrayerReminder(prayerName, time) {
    if (!this.isEnabled()) return null;

    const message = `⏰ Prayer Reminder: Allah is calling you for ${prayerName} prayer in 5 minutes (${time})`;

    try {
      // Play Allahu Akbar sound once for reminder
      this.playAllahuAkbarOnce();

      const notification = new Notification('⏰ Prayer Reminder - Allah is Calling You', {
        body: message,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: `reminder-${prayerName}`,
        requireInteraction: false,
        silent: false
      });

      // Auto-close after 2 minutes
      setTimeout(() => {
        notification.close();
      }, 2 * 60 * 1000);

      return notification;
    } catch (error) {
      console.error('Error showing reminder:', error);
      return null;
    }
  }

  // Close specific notification
  closeNotification(prayerName) {
    const notification = this.notifications.get(prayerName);
    if (notification) {
      notification.close();
      this.notifications.delete(prayerName);
    }
  }

  // Close all prayer notifications
  closePrayerNotifications() {
    this.notifications.forEach((notification, prayerName) => {
      notification.close();
    });
    this.notifications.clear();
  }

  // Schedule prayer notifications for the day
  schedulePrayerNotifications(prayerTimes) {
    if (!this.isEnabled()) return;

    const now = new Date();
    const today = now.toISOString().slice(0, 10);

    Object.entries(prayerTimes).forEach(([prayer, time]) => {
      if (prayer === 'Sunrise') return; // Skip sunrise

      const [hours, minutes] = time.split(':').map(Number);
      const prayerTime = new Date(`${today}T${time}`);
      
      // Only schedule if prayer time is in the future
      if (prayerTime > now) {
        // Schedule main notification
        const timeUntilPrayer = prayerTime.getTime() - now.getTime();
        
        setTimeout(() => {
          this.showPrayerNotification(prayer, time);
        }, timeUntilPrayer);

        // Schedule reminder (5 minutes before)
        const reminderTime = timeUntilPrayer - (5 * 60 * 1000);
        if (reminderTime > 0) {
          setTimeout(() => {
            this.showPrayerReminder(prayer, time);
          }, reminderTime);
        }
      }
    });
  }

  // Show general notification
  showNotification(title, message, options = {}) {
    if (!this.isEnabled()) return null;

    const defaultOptions = {
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      requireInteraction: false,
      silent: false
    };

    try {
      const notification = new Notification(title, {
        ...defaultOptions,
        ...options,
        body: message
      });

      return notification;
    } catch (error) {
      console.error('Error showing notification:', error);
      return null;
    }
  }

  // Get notification status
  getStatus() {
    return {
      supported: this.isSupported,
      permission: this.permission,
      enabled: this.isEnabled(),
      activeNotifications: this.notifications.size
    };
  }
}

// Create singleton instance
const notificationService = new NotificationService();

export default notificationService; 