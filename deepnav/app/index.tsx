import { View, Text, Button } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the Messaging App</Text>
      <Link href="/messages" asChild>
        <Button title="Go to Messages" />
      </Link>
    </View>
  );
}