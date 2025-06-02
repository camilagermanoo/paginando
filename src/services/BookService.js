// src/services/BookService.js
// Serviço para consumir a API do Google Books

const GOOGLE_BOOKS_API_BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

// Função para buscar livros com base em um termo de pesquisa
export const searchBooks = async (query) => {
  try {
    const response = await fetch(`${GOOGLE_BOOKS_API_BASE_URL}?q=${query}&maxResults=20`);
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data.items || []; // Retorna um array de livros ou um array vazio
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    throw error;
  }
};

// Função para buscar um livro pelo seu ID
export const getBookById = async (bookId) => {
  try {
    const response = await fetch(`${GOOGLE_BOOKS_API_BASE_URL}/${bookId}`);
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar livro por ID:", error);
    throw error;
  }
};