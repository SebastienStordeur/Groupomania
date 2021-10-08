import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";
import axios from "axios";

const Header = () => {

  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const tokenPart = authToken.split(".");
  const encodedPayload = tokenPart[1];
  const rawPayload = atob(encodedPayload);
  const user = JSON.parse(rawPayload);

  const logout = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/users/logout",
      headers: {
        Authorization: "Bearer " + authToken,
      }
    }).then((res) => console.log(res));
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

