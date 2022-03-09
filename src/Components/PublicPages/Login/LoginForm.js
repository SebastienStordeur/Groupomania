import React, { useState } from "react";
import FailLogin from "./FailLogin";
import axios from "axios";
import { useHistory } from "react-router";

const LoginForm = () => {

  const [user, setUser] = useState({
    email:"",
    password:"",
  })
  let history = useHistory();

  const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  const login = (e) => {
    e.preventDefault();
    const emailChecking = () => {
      if (emailRegex.test(user.email)) return true;
      else {
        alert("Veuillez vérifier votre email.");
        return false;
      }
    };

    if(emailChecking) {
      axios.post("http://localhost:5000/users/login", user)
      .then((res) =>  {
        if(res.status === 200) {
          localStorage.setItem("authToken", JSON.stringify(res.data.token));
          history.push("/dashboard")
        }
      }, () => document.querySelector(".fail-login-panel").style.display = "flex" );
    };
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]:e.target.value})
  }

  return (
    <form className="login-form" onSubmit={login}>
        <input
          className="input__field email-input"
          type="text"
          aria-label="Email"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <input
          className="input__field password-input" 
          type="password"
          aria-label="Mot de passe"
          placeholder="Mot de passe"
          name="password"
          value={user.password} 
          onChange={handleChange}
          required
        />
      <div className="btn-box">
        <button className="btn signup-button" aria-label="Login" onClick={login}>Se connecter</button>
      </div>
      <FailLogin className="fail-login-panel" />
    </form>
  );
};

export default LoginForm;