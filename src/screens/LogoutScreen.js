// src/screens/LogoutScreen.js
// Tela de Confirmação de Saída

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { logoutUser } from '../services/AuthService';
import LoadingIndicator from '../components/LoadingIndicator';
import useLoading from '../hooks/useLoading';

const LogoutScreen = ({ navigation }) => {
  const { loading, error, callWithLoading } = useLoading();

  // Função para lidar com o logout
  const handleLogout = async () => {
    try {
      await callWithLoading(logoutUser);
      // Após o logout, o onAuthChange em AuthScreen deve redirecionar para a tela de login
      navigation.replace('Auth');
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
      alert("Não foi possível sair. Tente novamente.");
    }
  };

  if (loading) {
    return <LoadingIndicator message="Saindo..." />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#333" />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.questionText}>Tem certeza que deseja sair?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Não</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleLogout}>
            <Text style={styles.buttonText}>Sim</Text>
          </TouchableOpacity>
        </View>
      </View>
      {error && <Text style={styles.errorText}>Erro: {error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    padding: 5,
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: '#6C757D', // Cor para "Não"
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginHorizontal: 10,
  },
  confirmButton: {
    backgroundColor: '#DC3545', // Cor para "Sim"
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default LogoutScreen;