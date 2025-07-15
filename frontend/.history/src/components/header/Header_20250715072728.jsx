import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo-skambo-3.svg';
import logoName from '../../assets/logo-name-2.svg';
import searchIcon from 

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
          <img src="" alt="" />
        </button>

        <Link to="/login" className="nav-button login-button">
          Entre ou Cadastre-se
        </Link>

      </nav>
    </header>
  );
}

export default Header;