import axios from '../api/apiconfig';

// Convert VAPID key from base64 to Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Register service worker and subscribe to push notifications
export async function initializePushNotifications() {
  try {
    // Check if service workers and push notifications are supported
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.log('Push notifications not supported');
      return { success: false, message: 'Push notifications not supported' };
    }

    // Request notification permission
    const permission = await Notification.requestPermission();
    console.log('Notification permission:', permission);
    
    if (permission !== 'granted') {
      console.log('Notification permission denied');
      return { success: false, message: 'Notification permission denied' };
    }

    // Register service worker
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered:', registration);

    // Wait for service worker to be ready
    await navigator.serviceWorker.ready;
    console.log('Service Worker is ready');

    // Get VAPID public key from server
    const { data } = await axios.get('/api/notifications/vapid-public-key');
    const vapidPublicKey = data.publicKey;
    console.log('Got VAPID public key');

    // Check for existing subscription first
    let subscription = await registration.pushManager.getSubscription();
    
    if (!subscription) {
      try {
        // Subscribe to push notifications
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
        });
        console.log('New push subscription created:', subscription);
      } catch (subscribeError) {
        console.error('Subscribe error:', subscribeError);
        // If push service fails, still allow app to work
        return { success: false, message: 'Push service unavailable - try Firefox or enable in chrome://flags' };
      }
    } else {
      console.log('Existing subscription found:', subscription);
    }

    // Send subscription to server
    await axios.post('/api/notifications/subscribe', subscription.toJSON());
    console.log('Subscription sent to server');

    return { success: true, message: 'Subscribed to push notifications' };

  } catch (error) {
    console.error('Error initializing push notifications:', error);
    return { success: false, message: error.message };
  }
}

// Check if already subscribed
export async function checkSubscription() {
  try {
    if (!('serviceWorker' in navigator)) {
      return false;
    }

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    return !!subscription;
  } catch (error) {
    console.error('Error checking subscription:', error);
    return false;
  }
}

// Unsubscribe from push notifications
export async function unsubscribePushNotifications() {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    
    if (subscription) {
      await subscription.unsubscribe();
      console.log('Unsubscribed from push notifications');
      return { success: true };
    }
    return { success: false, message: 'No subscription found' };
  } catch (error) {
    console.error('Error unsubscribing:', error);
    return { success: false, message: error.message };
  }
}
