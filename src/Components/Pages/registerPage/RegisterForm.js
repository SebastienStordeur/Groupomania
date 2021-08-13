import React from "react";
import "../../../style.css";
import { AiFillEye} from "react-icons/ai";

const RegisterForm = () => {

  const form = document.querySelector('.register-form');
  const lastNameValue = document.querySelector('.lastname-input').value;
  const firstNameValue = document.querySelector('.firstname-input').value;
  const emailValue = document.querySelector('.email-input').value;

  const letters=/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  const emailRegex= /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  const showPassword = (e) => {
    const psw = e.target.parentNode.parentNode.firstChild
    e.preventDefault();
    if (psw.type === "password") psw.type = "text"
    else psw.type = "password"
  }

  const registerFormChecking = () => {

    lettersChecking();
    emailChecking();


    const lettersChecking = () => {
      if(letters.test(lastNameValue) && letters.test(firstNameValue)) return true
      else {
        alert('Caractères interdits dans les champs Nom et/ou Prénom');
        return false;
      }
    }
    const emailChecking = () => {
      if(emailRegex.test(emailValue)) return true;
      else {
        alert('Veuillez vérifier votre email');
        return false;
      }
    }

  }

  return (
    <form className="register-form">
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
        <div className="show-hide-icon">
          <AiFillEye style={{ cursor: "pointer" }} className="show-psw" onClick={showPassword}/>
        </div>
      </label>
      <label className="input">
        <input
          className="input__field password-input password2"
          type="password"
          placeholder="Confirmez le mot de passe"
          required
        />
        <div className="show-hide-icon">
          <AiFillEye style={{ cursor: "pointer" }} className="show-psw" onClick={showPassword}/>
        </div>
      </label>
      <div className="btn-box register-box-btn">
        <button type="submit" className="register-btn btn">
          S'inscrire
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
