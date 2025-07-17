import { Link } from "react-router-dom";
import "./FormLogin.css";

export default function FormLogin() {
  return (
    <div className="cadastro-container">
      <form className="cadastro-form">
        <h1>Login</h1>
        <span>Rápido e grátis, vamos lá!</span>

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

        <button type="submit">Logar</button>
        <span>
          Não possui uma conta? faça o <Link to="/register">cadastro</Link>
        </span>
      </form>
    </div>
  );
}
