// src/screens/ProfileScreen.js
// Tela de Perfil do Usuário

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { onUserProfileChange, onFavoriteBooksChange, saveUserProfile } from '../services/FirestoreService';
import { auth } from '../../firebaseConfig';
import LoadingIndicator from '../components/LoadingIndicator';
import useLoading from '../hooks/useLoading';

const ProfileScreen = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [favoriteBooksCount, setFavoriteBooksCount] = useState(0);
  const { loading, error, callWithLoading } = useLoading();

  useEffect(() => {
    // Observa o perfil do usuário
    const unsubscribeProfile = onUserProfileChange((profile) => {
      setUserProfile(profile);
      // Se o perfil não existir, cria um perfil inicial
      if (!profile && auth.currentUser) {
        callWithLoading(saveUserProfile, {
          email: auth.currentUser.email,
          name: 'Nome do Usuário', // Nome padrão
          favoriteBooks: []
        });
      }
    });

    // Observa a contagem de livros favoritos
    const unsubscribeFavorites = onFavoriteBooksChange((books) => {
      setFavoriteBooksCount(books.length);
    });

    return () => {
      unsubscribeProfile();
      unsubscribeFavorites();
    };
  }, []);

  if (loading || !userProfile) {
    return <LoadingIndicator message="Carregando perfil..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Seu perfil</Text>
      </View>

      <View style={styles.profileCard}>
        <Image
          source={{ uri: 'https://placehold.co/150x150/E0E0E0/333333?text=Profile' }} // Imagem de perfil
          style={styles.profileImage}
        />
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userProfile.email || 'N/A'}</Text>

        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{userProfile.name || 'N/A'}</Text>

        <Text style={styles.label}>Total de livros favoritados:</Text>
        <Text style={styles.value}>{favoriteBooksCount}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('FavoriteBooks')}
        >
          <Text style={styles.buttonText}>Ver Livros Favoritos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={() => navigation.navigate('Logout')}
        >
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.errorText}>Erro: {error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderColor: '#007BFF',
    borderWidth: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#DC3545', // Cor para o botão de sair
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ProfileScreen;