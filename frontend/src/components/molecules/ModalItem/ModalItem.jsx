import { useEffect, useState } from "react";
import "./ModalItem.css";
import { createItem } from "../../../services/itemService";
export default function ModalItem({ onClose, onSuccess }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagemFile, setImagemFile] = useState(null);
  const [userResponsavelId, setUserResponsavelId] = useState("");
  const [imagemPreview, setImagemPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categorias = [
  "Livros",
  "Eletrônicos",
  "Esportes",
  "Roupas",
  "Beleza",
  "Casa e Jardim",
  "Brinquedos",
  "Automotivo",
  "Saúde",
  "Móveis",
  "Informática",
  "Pet Shop",
  "Alimentos e Bebidas",
  "Ferramentas",
  "Joias e Relógios",
  "Música e Instrumentos",
  "Papelaria",
  "Filmes e Séries",
  "Games",
  "Viagem e Lazer"
];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if(storedUser) {
      const user = JSON.parse(storedUser)
      setUserResponsavelId(user.id);
    }
  }, []);

  function handleImagemChange(e) {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match("image.*")) {
        setError("Por favor selecione um arquivo valido");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("A imagem deve ter menos de 5 MB");
        return;
      }
      setImagemFile(file);
      setError(null);

      const reader = new FileReader();
      reader.onloadend = () => setImagemPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagemFile(null);
      setImagemPreview(null);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!nome || !descricao || !categoria || !userResponsavelId) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      const novoItem = await createItem({
        nome,
        descricao,
        categoria,
        userResponsavelId,
        imagemFile,
      });

      onSuccess && onSuccess(novoItem);
      onClose();
    } catch (err) {
      console.error("Erro ao criar item", err);
      setError(err.response?.data?.error || "Erro ao criar item.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-container">
        <header className="modal-header-item">
          <h2 className="modal-title">Criar Novo Item</h2>
          <p className="modal-description">
            Preencha os dados para criar o item.
          </p>
        </header>
        <form className="modal-content-item" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="nome" className="form-label required">
              Nome
            </label>
            <input
              id="nome"
              className="form-input"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="descricao" className="form-label required">
              Descrição
            </label>
            <textarea
              id="descricao"
              className="form-textarea"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoria" className="form-label required">
              Categoria
            </label>
            <select
              id="categoria"
              className="form-select"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            >
              <option value="">Selecione</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Imagem (opcional)</label>
            <div className="file-upload-container">
              <input
                id="imagem"
                type="file"
                accept="image/*"
                className="file-input"
                onChange={handleImagemChange}
              />
              <label
                htmlFor="imagem"
                className="file-upload-button"
                tabIndex={0}
              >
                Selecionar imagem
              </label>
            </div>
            {imagemPreview && (
              <div
                className="image-preview"
                aria-label="Preview da imagem selecionada"
              >
                <img src={imagemPreview} alt="Preview da imagem" />
              </div>
            )}
          </div>

          {error && (
            <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
          )}

          <footer className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? (
                <span className="spinner" aria-hidden="true"></span>
              ) : (
                "Criar Item"
              )}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
