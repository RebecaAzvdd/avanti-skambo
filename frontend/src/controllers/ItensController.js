import { createItem } from "../services/itemService";

const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Controller para criar item no backend convertendo imagem em base64
 * @param {Object} data
 * @param {string} data.nome
 * @param {string} data.descricao
 * @param {string} data.categoria
 * @param {string} data.userResponsavelId
 * @param {File} [data.imagemFile]
 * @returns {Promise<Object>} Item criado
 */

export const criarItemController = async (data) => {
  let imagemBase64 = null;

  if (data.imagemFile) {
    imagemBase64 = await toBase64(data.imagemFile);
  }

  const payload = {
    nome: data.nome,
    descricao: data.descricao,
    categoria: data.categoria,
    userResponsavelId: data.userResponsavelId,
    imagem: imagemBase64,
  };

  try {
    const itemCriado = await createItem(payload);
    return itemCriado;
  } catch (error) {
    console.error('Erro ao criar item:', error);
    throw error;
  }
};
