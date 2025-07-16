import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo-skambo-3.svg';
import logoName from '../../assets/logo-name-2.svg';
import menu from '../../assets/menu-burger.svg';

function Header() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [pesquisa, setPesquisa] = useState('');
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const toggleModal = () => {
    setMostrarModal((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setMostrarModal(false);
      }
    }

    if (mostrarModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mostrarModal]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Pesquisar:", pesquisa);
  };

  return (
    <header className="main-header">
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo Skambo" className="logo" />
          <img src={logoName} alt="Logo Nome Skambo" className="logo-name" />
        </Link>
      </div>

      <nav className="header-nav">
        <Link to="/login" className="nav-button login-button">
          Entre ou Cadastre-se
        </Link>
        <button className="menu-button" onClick={toggleModal}>
          <img src={menu} alt="icone menu" className="menu" />
        </button>
      </nav>

      {mostrarModal && (
        <div className="modal-menu" ref={modalRef}>
         <Link className='filter-link'>
          <p>Criar item</p>
         </Link>
         <Link className='filter-link'>
          <p>Criar Proposta</p>
         </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
