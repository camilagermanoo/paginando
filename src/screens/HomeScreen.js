// src/screens/HomeScreen.js
// Tela Principal (Dashboard)

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Para ícones
import { searchBooks } from '../services/BookService';
import BookCard from '../components/BookCard';
import LoadingIndicator from '../components/LoadingIndicator';
import useLoading from '../hooks/useLoading';

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const { loading, error, callWithLoading } = useLoading();

  // Função para buscar livros
  const fetchBooks = async (query) => {
    if (!query) {
      setBooks([]);
      return;
    }
    try {
      const fetchedBooks = await callWithLoading(searchBooks, query);
      setBooks(fetchedBooks);
    } catch (err) {
      console.error("Erro ao buscar livros na tela inicial:", err);
      // O erro já é tratado pelo useLoading, mas podemos exibir uma mensagem ao usuário aqui
      alert("Erro ao carregar livros. Tente novamente.");
    }
  };

  // Efeito para buscar livros quando a tela é montada ou a query muda
  useEffect(() => {
    fetchBooks('react native'); // Busca inicial de livros
  }, []);

  // Lida com a navegação para a tela de detalhes do livro
  const handleBookPress = (book) => {
    navigation.navigate('BookDetail', { book });
  };

  if (loading) {
    return <LoadingIndicator message="Buscando livros..." />;
  }

  return (
    <View style={styles.container}>
      {/* Barra de pesquisa */}
      <View style={styles.searchBarContainer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.drawerIcon}>
          <Ionicons name="menu" size={28} color="#333" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Procure seu livro aqui"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => fetchBooks(searchQuery)} // Busca ao pressionar Enter
        />
        <TouchableOpacity onPress={() => fetchBooks(searchQuery)} style={styles.searchIcon}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Lista de livros */}
      {books.length > 0 ? (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BookCard book={item} onPress={handleBookPress} />}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.noBooksContainer}>
          <Text style={styles.noBooksText}>Nenhum livro encontrado. Tente outra pesquisa.</Text>
        </View>
      )}

      {error && <Text style={styles.errorText}>Erro: {error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 16,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  drawerIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  searchIcon: {
    padding: 8,
  },
  listContent: {
    paddingBottom: 20,
  },
  noBooksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBooksText: {
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default HomeScreen;