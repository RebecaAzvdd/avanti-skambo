import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getPropostaByUserId = async (userId) => {
  try {
    const response = await api.get(`/propostas/usuario/${userId}`);
    return response.data;
  } catch (error) {
    console.log("Erro ao localizar propostas");
    throw error;
  }
};

/**
 * Envia uma nova proposta para o backend.
 * @param {object} proposalData - Os dados da proposta.
 * @returns {Promise<object>} A resposta da API.
 */
export async function submitProposal(proposalData) {
  const response = await api.post('/propostas', proposalData);
  return response.data;
}
