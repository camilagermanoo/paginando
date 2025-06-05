// /src/screens/DashboardScreen.js
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import useBooks from '../hooks/useBooks';
import BookItem from '../components/BookItem';
import Loader from '../components/Loader';

export default function DashboardScreen({ navigation }) {
  const { books, loading } = useBooks();

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <BookItem
            book={item}
            onPress={() => navigation.navigate('Detalhes', { book: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
