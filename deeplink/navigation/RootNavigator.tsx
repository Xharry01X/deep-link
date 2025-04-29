import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@/screens/HomeScreen';
import HelloWorldScreen from '@/screens/HelloWorldScreen';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Hello" component={HelloWorldScreen} />
    </Stack.Navigator>
  );
}