import React, { useEffect, useState } from "react";
import axios from "axios";
import FilterCategory from "../../filterCategory/FilterCategory";
import ItemCard from "./itemCard/ItemCard";

export default function ItemList() {
  const [itens, setItens] = useState([]);
  const [filtros, setFiltros] = useState({ categoria: "Todos", search: "" });

  const fetchItens = async () => {
    try {
      const { categoria, search } = filtros;
      const params = {};
      if (categoria && categoria !== "Todos") params.categoria = categoria.toLowerCase();
      if (search) params.search = search;

      const response = await axios.get("http://localhost:3001/itens", { params });
      setItens(response.data);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
    }
  };

  useEffect(() => {
    fetchItens();
  }, [filtros]);

  const handleFilter = (dadosFiltro) => {
    setFiltros(dadosFiltro);
  };

  return (
    <>
      <FilterCategory onFilter={handleFilter} />

      {itens.length === 0 ? (
        <p style={{ color: "white", textAlign: "center" }}>
          Nenhum resultado encontrado com os filtros aplicados.
        </p>
      ) : (
        <div className="item-list">
          {itens.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}
