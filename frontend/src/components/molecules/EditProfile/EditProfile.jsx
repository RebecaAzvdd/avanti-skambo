import { useEffect, useState } from "react";
import { updateUser } from "../../../services/userService";
import "./EditProfile.css";
export default function EditProfile({ onClose, onSuccess }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      setNome(user.nome);
      setEmail(user.email);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(user.id, nome, email);
      setSuccess("Dados atualizados com sucesso!");
      setError("");
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1000);
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-container">
        <form className="modal-content" onSubmit={handleSubmit}>
          <h2 className="modal-title">Editar perfil</h2>
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
            <label htmlFor="email" className="form-label required">
              Email
            </label>
            <input
              id="email"
              className="form-input"
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <footer className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button className="btn btn-primary" type="submit">
              Salvar alterações
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
