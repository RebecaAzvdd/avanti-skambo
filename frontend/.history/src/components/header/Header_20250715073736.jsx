import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo-skambo-3.svg';
import logoName from '../../assets/logo-name-2.svg';
import menu from '../../assets/menu-burger.svg';

function Header() {
  const [mostrarModal, setMostrarModal] = useState(false);

  const toggleModal = () => {
    setMostrarModal(!mostrarModal);
  };

  return (
    <header className="main-header">
      <div className="logo-container">
        <button className="nav-button search-button" onClick={toggleModal}>
          <img src={menu} alt="icone menu" className='menu' />
        </button>
        <img src={logo} alt="Logo Skambo" className="logo" />
        <img src={logoName} alt="Logo Nome Skambo" className="logo-name" />
      </div>

      <nav className="header-nav">
        <Link to="/login" className="nav-button login-button">
          Entre ou Cadastre-se
        </Link>
      </nav>

      {/* Modal suspenso */}
      {mostrarModal && (
        <div className="modal-menu">
          <p>🔍 Buscar por itens</p>
          <p>📦 Categorias</p>
          <p>📝 Histórico</p>
        </div>
      )}
    </header>
  );
}

export default Header;
