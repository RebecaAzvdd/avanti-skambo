import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo-skambo-3.svg';
import logoName from '../../assets/logo-name-2.svg';
import userImage from '../../assets/user-login.png';

function Header() {
  const handleOpenModal = () => {
    alert("Abrir modal de busca!");
  };

  return (
    <header className="main-header">
      <div className="logo-container">
        <img src={logo} alt="Logo Skambo" className="logo" />
        <img src={logoName} alt="Logo Nome Skambo" className="logo-name" />
      </div>

      <nav className="header-nav">
        <button className="nav-button search-button" onClick={handleOpenModal}>
          Buscar
        </button>
        <div clas>
        <img src={userImage} alt="imagem usuario" className="user" />
        <Link to="/login" className="nav-button login-button">
          Login/Cadastro
        </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;