// src/screens/FavoriteBooksScreen.js
// Tela de Livros Favoritos

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { onFavoriteBooksChange } from '../services/FirestoreService';
import BookCard from '../components/BookCard';
import LoadingIndicator from '../components/LoadingIndicator';
import useLoading from '../hooks/useLoading';

const FavoriteBooksScreen = ({ navigation }) => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const { loading, error, callWithLoading } = useLoading(); // Embora não haja chamadas diretas de API aqui, mantemos o hook para consistência

  useEffect(() => {
    // Observa os livros favoritos em tempo real
    const unsubscribe = onFavoriteBooksChange((books) => {
      setFavoriteBooks(books);
    });
    return unsubscribe; // Limpa o observador ao desmontar
  }, []);

  // Lida com a navegação para a tela de detalhes do livro
  const handleBookPress = (book) => {
    navigation.navigate('BookDetail', { book });
  };

  if (loading) {
    return <LoadingIndicator message="Carregando favoritos..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Livros favoritos</Text>
      </View>

      {favoriteBooks.length > 0 ? (
        <FlatList
          data={favoriteBooks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BookCard book={item} onPress={handleBookPress} />}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.noFavoritesContainer}>
          <Text style={styles.noFavoritesText}>Você ainda não tem livros favoritos.</Text>
        </View>
      )}

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
  listContent: {
    paddingBottom: 20,
  },
  noFavoritesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFavoritesText: {
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default FavoriteBooksScreen;
