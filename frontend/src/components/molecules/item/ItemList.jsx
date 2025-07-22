import React, { useEffect, useState } from "react";
import {
  getAllItens,
  getItemsByCategory,
  getItemsByKeyWord,
} from "../../../services/itemService";
import ItemCard from "../../itemCard/ItemCard";
import FilterCategory from "../../filterCategory/FilterCategory";
import "./ItemList.css";

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchAll() {
      try {
        const data = await getAllItens();
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erro ao buscar todos os itens:", err);
        setItems([]);
      }
    }

    fetchAll();
  }, []);

  return (
    <>
      <FilterCategory onFilter={setItems} />

      <div className="item-list-page">
        <div className="item-list">
          {items && items.length > 0 ? (
            items.map((item) => <ItemCard key={item.id} item={item} />)
          ) : (
            <p>Nenhum item encontrado com os filtros aplicados.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ItemList;
