import axios from "axios";

const API_URL = "http://localhost:3000/api/";

export const register = async (nome, email, senha) => {
  try {
    const response = await axios.post(
      `${API_URL}register`,
      {
        nome,
        email,
        senha,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Erro ao fazer cadastro");
    }
  }
};

export const login = async (email, senha) => {
  try {
    const response = await axios.post(
      `${API_URL}login`,
      {
        email,
        senha,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Erro ao fazer login");
    }
  }
};
