import { useState, useCallback } from 'react';

const useLoading = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para envolver uma operação assíncrona com estados de carregamento e erro
  const callWithLoading = useCallback(async (asyncFunction, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFunction(...args);
      return result;
    } catch (err) {
      setError(err);
      console.error("Erro na operação com carregamento:", err);
      throw err; // Re-lança o erro para que o componente chamador possa lidar com ele
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, callWithLoading };
};

export default useLoading;