import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchBooks } from '../services/api';

export default function DashboardScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        setLoading(true);
        fetchBooks(searchQuery)
          .then(setBooks)
          .catch(() => setBooks([]))
          .finally(() => setLoading(false));
      } else {
        setBooks([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar livro..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {loading ? (
        <Text style={styles.message}>Carregando...</Text>
      ) : books.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.message}>Nenhum livro encontrado.</Text>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
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
      )}
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
    textAlign: 'center',
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
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: '#555',
  },
});
