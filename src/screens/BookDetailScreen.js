// /src/screens/BookDetailScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function BookDetailScreen({ route }) {
  const { book } = route.params;
  const { title, authors, description, imageLinks } = book.volumeInfo;

  return (
    <ScrollView style={styles.container}>
      {imageLinks?.thumbnail && (
        <Image source={{ uri: imageLinks.thumbnail }} style={styles.image} />
      )}
      <Text style={styles.title}>{title}</Text>
      {authors && <Text style={styles.authors}>{authors.join(', ')}</Text>}
      <Text style={styles.description}>{description || 'Sem descrição disponível.'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  image: {
    width: 150,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
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
  },
});
