// /src/navigation/StackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import BookDetailScreen from '../screens/BookDetailScreen';
import LoginScreen from '../screens/LoginScreen';
import { useAuth } from '../hooks/useAuth';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Detalhes" component={BookDetailScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}
