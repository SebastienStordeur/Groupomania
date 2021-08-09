import React from "react";
import { Link } from "react-router-dom";
import "../../../style.css";

const Navbar = () => {
  return (
    <header className="signup-header">
      <nav className="navbar">
        <ul className="navbar__list">
          <Link to="/register">
            <li>S'inscrire</li>
          </Link>
          <li className="navbar__logo">
            <img
              className="logo"
              src="../../../images/icon.png"
              alt="Groupomania Logo"
            />
          </li>
          <Link to="/signup">
            <li>Se connecter</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
