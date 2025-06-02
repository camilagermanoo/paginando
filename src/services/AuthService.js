// src/services/AuthService.js
// Serviço para lidar com a autenticação do Firebase

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

// O ID do aplicativo é fornecido pelo ambiente Canvas.
// Se não estiver definido, use um valor padrão para desenvolvimento local.
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// Função para obter o userId. Se o usuário estiver autenticado, usa o uid.
// Caso contrário, gera um UUID aleatório para usuários anônimos ou não autenticados.
const getUserId = () => {
  return auth.currentUser?.uid || crypto.randomUUID();
};

// Função para registrar um novo usuário com email e senha
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    throw error;
  }
};

// Função para fazer login com email e senha
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};

// Função para fazer logout
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    throw error;
  }
};

// Observador de estado de autenticação
export const onAuthChange = (callback) => {
  // A variável global __initial_auth_token é fornecida pelo ambiente Canvas.
  // Se estiver definida, tenta fazer login com o token personalizado.
  // Caso contrário, faz login anonimamente.
  if (typeof __initial_auth_token !== 'undefined') {
    signInWithCustomToken(auth, __initial_auth_token)
      .then(() => {
        console.log("Login com token personalizado bem-sucedido.");
        onAuthStateChanged(auth, callback);
      })
      .catch((error) => {
        console.error("Erro ao fazer login com token personalizado:", error);
        signInAnonymously(auth).then(() => {
          console.log("Login anônimo bem-sucedido.");
          onAuthStateChanged(auth, callback);
        }).catch((anonError) => {
          console.error("Erro ao fazer login anônimo:", anonError);
          callback(null); // Nenhum usuário logado
        });
      });
  } else {
    signInAnonymously(auth)
      .then(() => {
        console.log("Login anônimo bem-sucedido.");
        onAuthStateChanged(auth, callback);
      })
      .catch((error) => {
        console.error("Erro ao fazer login anônimo:", error);
        callback(null); // Nenhum usuário logado
      });
  }
};

export { getUserId, appId };