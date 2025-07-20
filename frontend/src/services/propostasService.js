import axios from "axios";
const API_URL = "http://localhost:3000/api/propostas/";

export const getPropostaByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}user/${userId}`);
    return response.data;
  } catch (error) {
    console.log("Erro ao localizar propostas");
    throw error;
  }
};
