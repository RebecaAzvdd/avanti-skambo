import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getAllItens = async () => {
  const response = await api.get('/itens');
  return response.data;
};

export const getItensById = async (id) => {
  const response = await api.get(`/itens/${id}`);
  return response.data;
};

export const getAllItensAvailable = async () => {
    const response = await api.get('/itens/disponiveis');
    return response.data;
};

/**
 * Cria um novo item, lidando com o upload de imagem.
 * @param {FormData} formData - Os dados do item, incluindo o ficheiro da imagem.
 * @returns {Promise<object>} O novo item criado.
 */
export const createItem = async (formData) => {
  const response = await api.post('/itens', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// --- Funções para o Modal de Proposta ---

export async function fetchUserItems(userId) {
  if (!userId) throw new Error('ID do utilizador é necessário.');
  const response = await api.get(`/usuarios/${userId}/itens`);
  return response.data;
}

export async function submitProposal(proposalData) {
  const response = await api.post('/propostas', proposalData);
  return response.data;
}
