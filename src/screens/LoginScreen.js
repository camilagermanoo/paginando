import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image, 
  KeyboardAvoidingView, 
  Platform, 
} from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';


export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password || (isRegistering && !fullName)) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, 'paginando-users', user.uid), {
          fullName,
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        {/* Ilustração ou Logo */}
        <Image
          source={require('../../assets/paginandoLogo.png')}
          style={styles.illustration}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          {isRegistering ? 'Crie sua conta' : 'Bem-vindo(a) de volta!'}
        </Text>
        <Text style={styles.subtitle}>
          {isRegistering ? 'Junte-se à comunidade Paginando' : 'Faça login para continuar'}
        </Text>

        {isRegistering && (
          <TextInput
            placeholder="Nome completo"
            placeholderTextColor="#888"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
          />
        )}

        <TextInput
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        {loading ? (
          <ActivityIndicator size="large" color="#4a90e2" style={styles.loadingIndicator} />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleAuth}>
            <Text style={styles.buttonText}>
              {isRegistering ? 'Cadastrar' : 'Entrar'}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)} style={styles.toggleButton}>
          <Text style={styles.toggleText}>
            {isRegistering ? 'Já tem uma conta? Faça login' : 'Não tem conta? Cadastre-se'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '90%', 
    maxWidth: 400,
    padding: 25,
    backgroundColor: '#fff', 
    borderRadius: 15,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8, 
    alignItems: 'center', 
  },
  illustration: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 28, 
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#f0f2f5', 
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0', 
  },
  button: {
    width: '100%',
    backgroundColor: '#4a90e2', 
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingIndicator: {
    marginTop: 10,
    marginBottom: 10,
  },
  toggleButton: {
    marginTop: 20,
    padding: 5,
  },
  toggleText: {
    fontSize: 15,
    color: '#4a90e2',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});