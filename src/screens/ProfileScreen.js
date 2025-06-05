// /src/screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../hooks/useAuth';

export default function ProfileScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.text}>{user?.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginTop: 5,
  },
});
