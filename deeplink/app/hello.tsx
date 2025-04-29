import { View, Text } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

export default function HelloScreen() {
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello World!</Text>
    </ThemedView>
  );
}