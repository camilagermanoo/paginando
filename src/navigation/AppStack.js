import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import BookDetailScreen from '../screens/BookDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ConfirmLogoutScreen from '../screens/ConfirmLogoutScreen';

const AppStack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
      <AppStack.Screen name="BookDetail" component={BookDetailScreen} options={{ headerShown: false }} />
      <AppStack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <AppStack.Screen name="ConfirmLogout" component={ConfirmLogoutScreen} options={{ headerShown: false }} />
    </AppStack.Navigator>
  );
}