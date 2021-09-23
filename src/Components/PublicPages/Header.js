import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="public-header header">
      <nav className="navbar">
        <ul className="navbar__list">
          <Link to="/">
            <li><button className="btn signup-btn">S'inscrire</button></li>
          </Link>
          <Link to="/login">
            <li><button className="btn login-btn">Se connecter</button></li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;