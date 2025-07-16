import Header from "../components/header/Header";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import { logout } from "../controllers/AuthController";

  const handleLogout = () => {
    console.log("Logout realizado")
  }

  const handleEditAccount = () => {
    console.log("Editar conta")
  }
  
const user = {
    id:"b835dd5d-8c05-4621-9dea-b9b8bfba0368",
    nome: "Alice Santos",
    email:"alice@example.com",
    senha: "$2b$10$.I.44t8uXqmGtilmB2I.suFlW3oUHvD./0dln3j1B8sAg1bN36lZK"
}
  
const Profile = () => {
    return(
        <>
        <Header/>
        <ProfileHeader user={user} onLogout={handleLogout} onEditAccount={handleEditAccount}/>
        </>
    );
}

export default Profile;