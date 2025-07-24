import { Link, useNavigate } from "react-router-dom";
import "./FormLogin.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../../../services/authService";

export default function FormLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValidEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    if (!isValidEmail(email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    if (password.length < 6) {
      alert("A senha deve conter no mínimo 6 caracteres.");
      return;
    }

    try {
      await login(email, password);
      setSuccessMessage("Entrando na conta...");
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="cadastro-container">
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <h1>Entre na sua conta</h1>
        <span>Rápido e grátis, vamos lá!</span>
        <div className="container-login-input">
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div>
        <div className="container-input">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="button-senha"
            type="button"
            onClick={togglePassword}
          >
            {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </button>
        </div>
        {successMessage && <div className="mensagem-sucesso">{successMessage}</div>}
        <button type="submit">Logar</button>
        <span>
          Não possui uma conta? faça o <Link to="/register">cadastro</Link>
        </span>
      </form>
    </div>
  );
}
