import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator'; 
import BookDetailScreen from '../screens/BookDetailScreen'; 
import ConfirmLogoutScreen from '../screens/ConfirmLogoutScreen'; 

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Drawer" 
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookDetail"
        component={BookDetailScreen}
        options={{ title: 'Detalhes do Livro' }}
      />
      <Stack.Screen
        name="ConfirmLogout"
        component={ConfirmLogoutScreen}
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}