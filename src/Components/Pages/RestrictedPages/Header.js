import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";
import { RiAdminFill } from "react-icons/ri";

const Header = () => {

  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const tokenPart = authToken.split(".");
  const encodedPayload = tokenPart[1];
  const rawPayload = atob(encodedPayload);
  const user = JSON.parse(rawPayload);
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("authToken");
    history.push("/login")
  }

  return (
    <header className="restricted-header header">
      <nav className="icons-container">
        {(user.isAdmin === true) &&
          <Link to="/admin" aria-label="Lien vers la page admin">
            <RiAdminFill size={32} className="admin-icon menu-icon"/>
          </Link>
        }
        <Link to="/dashboard" aria-label="Lien vers le dashboard">
          <AiFillHome size={32} className="home-icon menu-icon" />
        </Link>
        <Link to={`/profile/${user.userId}`} aria-label="Lien vers votre profil">
          <FaUserAlt size={30} className="profile-icon menu-icon" />
        </Link>
      </nav>
      <div className="disconnect-box">
        <button className="disconnect" onClick={logout} aria-label="Bouton de déconnexion"><span>Deconnexion</span> <GiExitDoor size={32}/></button>
      </div>
    </header>
  )
}

export default Header

