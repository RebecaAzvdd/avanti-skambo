import axios from 'axios';

const API_URL = 'http://localhost:3000/api/itens';

export const getAllItens = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getItensById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const getAllItensAvailable = async () => {
    const response = await axios.get(`${API_URL}/disponiveis`);
    return response.data;
};

export const createItem = async (item) => {
  const response = await axios.post(API_URL, item);
  return response.data;
};