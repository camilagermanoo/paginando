// /src/components/BookItem.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function BookItem({ book, onPress }) {
  const { title, authors, imageLinks } = book.volumeInfo;
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      {imageLinks?.thumbnail && (
        <Image source={{ uri: imageLinks.thumbnail }} style={styles.image} />
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        {authors && <Text style={styles.authors}>{authors.join(', ')}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginVertical: 8,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  image: {
    width: 60,
    height: 90,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  authors: {
    marginTop: 5,
    color: '#555',
  },
});
