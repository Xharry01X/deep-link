import { View, Text } from 'react-native';
import Button from '@/components/Button';
import { displayLocalNotification } from '@/utils/notifications';

export default function Chat() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Chat Screen</Text>
      <Button
        title="Trigger Local Notification"
        onPress={displayLocalNotification}
      />
    </View>
  );
}