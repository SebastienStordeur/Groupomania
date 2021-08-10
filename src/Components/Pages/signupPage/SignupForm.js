import React from "react";

const SignupForm = () => {
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
      </label>
      <div className="btn-box">
      <button className="btn signup-button">Se connecter</button> 
      </div>
    </form>
  );
};

export default SignupForm;
