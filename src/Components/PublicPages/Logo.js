import React from "react";
import logo from "../../images/icon-above-font.png";

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={logo} alt="Groupomania Logo" className="logo-img" />
    </div>
  );
};

export default Logo;