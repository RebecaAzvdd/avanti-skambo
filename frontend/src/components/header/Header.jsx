import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import ModalItem from '../molecules/ModalItem/ModalItem';
import logo from '../../assets/logo-skambo-3.svg';
import logoName from '../../assets/logo-name-2.svg';

function Header() {
  const [mostrarModalItem, setMostrarModalItem] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if(storedUser){
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
          <>
            <Link to="/profile" className="nav-button login-button">
              Olá, {user.nome.split(" ")[0]}
            </Link>
            <button className="nav-button " onClick={() => setMostrarModalItem(true)}>
              Criar Item
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-button login-button">
            Entre ou Cadastre-se
          </Link>
        )}
      </nav>

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