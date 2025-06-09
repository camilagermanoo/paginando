// /src/screens/FavoriteBooksScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import { useFavoriteBooks } from '../hooks/useFavoriteBooks';

export default function FavoriteBooksScreen() {
  const { favorites } = useFavoriteBooks();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = favorites.filter((book) =>
    book.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );


  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Nenhum livro favoritado ainda.</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar livro..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        style={styles.list}
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>{item.author || 'Autor desconhecido'}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontSize: 16,
    color: '#666',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  list: {
    flex: 1,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: '#555',
  },
});