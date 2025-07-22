import React, { useState } from "react";
import "./FilterCategory.css";
import Search from "../../assets/search-icon.svg";

export default function FilterCategory({ onFilter }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const handleCategoriaChange = (e) => {
    setCategoriaSelecionada(e.target.value);
  };

  const handlePesquisaChange = (e) => {
    setTermoPesquisa(e.target.value);
  };

  const handleBuscarClick = () => {
    onFilter({
      categoria: categoriaSelecionada,
      termo: termoPesquisa,
    });
  };

  return (
    <div className="filtro-container">
      <div className="filtro-campo">
        <label>Categoria</label>
        <select value={categoriaSelecionada} onChange={handleCategoriaChange}>
          <option>Todos</option>
          <option>Livros</option>
          <option>Eletrônicos</option>
          <option>Esportes</option>
          <option>Roupas</option>
          <option>Beleza</option>
          <option>Casa e Jardim</option>
          <option>Brinquedos</option>
          <option>Automotivo</option>
          <option>Saúde</option>
          <option>Móveis</option>
          <option>Informática</option>
          <option>Pet Shop</option>
          <option>Alimentos e Bebidas</option>
          <option>Ferramentas</option>
          <option>Joias e Relógios</option>
          <option>Música e Instrumentos</option>
          <option>Papelaria</option>
          <option>Filmes e Séries</option>
          <option>Games</option>
          <option>Viagem e Lazer</option>
        </select>
      </div>

      <div className="filtro-campo filtro-pesquisa">
        <label>Buscar</label>
        <input
          className="texto-input"
          type="text"
          placeholder="Pesquise um item..."
          value={termoPesquisa}
          onChange={handlePesquisaChange}
        />
      </div>

      <button className="filtro-buscar" onClick={handleBuscarClick}>
        <img src={Search} alt="Pesquisar" />
      </button>
    </div>
  );
}