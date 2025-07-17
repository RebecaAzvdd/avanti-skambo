import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import { logout } from "../controllers/AuthController";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEditAccount = () => {
    console.log("edi");
  };

  return (
    <>
      <Header />
      <ProfileHeader
        user={user}
        onLogout={handleLogout}
        onEditAccount={handleEditAccount}
      />
    </>
  );
};

export default Profile;
