import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo-skambo-3.svg';
import logoName from '../../assets/logo-.svg';

function Header() {
  const handleOpenModal = () => {
    alert("Abrir modal de busca!");
  };

  return (
    <header className="main-header">
      <div className="logo-container">
        <img src={logo} alt="Logo Skambo" className="logo" />
      </div>

      <nav className="header-nav">
        <button className="nav-button search-button" onClick={handleOpenModal}>
          Buscar
        </button>
        <Link to="/login" className="nav-button login-button">
          Login
        </Link>
      </nav>
    </header>
  );
}

export default Header;