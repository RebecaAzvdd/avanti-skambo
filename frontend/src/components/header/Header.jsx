import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import ModalItem from '../molecules/ModalItem/ModalItem';
import logo from '../../assets/logo-skambo-3.svg';
import logoName from '../../assets/logo-name-2.svg';
import menu from '../../assets/menu-burger.svg';

function Header() {
  const [mostrarModalItem, setMostrarModalItem] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [pesquisa, setPesquisa] = useState('');
    const [user, setUser] = useState(null);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const toggleModal = () => {
    setMostrarModal((prev) => !prev);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if(storedUser){
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
          <img src={logo || "/placeholder.svg"} alt="Logo Skambo" className="logo" />
          <img src={logoName || "/placeholder.svg"} alt="Logo Nome Skambo" className="logo-name" />
        </Link>
      </div>

       <nav className="header-nav">
        {user ? (
          <Link to="/profile" className="nav-button login-button">
            Olá, {user.nome.split(" ")[0]}
          </Link>
        ) : (
          <Link to="/login" className="nav-button login-button">
            Entre ou Cadastre-se
          </Link>
        )}
        <button className="menu-button" onClick={toggleModal}>
          <img src={menu || "/placeholder.svg"} alt="icone menu" className="menu" />
        </button>
      </nav>

      {mostrarModal && (
        <div className="modal-menu" ref={modalRef}>
         <button className="filter-link" onClick={() => setMostrarModalItem(true)}>
          <p>Criar item</p>
         </button>
        </div>
      )}

      {mostrarModalItem && (
  <ModalItem
    onClose={() => setMostrarModalItem(false)}
    onSuccess={(itemCriado) => {
      console.log('Item criado com sucesso:', itemCriado);
      setMostrarModalItem(false);
    }}
  />
)}
    </header>
  );
}

export default Header;