import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useFavoriteBooks } from '../hooks/useFavoriteBooks';
import { useNavigation } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function ProfileScreen() {
  const { user } = useAuth();
  const { favorites } = useFavoriteBooks();
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        const docRef = doc(db, 'paginando-users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFullName(docSnap.data().fullName);
        }
      }
    };
    fetchUserData();
  }, [user]);

  const handleLogout = () => {
    navigation.navigate('ConfirmLogout');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Image
        source={require('../../assets/profileImage.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Seu perfil</Text>
      <View style={styles.separator} />

      <Text style={styles.info}>Email: {user?.email}</Text>
      <Text style={styles.info}>Nome: {fullName}</Text>
      <Text style={styles.info}>
        Total de livros favoritados: {favorites?.length || 0}
      </Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  backText: {
    fontSize: 22,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
  },
  separator: {
    width: '60%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 8,
  },
  info: {
    fontSize: 16,
    marginBottom: 6,
  },
  logoutButton: {
    marginTop: 32,
    backgroundColor: '#73a9f7',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});