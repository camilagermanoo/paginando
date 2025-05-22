import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const BookDetailScreen = ({ route }) => {
  const { book } = route.params;
  const info = book.volumeInfo || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{info.title || 'Sem título'}</Text>
      {info.imageLinks?.thumbnail && (
        <Image source={{ uri: info.imageLinks.thumbnail }} style={styles.image} resizeMode="contain" />
      )}
      <Text>Autor: {info.authors?.join(', ') || 'Desconhecido'}</Text>
      <Text>Editora: {info.publisher || 'Não informado'}</Text>
      <Text>Publicado em: {info.publishedDate || 'Data não disponível'}</Text>
      <Text style={styles.text}>{info.description || 'Sem descrição.'}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    textAlign: 'center' 
  },
  image: { 
    width: 150, 
    height: 220, 
    marginBottom: 10 
  },
  text: { 
    fontSize: 16, 
    textAlign: 'justify', 
    marginTop: 10 
  },
});

export default BookDetailScreen;
