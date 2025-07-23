import { useEffect, useState } from "react";
import { getAllItens } from "../../../services/itemService";
import ItemCard from "../../itemCard/ItemCard";
import "./ItemSection.css";

const ItemSection = ({onProposeClick}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const data = await getAllItens();
        setItems(data);
      } catch (err) {
        console.error("Erro ao buscar itens:", err);
      }
    }

    fetchItems();
  }, []);

  const handleSucess = (novoItem) => {
    setItems((prev) => [novoItem, ...prev]);
  };

  return (
    <>
      <div className="item-section-page">
        <div className="item-section">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} onProposeClick={() => onProposeClick(item)}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default ItemSection;
