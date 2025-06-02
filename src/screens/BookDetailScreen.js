// src/screens/BookDetailScreen.js
// Tela de Detalhes do Livro

import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { addBookToFavorites, removeBookFromFavorites, onFavoriteBooksChange } from '../services/FirestoreService';
import LoadingIndicator from '../components/LoadingIndicator';
import useLoading from '../hooks/useLoading';

const BookDetailScreen = ({ route, navigation }) => {
  const { book } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const { loading, error, callWithLoading } = useLoading();

  const imageUrl = book.volumeInfo.imageLinks?.thumbnail || 'https://placehold.co/128x192/000000/FFFFFF?text=Sem+Capa';
  const description = book.volumeInfo.description || 'Sem descrição disponível.';

  useEffect(() => {
    // Observa mudanças nos livros favoritos para atualizar o estado `isFavorite`
    const unsubscribe = onFavoriteBooksChange((favoriteBooks) => {
      const found = favoriteBooks.some(favBook => favBook.id === book.id);
      setIsFavorite(found);
    });
    return unsubscribe; // Limpa o observador
  }, [book.id]);

  // Função para adicionar/remover dos favoritos
  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await callWithLoading(() => removeBookFromFavorites(book));
      } else {
        await callWithLoading(() => addBookToFavorites(book));
      }
    } catch (err) {
      console.error("Erro ao alternar favorito:", err);
      alert("Não foi possível atualizar os favoritos. Tente novamente.");
    }
  };

  if (loading) {
    return <LoadingIndicator message="Atualizando favoritos..." />;
  }

  return (
    <View style={styles.container}>
      {/* Botão de voltar e ícone de favorito */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
          <Ionicons
            name={isFavorite ? "star" : "star-outline"}
            size={30}
            color={isFavorite ? "#FFD700" : "#888"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: imageUrl }} style={styles.bookImage} />
        <Text style={styles.title}>{book.volumeInfo.title}</Text>
        <Text style={styles.author}>
          Autor: {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Desconhecido'}
        </Text>
        <Text style={styles.description}>{description}</Text>
      </ScrollView>

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
    justifyContent: 'space-between',
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
  },
  favoriteButton: {
    padding: 5,
  },
  scrollContent: {
    alignItems: 'center',
    padding: 20,
  },
  bookImage: {
    width: 180,
    height: 270,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  author: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    textAlign: 'justify',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default BookDetailScreen;
