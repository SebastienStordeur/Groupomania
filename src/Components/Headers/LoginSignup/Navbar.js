import React from 'react'
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <Link to="/register"><li>S'inscrire</li></Link>
        <Link to="/signup"><li>Se connecter</li></Link>
      </ul>
    </nav>
  )
}

export default Navbar
