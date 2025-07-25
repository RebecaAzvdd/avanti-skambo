import { useEffect, useState } from "react";
import { buscarPorId } from "../../../services/userService";
import "./ItemList.css";

const getImageUrl = (imageName) => {
  if (!imageName) return 'https://placehold.co/280x160/111/FFF?text=Sem+Imagem';
  return `http://localhost:3000/images/${imageName.replace('uploads/', '')}`;
};

export default function ItemList() {
  const [userItems, setUserItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      buscarPorId(user.id)
        .then((data) => {
          setUserItems(data?.itens || []);
        })
        .catch((err) => {
          console.error("Erro ao buscar itens do usuário:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <section className="items-section">
      <h2 className="section-title">Meus Itens</h2>

      {loading ? (
        <p className="empty-state">Carregando...</p>
      ) : userItems.length === 0 ? (
        <p className="empty-state">Você ainda não possui itens cadastrados.</p>
      ) : (
        <div className="items-grid">
          {userItems.map((item) => (
            <div key={item.id} className="item-card">
              <div className="item-image">
                {item.imagem ? (
                  <img src={getImageUrl(item.imagem)} alt={item.nome} />
                ) : (
                  <div className="placeholder-image">
                    {item.nome?.charAt(0).toUpperCase() || "?"}
                  </div>
                )}
              </div>
              <div className="item-content">
                <h3 className="item-name">{item.nome}</h3>
                <p className="item-description">{item.descricao}</p>
                <div className="item-meta">
                  <span className="item-category">{item.categoria}</span>
                  <span
                    className="item-status"
                    style={{
                      backgroundColor:
                        item.status === "disponível" ? "#10b981" : "#ef4444",
                    }}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
