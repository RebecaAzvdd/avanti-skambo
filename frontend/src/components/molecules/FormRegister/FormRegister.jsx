import { Link } from "react-router-dom";
import "./FormResgister.css";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FormRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");

  const handleSubmit = (event) => {
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
      console.error("As senhas não são iguais");
      return;
    }

    console.log("Cadastro efetuado com sucesso! confirmação de dados abaixo: ");
    console.log({ email, password, confirmPassword });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="cadastro-container">
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <h1>Cadastrar</h1>
        <span>Rápido e grátis, vamos lá!</span>

        <input
          name="nome"
          label="nome"
          type="text"
          placeholder="nome"
          onChange={(e) => setNome(e.target.value)}
        ></input>
        <input
          name="email"
          label="Email"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <div className="container-input">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            label="Senha"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
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
            name="password"
            type={showPassword ? "text" : "password"}
            label="Senha"
            placeholder="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
          <button
            className="button-senha"
            type="button"
            onClick={togglePassword}
          >
            {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </button>
        </div>

        <button type="submit">Cadastrar</button>
        <span>
          Já possui uma conta? faça o <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default FormRegister;
