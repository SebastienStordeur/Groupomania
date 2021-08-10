import React from "react";
import '../../../style.css';

const RegisterForm = () => {
  return (
    <div className="register-form">
      <label className="input" value="Nom de famille">
        <input
          className="input__field lastname-input"
          type="text"
          placeholder="Nom de famille"
          required
        />
      </label>
      <label className="input">
        <input
          className="input__field firstname-input"
          type="text"
          placeholder="Prénom"
          required
        />
      </label>
      <label className="input">
        <input
          className="input__field email-input"
          type="text"
          placeholder="Email"
          required
        />
      </label>
      <label className="input">
        <input
          className="input__field password-input password1"
          type="password"
          placeholder="Mot de passe"
          required
        />
      </label>
      <label className="input">
        <input
          className="input__field password-input password2"
          type="password"
          placeholder="Confirmez le mot de passe"
          required
        />
      </label>
      <div className="btn-box register-box-btn">
        <button type="submit" className="register-btn btn">S'inscrire</button>
      </div>
    </div>
  );
};

export default RegisterForm;
