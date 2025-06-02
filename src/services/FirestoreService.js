import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot, collection } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { getUserId, appId } from './AuthService'; // Importa getUserId e appId

// Caminho para a coleção de dados privados do usuário
const getUserDocRef = (userId) => {
  return doc(db, 'artifacts', appId, 'users', userId, 'profile', 'data');
};

// Função para salvar ou atualizar o perfil do usuário
export const saveUserProfile = async (userData) => {
  const userId = getUserId();
  if (!userId) {
    console.error("Usuário não autenticado. Não é possível salvar o perfil.");
    return;
  }
  const userDocRef = getUserDocRef(userId);
  try {
    await setDoc(userDocRef, userData, { merge: true }); // merge: true para não sobrescrever dados existentes
    console.log("Perfil do usuário salvo com sucesso!");
  } catch (error) {
    console.error("Erro ao salvar perfil do usuário:", error);
    throw error;
  }
};

// Função para obter o perfil do usuário
export const getUserProfile = async () => {
  const userId = getUserId();
  if (!userId) {
    console.error("Usuário não autenticado. Não é possível obter o perfil.");
    return null;
  }
  const userDocRef = getUserDocRef(userId);
  try {
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("Nenhum perfil encontrado para o usuário.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao obter perfil do usuário:", error);
    throw error;
  }
};

// Função para adicionar um livro aos favoritos do usuário
export const addBookToFavorites = async (book) => {
  const userId = getUserId();
  if (!userId) {
    console.error("Usuário não autenticado. Não é possível adicionar favoritos.");
    return;
  }
  const userDocRef = getUserDocRef(userId);
  try {
    await updateDoc(userDocRef, {
      favoriteBooks: arrayUnion(book) // Adiciona o livro ao array se não existir
    });
    console.log("Livro adicionado aos favoritos!");
  } catch (error) {
    console.error("Erro ao adicionar livro aos favoritos:", error);
    throw error;
  }
};

// Função para remover um livro dos favoritos do usuário
export const removeBookFromFavorites = async (book) => {
  const userId = getUserId();
  if (!userId) {
    console.error("Usuário não autenticado. Não é possível remover favoritos.");
    return;
  }
  const userDocRef = getUserDocRef(userId);
  try {
    await updateDoc(userDocRef, {
      favoriteBooks: arrayRemove(book) // Remove o livro do array
    });
    console.log("Livro removido dos favoritos!");
  } catch (error) {
    console.error("Erro ao remover livro dos favoritos:", error);
    throw error;
  }
};

// Observador em tempo real para os livros favoritos do usuário
export const onFavoriteBooksChange = (callback) => {
  const userId = getUserId();
  if (!userId) {
    console.error("Usuário não autenticado. Não é possível observar favoritos.");
    return () => {}; // Retorna uma função vazia para o cleanup
  }
  const userDocRef = getUserDocRef(userId);
  const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      callback(data.favoriteBooks || []);
    } else {
      callback([]);
    }
  }, (error) => {
    console.error("Erro ao observar favoritos:", error);
    callback([]);
  });
  return unsubscribe; // Retorna a função de unsubscribe
};

// Observador em tempo real para o perfil do usuário
export const onUserProfileChange = (callback) => {
  const userId = getUserId();
  if (!userId) {
    console.error("Usuário não autenticado. Não é possível observar o perfil.");
    return () => {}; // Retorna uma função vazia para o cleanup
  }
  const userDocRef = getUserDocRef(userId);
  const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    } else {
      callback(null);
    }
  }, (error) => {
    console.error("Erro ao observar perfil:", error);
    callback(null);
  });
  return unsubscribe; // Retorna a função de unsubscribe
};
