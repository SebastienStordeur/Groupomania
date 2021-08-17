import React, {useState} from "react";
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

  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const checkRegisterForm = (e) => {
    e.preventDefault();
    const letterRegex=/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    const emailRegex= /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    //Input validation for Lastname and Firstname
    const letterChecking = () => {
      if (letterRegex.test(lastname) && letterRegex.test(firstname)) return true
      else {
        alert('caractère interdit dans les champs Nom et/ou Prénom'); //Will be changed for something more visual
        return false;
      }
    }
    //Input validation for email
    const emailChecking = () => {
      if(emailRegex.test(email)) return true;
      else {
        alert('Veuillez vérifier votre email');
        return false;
      }
    }
    //password validation, checking if both inputs values are the same
    const passwordChecking = () => {
      if (password1 === password2) return true;
      else {
        alert('Les mots de passe ne correspondent pas');
        return false;
      }
    }

    //if all 3 checking function have returned true, then true (used for submitting the form)
    if(letterChecking() && emailChecking() && passwordChecking()) return true  
  }

 /*  

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
  }  */

  return (
    <form className="register-form" >
      <label className="input" value="Nom de famille" htmlFor="lastname"></label>
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
          <AiFillEye style={{ cursor: "pointer" }} className="show-psw" onClick={showPassword}/>
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
          <AiFillEye style={{ cursor: "pointer" }} className="show-psw" onClick={showPassword}/>
        </div>
      </label>
      <div className="btn-box register-box-btn">
        <button type="submit" className="register-btn btn" >
          S'inscrire
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
