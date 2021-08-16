import React from "react";
import "../../../style.css";
import { AiFillEye} from "react-icons/ai";

const RegisterForm = () => {



  const showPassword = (e) => {
    const psw = e.target.parentNode.parentNode.firstChild
    e.preventDefault();
    if (psw.type === "password") psw.type = "text"
    else psw.type = "password"
  }

   const registerFormChecking = () => {

    let lastNameValue = document.querySelector('.lastname-input').value;
    let firstNameValue = document.querySelector('.firstname-input').value;
    let emailValue = document.querySelector('.email-input').value;
    let password1Value = document.querySelector('.password1').value;

  
    const letters=/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    const emailRegex= /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    

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
    const passwordChecking = () => {

    }

    //if all 3 checking function have returned true, then true
    if(lettersChecking() && emailChecking() && passwordChecking()) return true
  } 
//Creation de l'objet à envoyer au back
/*    if(registerFormChecking()) {
    const contact = {
      lastname: lastNameValue,
      firstName: firstNameValue,
      email: emailValue,
      password: emailValue,
    }
  }  */

  return (
    <form className="register-form" onSubmit={registerFormChecking}>
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
        <button type="submit" className="register-btn btn" onClick={registerFormChecking}>
          S'inscrire
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
