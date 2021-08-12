import React from "react";
import { AiFillEye} from "react-icons/ai";

const LoginForm = () => {
  const showPassword = (e) => {
    const psw = e.target.parentNode.parentNode.firstChild;
    e.preventDefault();
    if (psw.type === "password") psw.type = "text";
    else psw.type = "password";
  };

  return (
    <form className="signup-form">
      <label className="input" value="Adresse mail">
        <input
          className="input__field email-input"
          type="text"
          placeholder="Email"
          required
        />
      </label>
      <label className="input" value="Mot de passe">
        <input
          className="input__field"
          type="password"
          placeholder="Mot de passe"
          required
        />
        <div className="show-hide-icon">
          <AiFillEye
            style={{ cursor: "pointer" }}
            className="show-psw"
            onClick={showPassword}
          />
        </div>
      </label>
      <div className="btn-box">
        <button className="btn signup-button">Se connecter</button>
      </div>
    </form>
  );
};

export default LoginForm;
