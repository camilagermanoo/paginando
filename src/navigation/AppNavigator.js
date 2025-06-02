// src/navigation/AppNavigator.js
// Configuração da navegação do aplicativo (Stack e Drawer)

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'; // Para ícones no Drawer

// Importa as telas
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import BookDetailScreen from '../screens/BookDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FavoriteBooksScreen from '../screens/FavoriteBooksScreen';
import LogoutScreen from '../screens/LogoutScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Stack Navigator principal para as telas autenticadas
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="FavoriteBooks" component={FavoriteBooksScreen} />
      <Stack.Screen name="Logout" component={LogoutScreen} />
    </Stack.Navigator>
  );
};

// Drawer Navigator para a navegação principal
const AppDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false, // Oculta o cabeçalho padrão do Drawer
        drawerActiveTintColor: '#007BFF', // Cor do item ativo no Drawer
        drawerInactiveTintColor: '#333',  // Cor do item inativo no Drawer
        drawerLabelStyle: {
          marginLeft: -20, // Ajusta o espaçamento do texto do label
          fontSize: 16,
        },
      }}
    >
      <Drawer.Screen
        name="Início"
        component={HomeStack} // Usa a HomeStack como componente para o item "Início"
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Livros favoritos"
        component={FavoriteBooksScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Sair"
        component={LogoutScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

// Stack Navigator raiz para controlar o fluxo de autenticação
const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="HomeDrawer" component={AppDrawer} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
