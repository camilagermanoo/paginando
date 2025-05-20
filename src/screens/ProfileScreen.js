import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig';
import useUserData from '../hooks/useUserData';

const ProfileScreen = () => {
  const user = auth.currentUser;
  const userData = useUserData();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      console.log('Usuário deslogado com sucesso');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text>Email: {user?.email || 'Não disponível'}</Text>
      <Text>Nome: {userData?.name || 'Não informado'}</Text>
      <Button title="Sair" onPress={handleSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20 }
});

export default ProfileScreen;
