import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebaseConfig';

const ProfileScreen = ({ navigation }) => {
  const user = auth.currentUser;

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigation.replace('LoginScreen');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
      Alert.alert('Erro', 'Não foi possível sair. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.label}>Email: {user?.email || 'Não disponível'}</Text>
      <Text style={styles.label}>Nome: {user?.displayName || 'Não informado'}</Text>
      <Button title="Sair" onPress={handleSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },
  label: { fontSize: 16, marginBottom: 10 },
});

export default ProfileScreen;
