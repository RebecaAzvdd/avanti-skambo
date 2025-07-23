import { useEffect, useState } from "react";
import { getAllItens } from "../../../services/itemService";
import ItemCard from "../../itemCard/ItemCard";
import "./ItemSection.css";
import FilterCategory from "../../filterCategory/FilterCategory";

const ItemSection = ({ onProposeClick }) => {
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

  const handleSucess = (novoItem) => {
    setItems((prev) => [novoItem, ...prev]);
  };

  return (
    <>
      <FilterCategory onFilter={setItems} />
      <div className="item-section-page">
        <div className="item-section">
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

export default ItemSection;
