import { Link } from "react-router-dom";
import "./FormResgister.css";

const FormRegister = () => {
  return (
    <div className="cadastro-container">
      <form className="cadastro-form">
        <h1>Cadastrar</h1>
        <span>Rápido e grátis, vamos lá!</span>

        <input name="nome" label="nome" type="text" placeholder="nome"></input>
        <input
          name="email"
          label="Email"
          type="email"
          placeholder="Email"
        ></input>
        <input
          name="password"
          type="password"
          label="Senha"
          placeholder="password"
        ></input>

        <button type="submit">Cadastrar</button>
        <span>
          Já possui uma conta? faça o <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default FormRegister;
