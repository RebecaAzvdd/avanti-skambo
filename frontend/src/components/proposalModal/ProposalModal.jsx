import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProposalModal.css';

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="close-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Dados de exemplo para que o visual funcione
const mockUserItems = [
  { id: 'item-user-1', nome: 'Livro: O Senhor dos Anéis', imagem: 'uploads/senhor-aneis.webp' },
  { id: 'item-user-2', nome: 'Headset JBL Quantum', imagem: 'uploads/headset-jbl.webp' },
  { id: 'item-user-5', nome: 'Mouse Logitech G203', imagem: 'uploads/mouse-logitech.webp' },
  { id: 'item-user-7', nome: 'Ténis Nike Revolution', imagem: 'uploads/tenis-nike.webp' },
];

const getImageUrl = (imageName) => {
  if (!imageName) return 'https://placehold.co/150x150/111/FFF?text=Sem+Imagem';
  return `http://localhost:3000/images/${imageName.replace('uploads/', '')}`;
};

export default function ProposalModal({ isOpen, onClose, targetItem }) {
  const [userItems, setUserItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      // Usamos os dados de exemplo quando o modal abre
      setUserItems(mockUserItems);
      setSelectedItemId(null);
    }
  }, [isOpen]);

  const handleProposalSubmit = () => {
    if (!selectedItemId) {
      alert('Por favor, selecione um item para propor a troca.');
      return;
    }
    console.log(`Proposta enviada: Trocar item ${selectedItemId} pelo item ${targetItem.id}`);
    alert('Proposta enviada com sucesso! (Simulação)');
    onClose();
  };

  // Variantes de animação para o fundo e o modal
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { y: "-50px", opacity: 0, transition: { duration: 0.2 } },
    visible: { y: "0", opacity: 1, transition: { delay: 0.1, type: 'spring', stiffness: 120 } },
  };

  const selectedItem = userItems.find(item => item.id === selectedItemId);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Fazer Proposta</h2>
              <button onClick={onClose} className="close-button">
                <CloseIcon />
              </button>
            </div>
            <div className="modal-body">
              <div className="proposal-details">
                <div className="item-display">
                  <span>Você quer:</span>
                  <div className="item-card-target">
                    <img src={getImageUrl(targetItem?.imagem)} alt={targetItem?.nome} />
                    <p>{targetItem?.nome}</p>
                  </div>
                </div>
                <div className="exchange-arrow">→</div>
                <div className="item-display">
                  <span>Oferecer em troca:</span>
                  <div className={`item-card-offer ${!selectedItemId ? 'placeholder' : ''}`}>
                    {selectedItem ? (
                      <>
                        <img src={getImageUrl(selectedItem.imagem)} alt={selectedItem.nome} />
                        <p>{selectedItem.nome}</p>
                      </>
                    ) : (
                      <span>Selecione um item</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="user-items-list">
                <h3>Os Seus Itens Disponíveis</h3>
                <div className="items-grid">
                  {userItems.map((item) => (
                    <div
                      key={item.id}
                      className={`user-item-card ${selectedItemId === item.id ? 'selected' : ''}`}
                      onClick={() => setSelectedItemId(item.id)}
                    >
                      <img src={getImageUrl(item.imagem)} alt={item.nome} />
                      <p>{item.nome}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="button-secondary" onClick={onClose}>Cancelar</button>
              <button 
                className="button-primary" 
                onClick={handleProposalSubmit} 
                disabled={!selectedItemId}
              >
                Enviar Proposta
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
