import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, ActivityIndicator } from 'react-native';

import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import BookDetailScreen from './src/screens/BookDetailScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { auth } from './src/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Início" component={DashboardScreen} />
    <Drawer.Screen name="Perfil" component={ProfileScreen} />
  </Drawer.Navigator>
);

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (initializing) setInitializing(false);
    });
    return unsubscribe;
  }, []);

  if (initializing) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="Drawer" component={DrawerNavigation} />
            <Stack.Screen name="Detalhes" component={BookDetailScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
