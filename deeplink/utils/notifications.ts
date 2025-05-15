import notifee from '@notifee/react-native';
import * as Notifications from 'expo-notifications';

export async function setupNotifications() {
  await notifee.createChannel({ id: 'default', name: 'Default Channel' });
  const { status } = await Notifications.requestPermissionsAsync();
  if (status === 'granted') {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo Push Token:', token);
    return token;
  }
  return null;
}

export async function displayLocalNotification() {
  await notifee.displayNotification({
    title: 'New Message',
    body: 'You have a new message in your chat!',
    android: { channelId: 'default' },
  });
}