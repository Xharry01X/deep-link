import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import notifee, { EventType } from '@notifee/react-native';
import { useRouter } from 'expo-router';
import { setupNotifications } from '../utils/notifications';

export default function NotificationHandler() {
  const router = useRouter();

  useEffect(() => {
    // Initialize notifications and get push token
    setupNotifications().catch((error) =>
      console.error('Failed to setup notifications:', error)
    );

    // Handle foreground notifications (when app is open)
    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('Foreground notification received:', notification);
        // Optionally trigger a Notifee local notification for customization
        notifee
          .displayNotification({
            title: notification.request.content.title || 'New Message',
            body: notification.request.content.body || 'You have a new message!',
            android: { channelId: 'default' },
          })
          .catch((error) =>
            console.error('Failed to display foreground notification:', error)
          );
      }
    );

    // Handle notification taps (background or closed app)
    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('Notification response:', response);
        // Navigate to chat screen when notification is tapped
        router.push('/chat');
      });

    // Notifee background event handler
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      console.log('Background event:', type, detail);
      if (type === EventType.PRESS) {
        // Navigate to chat screen on notification press
        router.push('/chat');
      }
    });

    // Cleanup subscriptions on unmount
    return () => {
      foregroundSubscription.remove();
      responseSubscription.remove();
    };
  }, [router]);

  // This component doesn't render UI
  return null;
}