import React from "react";
import "../../../style.css";
import { AiFillEye } from "react-icons/ai";

const RegisterForm = () => {

  //Show password function onClick on the eye icon
  const showPassword = (e) => {
    const psw = e.target.parentNode.parentNode.firstChild
    e.preventDefault();
    if (psw.type === "password") psw.type = "text"
    else psw.type = "password"
  }

  let lastNameValue = document.querySelector('.lastname-input').value;
  let firstNameValue = document.querySelector('.firstname-input').value;
  let emailValue = document.querySelector('.email-input').value;
  let password1Value = document.querySelector('.password1').value;
  let password2Value = document.querySelector('.password2').value;

  //Check form and forbid some character to prevent security breach
  const registerFormChecking = (e) => {

    const letters=/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    const emailRegex= /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    e.preventDefault();

    //Input validation for lastname and firstname
    const lettersChecking = () => {
      if(letters.test(lastNameValue) && letters.test(firstNameValue)) return true
      else {
        alert('Caractères interdits dans les champs Nom et/ou Prénom');
        return false;
      }
    }
    //Input validation for email
    const emailChecking = () => {
      if(emailRegex.test(emailValue)) return true;
      else {
        alert('Veuillez vérifier votre email');
        return false;
      }
    }
    //password validation, checking if both inputs values are the same
    const passwordChecking = () => {
      if (password1Value === password2Value) return true;
      else {
        alert('Les mots de passe ne correspondent pas');
        return false;
      }
    }
    //if all 3 checking function have returned true, then true (used for submitting the form)
    if(lettersChecking() && emailChecking() && passwordChecking()) return true
  }

    //Post form function
  const postRegisterForm = () => {
    let contact = JSON.parse(localStorage.getItem('RegisterForm'));
    const promise = fetch('http://localhost:5000/api/auth/register', {
      method: "POST",
      body: JSON.stringify(contact),
      headers: {
        "Content-Type" : "application/json"
      },
    })
    //Response
    promise.then(async(response) => {
      try {
        localStorage.clear();
        //const responseContent = await response.json();
      } catch(error) {
        alert("Une erreur s'est produite");
      }
    })
  }

  //Creation de l'objet à envoyer au back
  if(registerFormChecking()) {
    const contact = {
      lastname: lastNameValue,
      firstName: firstNameValue,
      email: emailValue,
      password: password2Value,
    }
  localStorage.setItem('RegisterForm', JSON.stringify(contact));
  postRegisterForm()
  }

  return (
    <form className="register-form" onSubmit={registerFormChecking()}>
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
