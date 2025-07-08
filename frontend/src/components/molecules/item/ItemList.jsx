import React, { useEffect, useState } from 'react';
import { getAllItens } from '../../../services/itemService';
import ItemCard from '../../itemCard/ItemCard';
import './ItemList.css'; 

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const data = await getAllItens();
        setItems(data);
      } catch (err) {
        console.error('Erro ao buscar itens:', err);
      }
    }

    fetchItems();
  }, []);

  return (
    <div className="item-list-page">
      <div className="item-list">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ItemList;
