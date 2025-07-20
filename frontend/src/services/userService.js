import axios from "axios";
const API_URL = "http://localhost:3000/api/users";

export const listarTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const buscarPorId = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateUser = async (id, nome, email) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.put(
      `${API_URL}/${id}`,
      { nome, email },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data.user;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Erro ao atualizar usuário"
    );
  }
};
