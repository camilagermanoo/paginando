import { useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';

const useUserData = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) return;

    const userRef = doc(db, 'users', user.uid);

    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        console.warn('Documento de usuário não encontrado.');
      }
    }, (error) => {
      console.error('Erro ao obter dados do usuário:', error);
    });

    return () => unsubscribe();
  }, []);

  return userData;
};

export default useUserData;
