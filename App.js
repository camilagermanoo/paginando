import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './src/hooks/useAuth';
import { FavoriteBooksProvider } from './src/hooks/useFavoriteBooks';
import LoginScreen from './src/screens/LoginScreen';
import { ActivityIndicator, View } from 'react-native';
import MainStackNavigator from './src/navigation/MainStackNavigator';

function Main() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <MainStackNavigator /> : <LoginScreen />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <FavoriteBooksProvider>
        <Main />
      </FavoriteBooksProvider>
    </AuthProvider>
  );
}
