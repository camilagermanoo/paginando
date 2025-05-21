// src/screens/DashboardScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';

const DashboardScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://www.googleapis.com/books/v1/volumes?q=cakes')
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
    <FlatList
      data={books}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: { paddingBottom: 16 },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: { fontWeight: 'bold', fontSize: 16 },
});

export default DashboardScreen;
