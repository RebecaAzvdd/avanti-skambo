import './ItemCard.css';
import { User } from 'lucide-react';

// O componente recebe duas props:
// 1. 'item': O objeto com os dados do item a ser exibido.
// 2. 'onProposeClick': A função que será executada quando o botão for clicado.
const ItemCard = ({ item, onProposeClick }) => {
  // Constrói a URL completa para a imagem a partir do nome do ficheiro vindo da API
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
          // Fallback para caso a imagem não carregue
          onError={(e) => {
            console.error('Falha ao carregar a imagem:', imageUrl);
            e.target.onerror = null; 
            e.target.src = 'https://placehold.co/300x180/f3f4f6/6b7280?text=Imagem+Inválida';
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
          <User className="avatar"/>
          <span>{item.userResponsavel?.nome || 'Responsável não informado'}</span>
        </div>

        <div className="botoes">
          {/* O botão agora tem um evento onClick que chama a função recebida via props.
              É esta linha que faz a "magia" de abrir o modal acontecer. */}
          <button className="proposta" onClick={onProposeClick}>
            Fazer proposta
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
