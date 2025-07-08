import React from 'react';
import './ItemCard.css';

const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <div className="status-categoria">
        <span className="badge status">{item.status}</span>
        <span className="badge categoria">{item.categoria}</span>
      </div>

      <div className="imagem">
        {item.imagem ? (
          <img src={item.imagem} alt={item.nome} />
        ) : (
          <div className="no-image">Sem imagem</div>
        )}
      </div>

      <div className="conteudo">
        <h3>{item.nome}</h3>
        <p>{item.descricao}</p>

        <div className="responsavel">
          <img src="/placeholder-user.png" alt="avatar" className="avatar" />
          <span>{item.userResponsavel?.nome || 'Responsável'}</span>
        </div>

        <div className="acoes">
          <span>{item.qtdPropostas || 0} propostas</span>
        </div>

        <div className="botoes">
          <button className="proposta">Fazer proposta</button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
