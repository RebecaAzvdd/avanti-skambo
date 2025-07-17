import "./ProfileHeader.css"

interface User {
  id: string;
  nome: string;
  email: string;
  senha: string;
}

interface ProfileHeaderProps {
  user: User;
  onLogout: () => void;
  onEditAccount: () => void;
}

export default function ProfileHeader({
  user,
  onLogout,
  onEditAccount,
}: ProfileHeaderProps) {
    if (!user) return null;
  return (
    <div className="profile-header">
      <div className="profile-info">
        <div className="avatar-user">{user.nome.charAt(0).toUpperCase()}</div>
        <div className="user-details">
          <h1 className="user-name">{user.nome}</h1>
          <p className="user-email">{user.email}</p>
        </div>
      </div>
      <div className="profile-actions">
        <button className="edit-btn" onClick={onEditAccount}>
          Editar Conta
        </button>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
