import React, { useState } from "react";
import Axios from "axios";
import Confirmation from "./Confirmation";
import Deny from "./Deny";
import { useHistory } from "react-router";
import axios from "axios";

const SignupForm = () => {
  
  const [newUser, setNewUser] = useState({
    lastname: "",
    firstname: "",
    email: "",
    password1: "",
    password2: "",
  })
/*   const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState(""); */
  const history = useHistory();
  const confirmPanel = document.querySelector(".confirm-panel");
  const denyPanel = document.querySelector(".deny-panel");

  const signup = (e) => {
    e.preventDefault();

    const checkRegisterForm = () => {
      const letterRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
      const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

      const letterChecking = () => {
        if(letterRegex.test(newUser.lastname) && letterRegex.test(newUser.firstname))
          return true;
        else {
          alert("Caractère(s) interdit(s) dans les champs Nom et/ou Prénom"); //Will be changed for something more visual
          return false;
        }
      };
      const emailChecking = () => {
        if (emailRegex.test(newUser.email)) return true;
        else {
          alert("Veuillez vérifier votre email");
          return false;
        }
      };
      const passwordChecking = () => {
        if (newUser.password1 === newUser.password2) return true;
        else {
          alert("Les mots de passe ne correspondent pas");
          return false;
        }
      };
      if (letterChecking() && emailChecking() && passwordChecking()) return true;
    };

    if (checkRegisterForm()) {
      axios.post("http://localhost:5000/users/signup", newUser)
      .then((res) => {
        if(res.status === 201) {
          denyPanel.style.display = "none";
          confirmPanel.style.display = "flex";
          setNewUser({
            lastname: "",
            firstname: "",
            email: "",
            password1: "",
            password2: "",
          })
          setTimeout(() => { 
            confirmPanel.style.display = "none"
            history.push("/login");
           }, 3000);
        }
      }, () => {
        denyPanel.style.display = "flex";
      });
    } 
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]:e.target.value})
  }

  return (
    <form className="register-form" onSubmit={signup}>
      <input
        className="input__field lastname-input"
        type="text"
        aria-label="Nom de famille"
        placeholder="Nom de famille"
        name="lastname"
        value={newUser.lastname}
        onChange={handleChange}
        required
      />
      <input
        className="input__field firstname-input"
        type="text"
        aria-label="Prénom"
        placeholder="Prénom"
        name="firstname"
        value={newUser.firstname}
        onChange={handleChange}
        required
      />
      <input
        className="input__field email-input"
        aria-label="email"
        type="text"
        placeholder="Email"
        name="email"
        value={newUser.email}
        onChange={handleChange}
        required
      />
        <input
          className="input__field password-input password1"
          type="password"
          aria-label="Mot de passe"
          placeholder="Mot de passe"
          name="password1"
          value={newUser.password1}
          onChange={handleChange}
          required
        />
        <span className="prerequis">Requis: Maj, min, chiffre, car spécial</span>
        <input
          className="input__field password-input password2"
          type="password"
          aria-label="Confirmation du mot de passe"
          placeholder="Confirmez le mot de passe"
          name="password2"
          value={newUser.password2}
          onChange={handleChange}
          required
        />
      <div className="btn-box register-box-btn">
        <button
          type="submit"
          className="register-btn btn"
          aria-label="Envoyer le formulaire"
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
