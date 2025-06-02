// src/components/BookCard.js
// Componente para exibir um card de livro na lista

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const BookCard = ({ book, onPress }) => {
  const imageUrl = book.volumeInfo.imageLinks?.thumbnail || 'https://placehold.co/128x192/000000/FFFFFF?text=Sem+Capa';

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(book)}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>{book.volumeInfo.title}</Text>
        <Text style={styles.author} numberOfLines={1}>
          Autor: {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Desconhecido'}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {book.volumeInfo.description || 'Sem descrição disponível.'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 120,
    borderRadius: 5,
    marginRight: 10,
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#777',
  },
});

export default BookCard;
