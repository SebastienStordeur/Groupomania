import React, { useState } from "react";
import Axios from "axios";
import Confirmation from "./Confirmation";
import Deny from "./Deny";
import { Redirect } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";

const SignupForm = () => {
  
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const showPassword = (e) => {
    const psw = e.target.parentNode.parentNode.firstChild;
    e.preventDefault();
    if (psw.type === "password") psw.type = "text";
    else psw.type = "password";
  };

  const signup = (e) => {
    e.preventDefault();

    const checkRegisterForm = () => {
      const letterRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
      const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

      const letterChecking = () => {
        if(letterRegex.test(lastname) && letterRegex.test(firstname))
          return true;
        else {
          alert("Caractère(s) interdit(s) dans les champs Nom et/ou Prénom"); //Will be changed for something more visual
          return false;
        }
      };
      const emailChecking = () => {
        if (emailRegex.test(email)) return true;
        else {
          alert("Veuillez vérifier votre email");
          return false;
        }
      };
      const passwordChecking = () => {
        if (password1 === password2) return true;
        else {
          alert("Les mots de passe ne correspondent pas");
          return false;
        }
      };
      if (letterChecking() && emailChecking() && passwordChecking()) return true;
    };

    if (checkRegisterForm()) {
      Axios({
        method: "POST",
        data: {
          lastName: lastname,
          firstName: firstname,
          email: email,
          password: password2
        },
        withCredentials: true,
        url: "http://localhost:5000/users/signup",
      })
      .then((res) => {
        if(res.status === 201) {
          document.querySelector(".confirm-panel").style.display = "flex";
        } 
        else {
          document.querySelector(".deny-panel").style.display = "flex";
        }
      });
    } 
  };

  return (
    <form className="register-form" onSubmit={signup}>
      <label
        className="input"
        value="Nom de famille"
        htmlFor="lastname"
      ></label>
      <input
        className="input__field lastname-input"
        type="text"
        placeholder="Nom de famille"
        name="lastname"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        required
      />
      <label className="input" htmlFor="firstname"></label>
      <input
        className="input__field firstname-input"
        type="text"
        placeholder="Prénom"
        name="firstname"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        required
      />
      <label className="input" htmlFor="email"></label>
      <input
        className="input__field email-input"
        type="text"
        placeholder="Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label className="input">
        <input
          className="input__field password-input password1"
          type="password"
          placeholder="Mot de passe"
          name="password1"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          required
        />
        <div className="show-hide-icon">
          <AiFillEye
            size={20}
            style={{ cursor: "pointer" }}
            className="show-psw"
            onClick={showPassword}
          />
        </div>
      </label>
      <label className="input">
        <input
          className="input__field password-input password2"
          type="password"
          placeholder="Confirmez le mot de passe"
          name="password2"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
        />
        <div className="show-hide-icon">
          <AiFillEye
            size={20}
            style={{ cursor: "pointer" }}
            className="show-psw"
            onClick={showPassword}
          />
        </div>
      </label>
      <div className="btn-box register-box-btn">
        <button
          type="submit"
          className="register-btn btn"
          onClick={signup}
        >
          S'inscrire
        </button>
      </div>
      <Confirmation className="confirm-panel"/>
      <Deny className="deny-panel" />
    </form>
  );
};

export default SignupForm;
