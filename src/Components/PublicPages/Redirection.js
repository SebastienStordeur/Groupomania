import React from 'react'
import { Link } from "react-router-dom";
import Logo from "../../images/icon-above-font.png"

const Redirection = () => {
  return (
    <main class="main-error">
      <h1>Cliquer <Link to="/dashboard" className="link">ICI</Link> pour être redirigé.</h1>
      <div className="error-container">
        <img className="img-error" alt="Error 404" src={Logo} />
      </div>
    </main>
  )
}

export default Redirection
