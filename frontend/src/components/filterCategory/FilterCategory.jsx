import React from "react";
import "./FilterCategory.css";
import Search from "../../assets/search-icon.svg";

export default function FilterCategory() {
  return (
    <div className="filtro-container">
      <div className="filtro-campo">
        <label>Categoria</label>
        <select>
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

      <div className="filtro-campo">
        <label>Estado</label>
        <select>
          <option>Todos</option>
          <option>Alagoas</option>
          <option>Acre</option>
          <option>Amapá</option>
          <option>Amazonas</option>
          <option>Bahia</option>
          <option>Ceará</option>
          <option>Brasilia</option>
          <option>Espírito Santo</option>
          <option>Goiás</option>
          <option>Maranhão</option>
          <option>Mato Grosso</option>
          <option>Mato Grosso do Sul</option>
          <option>Minas Gerais</option>
          <option>Pará</option>
          <option>Paraíba</option>
          <option>Paraná</option>
          <option>Pernambuco</option>
          <option>Piauí</option>
          <option>Rio de Janeiro</option>
          <option>Rio Grande do Norte</option>
          <option>Rio Grande do Sul</option>
          <option>Rondônia</option>
          <option>Roraima</option>
          <option>Santa Catarina</option>
          <option>São Paulo</option>
          <option>Sergipe</option>
          <option>Tocantins</option>
        </select>
      </div>

      <div className="filtro-campo">
        <label>Condição</label>
        <select>
          <option>Todos</option>
          <option>Novo</option>
          <option>Usado</option>
        </select>
      </div>

      <button className="filtro-buscar">
        <img src={ Search } alt="Pesquisar" />
      </button>
    </div>
  );
}
