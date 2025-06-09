import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useFavoriteBooks } from '../hooks/useFavoriteBooks';

export default function BookDetailScreen({ route }) {
  const { book } = route.params;
  const { id, volumeInfo } = book;
  const { title, authors, description, imageLinks } = volumeInfo;

  const { favorites, toggleFavorite } = useFavoriteBooks();
  const isFavorite = favorites.some((fav) => fav.id === id);

  return (
    <ScrollView style={styles.container}>
      {imageLinks?.thumbnail && (
        <Image source={{ uri: imageLinks.thumbnail }} style={styles.image} />
      )}

      <Text style={styles.title}>{title}</Text>

      {authors && (
        <Text style={styles.authors}>{authors.join(', ')}</Text>
      )}

      <Text style={styles.description}>
        {description || 'Sem descrição disponível.'}
      </Text>

      <TouchableOpacity
        onPress={() => toggleFavorite(book)}
        style={[
          styles.favoriteButton,
          isFavorite ? styles.removeButton : styles.addButton,
        ]}
      >
        <Text style={styles.favoriteButtonText}>
          {isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
  image: {
    width: 150,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  authors: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
  },
  favoriteButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addButton: {
    backgroundColor: '#007bff',
  },
  removeButton: {
    backgroundColor: '#dc3545',
  },
  favoriteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
