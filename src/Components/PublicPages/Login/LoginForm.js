import React, { useState } from "react";
import { AiFillEye} from "react-icons/ai";
import Axios from "axios";

const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  const showPassword = (e) => {
    const psw = e.target.parentNode.parentNode.firstChild;
    e.preventDefault();
    if (psw.type === "password") psw.type = "text";
    else psw.type = "password";
  };

  const login = (e) => {
    e.preventDefault();
    const emailChecking = () => {
      if (emailRegex.test(email)) return true;
      else {
        alert("Veuillez vérifier votre email.");
        return false;
      }
    };

    if(emailChecking) {
      Axios({
        method: "POST",
        data: {
          email: email,
          password: password
        },
        withCredentials: true, 
        url: "http://localhost:5000/users/login",
      }).then((res) =>  console.log(res));
    };
  };

  return (
    <form className="login-form" onSubmit={login}>
      <label className="input" value="Adresse mail"></label>
        <input
          className="input__field email-input"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      <label className="input" value="Mot de passe"></label>
        <input
          className="input__field password-input" 
          type="password"
          placeholder="Mot de passe"
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="show-hide-icon">
          <AiFillEye
            style={{ cursor: "pointer" }}
            className="show-hide-btn"
            onClick={showPassword}
          />
        </div>
      <div className="btn-box">
        <button className="btn signup-button" onClick={login}>Se connecter</button>
      </div>
    </form>
  );
};

export default LoginForm;