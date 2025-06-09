import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';

export default function ConfirmLogoutScreen() {
  const navigation = useNavigation();
  const { logout } = useAuth();

  const handleConfirmLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Image
        source={require('../../assets/logout.png')} 
        style={styles.illustration}
        resizeMode="contain"
      />

      <Text style={styles.question}>Tem certeza que deseja sair?</Text>

      <TouchableOpacity
        style={[styles.button, styles.noButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Não</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.yesButton]}
        onPress={handleConfirmLogout}
      >
        <Text style={styles.buttonText}>Sim</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 24,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 24,
    zIndex: 1,
  },
  backText: {
    fontSize: 28,
    color: '#000',
  },
  illustration: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  noButton: {
    backgroundColor: '#95bcf7',
  },
  yesButton: {
    backgroundColor: '#73a9f7',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});