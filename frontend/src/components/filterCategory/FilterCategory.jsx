import React from 'react';
import './FilterCategory.css';

export default function FilterCategory({ ativo, onClick, children }) {
  return (
    <button
      className={`tag-button ${ativo ? 'ativo' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
