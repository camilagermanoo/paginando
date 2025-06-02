// src/screens/AuthScreen.js
// Tela de Login e Registro

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { registerUser, loginUser, onAuthChange } from '../services/AuthService';
import LoadingIndicator from '../components/LoadingIndicator';
import useLoading from '../hooks/useLoading';

const AuthScreen = ({ navigation }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // Para exibir mensagens de erro/sucesso
  const { loading, error, callWithLoading } = useLoading();

  useEffect(() => {
    // Observa mudanças no estado de autenticação
    const unsubscribe = onAuthChange((user) => {
      if (user) {
        // Se o usuário estiver logado, navega para a tela principal
        navigation.replace('HomeDrawer');
      }
    });
    return unsubscribe; // Limpa o observador ao desmontar o componente
  }, [navigation]);

  // Função para lidar com o registro de usuário
  const handleAuth = async () => {
    setMessage(''); // Limpa mensagens anteriores
    try {
      if (isRegistering) {
        await callWithLoading(registerUser, email, password);
        setMessage('Cadastro realizado com sucesso! Faça login.');
        setIsRegistering(false); // Volta para a tela de login
      } else {
        await callWithLoading(loginUser, email, password);
        // A navegação para 'HomeDrawer' é tratada pelo useEffect no onAuthChange
      }
    } catch (err) {
      // O erro já é capturado e definido pelo useLoading hook
      setMessage(error?.message || 'Ocorreu um erro. Tente novamente.');
    }
  };

  if (loading) {
    return <LoadingIndicator message={isRegistering ? "Registrando..." : "Entrando..."} />;
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.paginatingText}>Paginando</Text>
          <Image
            source={{ uri: 'https://placehold.co/150x150/E0E0E0/333333?text=User' }} // Placeholder para a imagem do usuário
            style={styles.profileImage}
          />
          <Text style={styles.title}>
            {isRegistering ? 'Crie sua conta' : 'Entre na sua conta'}
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#888"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {message ? <Text style={styles.messageText}>{message}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleAuth}>
            <Text style={styles.buttonText}>
              {isRegistering ? 'Cadastrar' : 'Entrar'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.orText}>OU</Text>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>G</Text> {/* Ícone do Google */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>f</Text> {/* Ícone do Facebook */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>H</Text> {/* Ícone do GitHub */}
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
            <Text style={styles.toggleText}>
              {isRegistering
                ? 'Já tem uma conta? Entre agora.'
                : 'Não tem uma conta? Cadastre-se agora.'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  paginatingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderColor: '#007BFF',
    borderWidth: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  form: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#FFF',
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    marginVertical: 20,
    fontSize: 16,
    color: '#666',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
  },
  socialButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555',
  },
  toggleText: {
    color: '#007BFF',
    marginTop: 15,
    fontSize: 15,
  },
  messageText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default AuthScreen;
