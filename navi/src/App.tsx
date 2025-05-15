import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Navigation } from './navigation';

Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/newspaper.png'),
  require('./assets/bell.png'),
]);

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <Navigation
      linking={{
        enabled: 'auto',
        prefixes: [
          'navi://', // This should match your scheme in app.json
        ],
        config: {
          screens: {
            // Add your screen configuration here
            // Example:
            Home: '',
            Profile: 'profile',
            Settings: 'settings',
            // For nested navigators:
            Main: {
              screens: {
                Feed: 'feed',
                Notifications: 'notifications',
              },
            },
          },
        },
      }}
      onReady={() => {
        SplashScreen.hideAsync();
      }}
    />
  );
}