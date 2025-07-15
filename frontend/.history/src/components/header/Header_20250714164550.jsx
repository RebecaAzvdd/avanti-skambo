import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const handleOpenModal = () => {
    alert("Abrir modal de busca!");
  };

  return (
    <header className="main-header">
      <div className="logo-container">
        <img src="./logo.png" alt="Logo da Empresa" className="logo" />
      </div>

      <nav className="header-nav">
        <button className="nav-button search-button" onClick={handleOpenModal}>
          Buscar
        </button>
        {/* Usamos o componente Link para navegar para a página de login */}
        <Link to="/login" className="nav-button login-button">
          Login
        </Link>
      </nav>
    </header>
  );
}

export default Header;