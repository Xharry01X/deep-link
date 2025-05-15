import { View, Text } from 'react-native';
import NotificationHandler from '../components/NotificationHandler';
import { Stack } from 'expo-router';

export default function App() {
  return (
    <>
      <Stack />
      <NotificationHandler />
    </>
  );
}