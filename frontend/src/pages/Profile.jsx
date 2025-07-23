import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import { logout } from "../controllers/AuthController";
import { useNavigate } from "react-router-dom";
import { getPropostaByUserId } from "../services/propostasService";
import PropostasList from "../components/molecules/PropostasList/PropostasList";
import EditProfile from "../components/molecules/EditProfile/EditProfile";
import Footer from "../components/footer/Footer";
const Profile = () => {
  const [user, setUser] = useState(null);
  const [propostas, setPropostas] = useState();
  const [loading, setLoading] = useState();
   const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
    } else {
       const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      getPropostaByUserId(parsedUser.id)
        .then((data) => {
          setPropostas(data);
        })
        .catch((err) => {
          console.error("Erro ao buscar propostas:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEditAccount = () => {
    setShowEditModal(true);
  };

  return (
    <>
      <Header />
      <ProfileHeader
        user={user}
        onLogout={handleLogout}
        onEditAccount={handleEditAccount}
      />
       {( user &&
        <PropostasList propostas={propostas} currentUserId={user.id}/>
       )}
       {showEditModal && (
            <EditProfile onClose={() => setShowEditModal(false)} />
          )}
          <Footer/>
    </>
  );
};

export default Profile;
