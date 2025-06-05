export const fetchBooks = async (query) => {
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const json = await response.json();
    return json.items || [];
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    return [];
  }
};
