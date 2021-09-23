import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { GiExitDoor } from "react-icons/gi";

const Header = () => {
  return (
    <header className="restricted-header header">
      <div className="icons-container">
        <Link to="/dashboard">
          <AiFillHome size={32} className="home-icon menu-icon" />
        </Link>
        <Link to="/profile">
          <FaUserAlt size={30} className="profile-icon menu-icon" />
        </Link>
      </div>
      <div className="disconnect-box">
        <h2 className="disconnect">Deconnexion <GiExitDoor size={32}/></h2>
      </div>
    </header>
  )
}

export default Header

