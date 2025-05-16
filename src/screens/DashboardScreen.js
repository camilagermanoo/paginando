import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

const DashboardScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://www.googleapis.com/books/v1/volumes?q=react')
      .then(res => res.json())
      .then(data => {
        setBooks(data.items);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Detalhes', { book: item })}>
          <View style={{ padding: 16, borderBottomWidth: 1 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.volumeInfo.title}</Text>
            <Text>{item.volumeInfo.authors?.join(', ')}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default DashboardScreen;
