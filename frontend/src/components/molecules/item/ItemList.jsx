import React, { useEffect, useState } from "react";
import { getAllItens, getItemsByCategory, getItemsByKeyWord } from "../../../services/itemService";
import ItemCard from "../../itemCard/ItemCard";
import FilterCategory from "../../filterCategory/FilterCategory";
import "./ItemList.css";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    fetchAndSetItems();
  }, []);

  async function fetchAndSetItems(categoria = "Todos", termo = "") {
    try {
      let data;
      if (categoria !== "Todos" && termo) {
        data = await getItemsByKeyWord(termo);
        if (data.length === 0) {
             data = await getItemsByCategory(categoria);
        }
      } else if (categoria !== "Todos") {
        data = await getItemsByCategory(categoria);
      } else if (termo) {
        data = await getItemsByKeyWord(termo);
      } else {
        data = await getAllItens();
      }
      
      setItems(Array.isArray(data) ? data : []); 
      setFilteredItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erro ao buscar itens:", err);
      setItems([]); 
      setFilteredItems([]);
    }
  }

  const handleFilter = ({ categoria, termo }) => {
    fetchAndSetItems(categoria, termo);
  };

  const handleSucess = (novoItem) => {
    setItems((prev) => Array.isArray(prev) ? [novoItem, ...prev] : [novoItem]);
    setFilteredItems((prev) => Array.isArray(prev) ? [novoItem, ...prev] : [novoItem]);
  };

  return (
    <>
      <FilterCategory onFilter={handleFilter} />

      <div className="item-list-page">
        <div className="item-list">
          {filteredItems && filteredItems.length > 0 ? ( 
            filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))
          ) : (
            <p>Nenhum item encontrado com os filtros aplicados.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ItemList;