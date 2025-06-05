// /src/hooks/useBooks.js
import { useState, useEffect } from 'react';
import { fetchBooks } from '../services/api';

const useBooks = (query = 'React') => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks(query).then(data => {
      setBooks(data);
      setLoading(false);
    });
  }, [query]);

  return { books, loading };
};

export default useBooks;
