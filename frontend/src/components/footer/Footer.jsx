import "./Footer.css";
import logo from "../../assets/logo-skambo-3.svg";
import logoName from "../../assets/logo-name-2.svg";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="logo-container">
        <img src={logo} alt="Logo Skambo" className="logo" />
        <img src={logoName} alt="Logo Nome Skambo" className="logo-name" />
      </div>

      <div className="footer-sobre">
        <h2>Sobre</h2>
        <p>
          O Skambo é a sua plataforma de trocas simples e inteligente, que
          transforma itens parados em oportunidades. Aqui, você troca o que não
          usa mais por aquilo que realmente precisa, de forma rápida, segura e
          divertida. Junte-se a nós e dê uma nova vida aos seus objetos, fazendo
          parte de uma comunidade que valoriza o reaproveitamento e a troca
          consciente.
        </p>
      </div>

      <div className="footer-container">
        <div className="footer-contato">
          <h2>Contato</h2>
          <p>Telefone: (85) 9XXXX-XXXX</p>
          <p>E-mail: skambo@email.com</p>
        </div>

        <div className="footer-redes-sociais">
          <h2>Redes Sociais</h2>
          <p>
            <a
              href="https://www.facebook.com/Skambo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
          </p>
          <p>
            <a
              href="https://www.instagram.com/Skambo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </p>
          <p>
            <a
              href="https://www.twitter.com/Skambo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </p>
        </div>

        <div className="footer-trabalhe-conosco">
          <h2>Trabalhe Conosco</h2>
          <p>
            <a href="/vagas">Vagas</a>
          </p>
        </div>
      </div>

      <div className="footer-text">
        <p>&#169; 2025 Skambo. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
