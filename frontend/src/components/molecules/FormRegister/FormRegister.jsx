import { Link, useNavigate } from "react-router-dom";
import "./FormResgister.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { register } from "../../../services/authService";

const FormRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
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

    if (password !== confirmPassword) {
      alert("As senhas não são iguais, tente novamente!");
      return;
    }

    try {
      await register(nome, email, password);
      setSuccessMessage("Cadastrado com sucesso!");
      setTimeout(() => {
        navigate("/login");
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
        <h1>Cadastre-se</h1>
        <span>Rápido e grátis, vamos lá!</span>

        <div className="container-input-name">
        <input
          name="nome"
          type="text"
          placeholder="nome"
          onChange={(e) => setNome(e.target.value)}
          />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          />
          </div>

        <div className="container-input">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="button-senha"
            type="button"
            onClick={togglePassword}
          >
            {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </button>
        </div>
        <div className="container-input">
          <input
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="confirmar senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
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
        <button type="submit">Cadastrar</button>
        <span>
          Já possui uma conta? faça o <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default FormRegister;
