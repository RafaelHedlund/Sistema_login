// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const login = async (email, senha) => {
  try {
    const response = await api.post('/login', { email, senha });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.mensagem || 'Erro ao fazer login');
  }
};

export const register = async (nome, email, senha) => {
  try {
    const response = await api.post('/registro', { nome, email, senha });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.mensagem || 'Erro ao registrar');
  }
};
