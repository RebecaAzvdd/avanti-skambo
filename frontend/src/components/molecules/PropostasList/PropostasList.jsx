import { useState } from "react";
import "./PropostasList.css";

export default function PropostasList({ propostas = [], currentUserId }) {
  const [activeTab, setActiveTab] = useState("enviadas");

  const proposalsEnviadas = propostas.filter((p) => p.userPropostaId === currentUserId);
  const proposalsRecebidas = propostas.filter((p) => p.userPropostaId !== currentUserId);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "em andamento":
        return "#f59e0b";
      case "aceita":
        return "#10b981";
      case "recusada":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const renderProposals = (proposals, type) => {
    const statusGroups = {
      "em andamento": proposals.filter((p) => p.status === "em andamento"),
      aceita: proposals.filter((p) => p.status === "aceita"),
      recusada: proposals.filter((p) => p.status === "recusada"),
    };

    return (
      <div className="proposals-content">
        {Object.entries(statusGroups).map(([status, statusProposals]) => (
          <div key={status} className="status-section">
            <h3 className="status-title">
              {status.charAt(0).toUpperCase() + status.slice(1)} ({statusProposals.length})
            </h3>
            <div className="proposals-list">
              {statusProposals.length > 0 ? (
                statusProposals.map((proposta) => (
                  <div key={proposta.id} className="proposal-card">
                    <div className="proposal-header">
                      <div className="proposal-items">
                        <div className="item-info">
                          <span className="item-label">
                            {type === "enviadas" ? "Item desejado:" : "Seu item:"}
                          </span>
                          <span className="item-name">{proposta.item?.nome}</span>
                          <span className="item-category">{proposta.item?.categoria}</span>
                        </div>
                        {proposta.itemProposto && (
                          <>
                            <div className="exchange-arrow">↔</div>
                            <div className="item-info">
                              <span className="item-label">
                                {type === "enviadas" ? "Seu item oferecido:" : "Item oferecido:"}
                              </span>
                              <span className="item-name">{proposta.itemProposto?.nome}</span>
                              <span className="item-category">{proposta.itemProposto?.categoria}</span>
                            </div>
                          </>
                        )}
                      </div>
                      <span
                        className="proposal-status"
                        style={{ backgroundColor: getStatusColor(proposta.status) }}
                      >
                        {proposta.status}
                      </span>
                    </div>
                    <div className="proposal-footer">
                      <span className="proposal-date">{formatDate(proposta.dataProposta)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-status">
                  <p>Nenhuma proposta {status}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="proposals-section">
      <div className="proposals-header">
        <h2 className="section-title">Propostas</h2>
        <div className="proposals-tabs">
          <button
            className={`tab-button ${activeTab === "enviadas" ? "active" : ""}`}
            onClick={() => setActiveTab("enviadas")}
          >
            Enviadas ({proposalsEnviadas.length})
          </button>
          <button
            className={`tab-button ${activeTab === "recebidas" ? "active" : ""}`}
            onClick={() => setActiveTab("recebidas")}
          >
            Recebidas ({proposalsRecebidas.length})
          </button>
        </div>
      </div>

      {activeTab === "enviadas" && renderProposals(proposalsEnviadas, "enviadas")}
      {activeTab === "recebidas" && renderProposals(proposalsRecebidas, "recebidas")}
    </div>
  );
}
