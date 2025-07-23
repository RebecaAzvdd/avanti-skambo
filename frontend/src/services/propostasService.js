import axios from "axios";
const API_URL = "http://localhost:3000/api/propostas";

export const getPropostaByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.log("Erro ao localizar propostas");
    throw error;
  }
};

export const createProposta = async ({ itemId, userPropostaId, itemPropostoId }) => {
  try {
    const response = await axios.post(`${API_URL}`, {
      itemId,
      userPropostaId,
      itemPropostoId,
    });

    console.log(response.data.message);
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao enviar proposta:",
      error.response?.data || error.message
    );
    console.error("Erro ao enviar proposta:", selectedItemId);
  }
};
