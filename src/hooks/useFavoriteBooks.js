// /src/hooks/useFavoriteBooks.js
import { useState, useEffect, useContext, createContext } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { auth } from '../../firebaseConfig';

const FavoriteBooksContext = createContext();

export const FavoriteBooksProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!auth.currentUser) return;
      const db = getFirestore();
      const ref = doc(db, 'favorites', auth.currentUser.uid);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        setFavorites(docSnap.data().books || []);
      }
    };

    fetchFavorites();
  }, []);

  const toggleFavorite = async (book) => {
    const db = getFirestore();
    const ref = doc(db, 'favorites', auth.currentUser.uid);
    let updatedFavorites = [...favorites];

    const exists = favorites.some(fav => fav.id === book.id);
    if (exists) {
      updatedFavorites = updatedFavorites.filter(fav => fav.id !== book.id);
    } else {
      updatedFavorites.push(book);
    }

    setFavorites(updatedFavorites);
    await setDoc(ref, { books: updatedFavorites });
  };

  return (
    <FavoriteBooksContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteBooksContext.Provider>
  );
};

export const useFavoriteBooks = () => useContext(FavoriteBooksContext);
