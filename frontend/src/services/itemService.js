import axios from "axios";
import { convertImageToBase64 } from "../controllers/ItensController";
const API_URL = "http://localhost:3000/api/itens";

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

export const createItem = async (itemData) => {
  if (itemData.imagemFile) {
    itemData.imagem = await convertImageToBase64(itemData.imagemFile);
    delete itemData.imagemFile;
  }

  const response = await axios.post(API_URL, itemData);
  return response.data;
};

export const getAllItensByUserId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao buscar itens do usuário:",
      error.response?.data || error.message
    );
    return [];
  }
};
