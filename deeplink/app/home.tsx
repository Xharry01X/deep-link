import { View, Text } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Link href="/chat">Go to Chat</Link>
    </View>
  );
}