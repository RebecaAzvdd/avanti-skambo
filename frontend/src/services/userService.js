import axios from "axios";
const API_URL = 'http://localhost:3000/api/users';

export const listarTodos = async() =>{
    const response = await axios.get(API_URL);
    return response.data;
};

export const buscarPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};