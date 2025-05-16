import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const BookDetailScreen = ({ route }) => {
  const { book } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{book.volumeInfo.title}</Text>
      {book.volumeInfo.imageLinks?.thumbnail && (
        <Image source={{ uri: book.volumeInfo.imageLinks.thumbnail }} style={styles.image} />
      )}
      <Text style={styles.text}>{book.volumeInfo.description || 'Sem descrição.'}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  image: { width: 120, height: 180, marginBottom: 10 },
  text: { fontSize: 16 }
});

export default BookDetailScreen;
