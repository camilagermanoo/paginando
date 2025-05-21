import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';
import { auth } from '../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithCredential,
  updateProfile,
} from 'firebase/auth';
import { AntDesign, FontAwesome, Octicons } from '@expo/vector-icons';

import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'SEU_EXPO_CLIENT_ID.apps.googleusercontent.com',
    androidClientId: 'SEU_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    iosClientId: 'SEU_IOS_CLIENT_ID.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          console.log('Login com Google feito!');
          navigation.replace('Profile'); // vai para perfil após login
        })
        .catch((error) => {
          console.error('Erro ao logar com Google:', error);
          Alert.alert('Erro', 'Não foi possível logar com Google');
        });
    }
  }, [response]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigation.replace('Profile');
    } catch (error) {
      console.error('Erro ao logar:', error.message);
      Alert.alert('Erro', 'Email ou senha incorretos');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!firstName || !lastName) {
      Alert.alert('Erro', 'Por favor, preencha nome e sobrenome');
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
      });
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso');
      navigation.replace('Profile');
    } catch (error) {
      console.error('Erro ao cadastrar:', error.message);
      Alert.alert('Erro', 'Não foi possível cadastrar. Verifique os dados e tente novamente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Paginando</Text>

      <Image
        source={require('../assets/avatar_livro.png')}
        style={styles.image}
      />

      <Text style={styles.heading}>{isRegistering ? 'Crie sua conta' : 'Entre na sua conta'}</Text>

      {isRegistering && (
        <>
          <TextInput
            placeholder="Nome"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
            placeholderTextColor="#999"
          />
          <TextInput
            placeholder="Sobrenome"
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
            placeholderTextColor="#999"
          />
        </>
      )}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        placeholderTextColor="#999"
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={isRegistering ? handleRegister : handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{isRegistering ? 'Cadastrar' : 'Entrar'}</Text>
      </TouchableOpacity>

      <Text style={styles.or}>ou:</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity onPress={() => promptAsync()} disabled={!request || loading}>
          <AntDesign name="google" size={32} color="#DB4437" />
        </TouchableOpacity>
        <TouchableOpacity disabled={true} style={{ opacity: 0.5 }}>
          <FontAwesome name="facebook-square" size={32} color="#3b5998" />
        </TouchableOpacity>
        <TouchableOpacity disabled={true} style={{ opacity: 0.5 }}>
          <Octicons name="mark-github" size={32} color="black" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)} disabled={loading}>
        <Text style={styles.registerText}>
          {isRegistering
            ? 'Já tem uma conta? Entre agora'
            : 'Não tem uma conta? Cadastre-se agora'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: -60,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#69a9ff',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  or: {
    marginVertical: 12,
    fontSize: 14,
    color: '#333',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginBottom: 20,
  },
  registerText: {
    color: '#0057ff',
    fontWeight: '500',
    marginTop: 10,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 10,
  },
});
