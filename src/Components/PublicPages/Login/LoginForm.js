import React, { useState } from "react";
import FailLogin from "./FailLogin";
import Axios from "axios";
import { useHistory } from "react-router";


const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

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
      })
      .then((res) =>  {
        if(res.status === 200) {
          localStorage.setItem("authToken", JSON.stringify(res.data.token));
          history.push("/dashboard")
        }
      }, () => document.querySelector(".fail-login-panel").style.display = "flex" );
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
      <div className="btn-box">
        <button className="btn signup-button" onClick={login}>Se connecter</button>
      </div>
      <FailLogin className="fail-login-panel" />
    </form>
  );
};

export default LoginForm;