import React, { useState } from "react";
import "./FilterCategory.css";
import Search from "../../assets/search-icon.svg";
import { getAllItens, getItemsByCategory, getItemsByKeyWord } from "../../services/itemService";

export default function FilterCategory({ onFilter }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const handleCategoriaChange = (e) => {
    setCategoriaSelecionada(e.target.value);
  };

  const handlePesquisaChange = (e) => {
    setTermoPesquisa(e.target.value);
  };

  const handleBuscarClick = async () => {
    try {
      const [porCategoria, porPalavra] = await Promise.all([
        getItemsByCategory(categoriaSelecionada),
        getItemsByKeyWord(termoPesquisa),
      ]);

      const categoriaValida = Array.isArray(porCategoria) && porCategoria.length > 0;
      const palavraValida = Array.isArray(porPalavra) && porPalavra.length > 0;

      if (!categoriaValida && !palavraValida) {
        alert("Nenhum resultado encontrado com os filtros aplicados. Exibindo todos os itens.");
        const todos = await getAllItens();
        return onFilter(todos);
      }

      if (!categoriaValida && palavraValida) {
        alert("Nenhum resultado encontrado para a categoria. Exibindo apenas resultados por palavra-chave.");
        return onFilter(porPalavra);
      }

      if (categoriaValida && !palavraValida) {
        alert("Nenhum resultado encontrado para a palavra-chave. Exibindo apenas resultados por categoria.");
        return onFilter(porCategoria);
      }

      const mapa = new Map();
      [...porCategoria, ...porPalavra].forEach((item) => mapa.set(item.id, item));
      return onFilter(Array.from(mapa.values()));

    } catch (error) {
      console.error("Erro ao buscar itens no filtro:", error);
      alert("Erro ao buscar itens. Exibindo todos os itens.");
      const todos = await getAllItens();
      return onFilter(todos);
    }
  };

  return (
    <div className="filtro-container">
      <div className="filtro-campo">
        <label>Categoria</label>
        <select value={categoriaSelecionada} onChange={handleCategoriaChange}>
          <option>Todos</option>
          <option>livros</option>
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