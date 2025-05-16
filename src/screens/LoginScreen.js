import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

const LoginScreen = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const login = async () => {
    try {
        await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
        Alert.alert('Erro de login', error.message);
    }
};

const register = async () => {
    try {
        await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
        Alert.alert('Erro de registro', error.message);
    }
};

return (
    <View style={styles.container}>
        <Text style={styles.title}>Login ou Registro</Text>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
        <Button title="Entrar" onPress={login} />
        <Button title="Registrar" onPress={register} />
    </View>
);
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    input: { borderBottomWidth: 1, marginBottom: 12, padding: 8 },
    title: { fontSize: 20, marginBottom: 20, textAlign: 'center' }
});

export default LoginScreen;
