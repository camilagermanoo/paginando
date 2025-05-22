import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';
import { auth } from '../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithCredential,
  updateProfile,
  GoogleAuthProvider,
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => navigation.replace('Drawer'))
        .catch(() => Alert.alert('Erro', 'Não foi possível logar com Google'));
    }
  }, [response]);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert('Erro', 'Preencha email e senha corretamente');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigation.replace('Drawer');
    } catch (error) {
      Alert.alert('Erro', 'Email ou senha incorretos');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!firstName || !lastName || !email.trim() || !password) {
      Alert.alert('Erro', 'Preencha todos os campos corretamente');
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
      });
      navigation.replace('Drawer');
    } catch {
      Alert.alert('Erro', 'Não foi possível cadastrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Paginando</Text>
      <Image source={require('../assets/avatar_livro.png')} style={styles.image} />
      <Text style={styles.heading}>{isRegistering ? 'Crie sua conta' : 'Entre na sua conta'}</Text>

      {isRegistering && (
        <>
          <TextInput placeholder="Nome" value={firstName} onChangeText={setFirstName} style={styles.input} />
          <TextInput placeholder="Sobrenome" value={lastName} onChangeText={setLastName} style={styles.input} />
        </>
      )}

      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" keyboardType="email-address" />
      <TextInput placeholder="Senha" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry={!showPassword} />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Text style={{ color: '#0057ff', marginBottom: 10 }}>{showPassword ? 'Ocultar senha' : 'Mostrar senha'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, loading && { opacity: 0.6 }]} onPress={isRegistering ? handleRegister : handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{isRegistering ? 'Cadastrar' : 'Entrar'}</Text>
      </TouchableOpacity>

      <Text style={styles.or}>ou:</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity onPress={() => promptAsync()} disabled={!request || loading}>
          <AntDesign name="google" size={32} color="#DB4437" />
        </TouchableOpacity>
        <FontAwesome name="facebook-square" size={32} color="#3b5998" style={{ opacity: 0.3 }} />
        <Octicons name="mark-github" size={32} color="black" style={{ opacity: 0.3 }} />
      </View>

      <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)} disabled={loading}>
        <Text style={styles.registerText}>{isRegistering ? 'Já tem uma conta? Entrar' : 'Não tem conta? Cadastre-se'}</Text>
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
    alignItems: 'center' 
  },
  logo: { 
    fontSize: 28, 
    fontWeight: 'bold',
    marginBottom: 20, 
    marginTop: -60 
  },
  heading: { 
    fontSize: 18, 
    fontWeight: '600', 
    marginBottom: 20 
  },
  input: { 
    width: '100%', 
    height: 48, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc', 
    marginBottom: 16, 
    fontSize: 16, color: '#333' 
  },
  button: { 
    backgroundColor: '#69a9ff', 
    width: '100%', 
    paddingVertical: 14, 
    borderRadius: 6, 
    alignItems: 'center', 
    marginTop: 10 
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: '600', 
    fontSize: 16 
  },
  or: { 
    marginVertical: 12, 
    fontSize: 14, 
    color: '#333' 
  },
  socialContainer: { 
    flexDirection: 'row',
    justifyContent: 'space-around', 
    width: '60%', 
    marginBottom: 20 
  },
  registerText: { 
    color: '#0057ff', 
    fontWeight: '500', 
    marginTop: 10 
  },
  image: { 
    width: 250, 
    height: 250, 
    resizeMode: 'contain', 
    marginBottom: 10 
  },
});
