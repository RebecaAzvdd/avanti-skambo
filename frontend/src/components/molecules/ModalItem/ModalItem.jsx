import { useState } from "react";
import { criarItemController } from "../../../controllers/ItensController";
import './ModalItem.css'

export default function ModalItem({ onClose, onSuccess }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [userResponsavelId, setUserResponsavelId] = useState("");
  const [imagemFile, setImagemFile] = useState(null);
  const [imagemPreview, setImagemPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categorias = ["livros", "eletrônicos", "esportes", "roupas"];

  function handleImagemChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImagemFile(file);
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
      const novoItem = await criarItemController({
        nome,
        descricao,
        categoria,
        userResponsavelId,
        imagemFile,
      });
      setLoading(false);
      onSuccess && onSuccess(novoItem);
      onClose();
    } catch (err) {
      setLoading(false);
      setError("Erro ao criar item.");
    }
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-container">
        <header className="modal-header">
          <h2 className="modal-title">Criar Novo Item</h2>
          <p className="modal-description">Preencha os dados para criar o item.</p>
        </header>
        <form className="modal-content" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="nome" className="form-label required">Nome</label>
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
            <label htmlFor="descricao" className="form-label required">Descrição</label>
            <textarea
              id="descricao"
              className="form-textarea"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoria" className="form-label required">Categoria</label>
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
            <label htmlFor="userResponsavelId" className="form-label required">ID do Usuário Responsável</label>
            <input
              id="userResponsavelId"
              className="form-input"
              type="text"
              value={userResponsavelId}
              onChange={(e) => setUserResponsavelId(e.target.value)}
              required
            />
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
              <label htmlFor="imagem" className="file-upload-button" tabIndex={0}>
                Selecionar imagem
              </label>
            </div>
            {imagemPreview && (
              <div className="image-preview" aria-label="Preview da imagem selecionada">
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
              {loading ? <span className="spinner" aria-hidden="true"></span> : "Criar"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
