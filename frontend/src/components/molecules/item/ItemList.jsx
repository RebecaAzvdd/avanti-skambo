import React, { useEffect, useState } from "react";
import { getAllItens } from "../../../services/itemService";
import ItemCard from "../../itemCard/ItemCard";
import "./ItemList.css";
import ModalItem from "../ModalItem/ModalItem";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [modal, setModal] = useState(false);

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
      {/* <div>
        <button onClick={() => setModal(true)}>criar item teste</button>
        {modal && (
          <ModalItem
            onClose={() => setModal(false)}
            onSuccess={handleSucess}
          ></ModalItem>
        )}
      </div> */}
      <div className="item-list-page">
        <div className="item-list">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ItemList;
