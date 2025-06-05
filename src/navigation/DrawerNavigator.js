// /src/navigation/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import { useAuth } from '../hooks/useAuth';
import { Button } from 'react-native';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { logout } = useAuth();

  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Início" component={StackNavigator} />
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
      <Drawer.Screen
        name="Sair"
        component={() => <Button title="Sair" onPress={logout} />}
      />
    </Drawer.Navigator>
  );
}
