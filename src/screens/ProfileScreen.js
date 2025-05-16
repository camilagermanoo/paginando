import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import useUserData from '../hooks/useUserData';

const ProfileScreen = () => {
  const user = auth().currentUser;
  const userData = useUserData();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text>Email: {user.email}</Text>
      <Text>Nome: {userData?.name || 'Não informado'}</Text>
      <Button title="Sair" onPress={() => auth().signOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20 }
});

export default ProfileScreen;
