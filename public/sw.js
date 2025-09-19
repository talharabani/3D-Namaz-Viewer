// Service Worker for Daily Dua Notifications
const CACHE_NAME = 'namaz-web-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        return fetch(event.request)
          .then((fetchResponse) => {
            // Clone the response before caching
            const responseToCache = fetchResponse.clone();
            
            // Cache the response for future use
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return fetchResponse;
          })
          .catch((error) => {
            console.error('Fetch failed:', error);
            // Return a basic response for failed requests
            return new Response('Network error', {
              status: 408,
              statusText: 'Request Timeout',
              headers: {
                'Content-Type': 'text/plain'
              }
            });
          });
      })
      .catch((error) => {
        console.error('Cache match failed:', error);
        // Return a basic response for cache errors
        return new Response('Cache error', {
          status: 500,
          statusText: 'Internal Server Error',
          headers: {
            'Content-Type': 'text/plain'
          }
        });
      })
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const action = event.action;
  const data = event.notification.data;

  if (action === 'view') {
    // Open the app to the specific dua
    event.waitUntil(
      clients.openWindow(data.url || '/duas/daily')
    );
  } else if (action === 'bookmark') {
    // Handle bookmark action
    event.waitUntil(
      clients.matchAll().then((clients) => {
        if (clients.length > 0) {
          clients[0].postMessage({
            type: 'BOOKMARK_DUA',
            dua: data.dua
          });
        }
      })
    );
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Background sync for notifications
self.addEventListener('sync', (event) => {
  if (event.tag === 'daily-dua-sync') {
    event.waitUntil(
      // Handle background sync for daily dua notifications
      handleDailyDuaSync()
    );
  }
});

// Handle daily dua sync
async function handleDailyDuaSync() {
  try {
    // This would typically fetch the daily dua from your API
    // For now, we'll just log it
    console.log('Syncing daily dua notification');
  } catch (error) {
    console.error('Error syncing daily dua:', error);
  }
}

// Push event for push notifications
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: data.icon || '/src/assets/logo.png',
      badge: data.badge || '/src/assets/badge.png',
      tag: data.tag || 'daily-dua',
      requireInteraction: true,
      actions: data.actions || [
        {
          action: 'view',
          title: 'View Dua',
          icon: '/src/assets/view-icon.png'
        },
        {
          action: 'bookmark',
          title: 'Bookmark',
          icon: '/src/assets/bookmark-icon.png'
        }
      ],
      data: data.data || {}
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});