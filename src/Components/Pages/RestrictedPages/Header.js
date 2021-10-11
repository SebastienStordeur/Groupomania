import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";

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
      <div className="icons-container">
        <Link to="/dashboard">
          <AiFillHome size={32} className="home-icon menu-icon" />
        </Link>
        <Link to={`/profile/${user.userId}`}>
          <FaUserAlt size={30} className="profile-icon menu-icon" />
        </Link>
      </div>
      <div className="disconnect-box">
        <h2 className="disconnect" onClick={logout}><span>Deconnexion</span> <GiExitDoor size={32}/></h2>
      </div>
    </header>
  )
}

export default Header

