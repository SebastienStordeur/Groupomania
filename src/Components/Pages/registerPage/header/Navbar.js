import React from "react";
import { Link } from "react-router-dom";
import "../../../../style.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <Link to="/">
          <li><button className="btn register-page-btn">S'inscrire</button></li>
        </Link>
        <Link to="/login">
          <li><button className="btn signup-btn">Se connecter</button></li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
