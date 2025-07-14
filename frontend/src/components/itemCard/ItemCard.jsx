import './ItemCard.css';
import { User } from 'lucide-react';
const ItemCard = ({ item }) => {
  const imageUrl = item.imagem 
    ? `http://localhost:3000/images/${item.imagem.replace('uploads/', '')}`
    : null;

  return (
    <div className="item-card">
      <div className="status-categoria">
        <span className="badge">{item.status}</span>
        <span className="badge">{item.categoria}</span>
      </div>

      <div className="imagem">
      {imageUrl ? (
        <img 
          src={imageUrl}
          alt={item.nome}
          onError={(e) => {
            console.error('Falha ao carregar:', imageUrl);
            e.target.style.display = 'none';
          }}
        />
      ) : (
        <div className="no-image">Sem imagem</div>
      )}
    </div>

      <div className="conteudo">
        <h3>{item.nome}</h3>
        <p>{item.descricao}</p>

        <div className="responsavel">
          <User class="avatar"/>
          <span>{item.userResponsavel?.nome || 'Responsável'}</span>
            <div className="acoes">
          <span>Propostas {item.qtdPropostas || 0}</span>
        </div>
        </div>

        <div className="botoes">
          <button className="proposta">Fazer proposta</button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
