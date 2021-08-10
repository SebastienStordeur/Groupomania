import React from "react";
import { Link } from "react-router-dom";
import "../../../../style.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <Link to="/register">
          <li><button className="btn register-page-btn">S'inscrire</button></li>
        </Link>
        <Link to="/signup">
          <li><button className="btn signup-btn">Se connecter</button></li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;