import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { useFavoriteBooks } from '../hooks/useFavoriteBooks';
import { useNavigation } from '@react-navigation/native';

export default function FavoriteBooksScreen() {
  const { favorites } = useFavoriteBooks();
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const filteredBooks = favorites.filter((book) =>
    book.volumeInfo?.title?.toLowerCase().includes(searchQuery.toLowerCase())
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
        renderItem={({ item }) => {
          // Acesse volumeInfo de 'item'
          const info = item.volumeInfo;
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('BookDetail', { book: item })}
            >
              <View style={styles.item}>
                {info?.imageLinks?.thumbnail && (
                  <Image
                    source={{ uri: info.imageLinks.thumbnail }}
                    style={styles.thumbnail}
                  />
                )}
                <View style={styles.details}>
                  <Text style={styles.title}>{info?.title || 'Sem título'}</Text>
                  <Text style={styles.author}>
                    {info?.authors?.join(', ') || 'Autor desconhecido'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  thumbnail: {
    width: 60,
    height: 90,
    borderRadius: 4,
    backgroundColor: '#eee',
    marginRight: 12,
  },
  details: {
    flex: 1,
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