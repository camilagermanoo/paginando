import React, { useEffect, useState } from 'react';
import {View, FlatList, Text, TouchableOpacity, ActivityIndicator, Alert, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DashboardScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://www.googleapis.com/books/v1/volumes?q=mouse')
      .then(res => res.json())
      .then(data => {
        setBooks(data.items || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        Alert.alert('Erro', 'Não foi possível carregar os livros.');
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => {
    const volume = item.volumeInfo;

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detalhes', { book: item })}
        style={styles.itemContainer}
      >
        <Text style={styles.title}>{volume?.title || 'Título desconhecido'}</Text>
        <Text>{volume?.authors?.join(', ') || 'Autor desconhecido'}</Text>
      </TouchableOpacity>
    );
  };

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={{ flex: 1 }}>
      {/* Topo com barra de busca */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={16} color="#888" style={styles.searchIcon} />
          <TextInput
            placeholder="Procure seu livro aqui"
            style={styles.searchInput}
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Lista de livros */}
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    flex: 1,
    height: 36,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  listContainer: {
    paddingBottom: 16,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default DashboardScreen;
