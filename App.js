// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/hooks/useAuth';
import DrawerNavigator from './src/navigation/DrawerNavigator';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
