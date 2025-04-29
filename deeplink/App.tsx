import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';

export default function App() {
  return (
    <NavigationContainer
      linking={{
        prefixes: ['myapp://'], 
        config: {
          screens: {
            Home: 'home',  
            Hello: 'hello', 
          },
        },
      }}
    >
      <RootNavigator /> 
    </NavigationContainer>
  );
}