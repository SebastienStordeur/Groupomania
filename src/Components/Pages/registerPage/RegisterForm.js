import React, { useState } from "react";
import "../../../style.css";
import { AiFillEye } from "react-icons/ai";
import ConfirmRegister from "./ConfirmRegister";
import DenyRegister from "./DenyRegister";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const RegisterForm = () => {
  //Show password function onClick on the eye icon
  const showPassword = (e) => {
    const psw = e.target.parentNode.parentNode.firstChild;
    e.preventDefault();
    if (psw.type === "password") psw.type = "text";
    else psw.type = "password";
  };

  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const sendRegisterForm = (e) => {
    e.preventDefault();

    //CHECKING FORM CONTENT
    const checkRegisterForm = () => {
      /* e.preventDefault(); */
      const letterRegex =
        /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
      const emailRegex =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
      //Input validation for Lastname and Firstname
      const letterChecking = () => {
        if (letterRegex.test(lastname) && letterRegex.test(firstname))
          return true;
        else {
          alert("Caractère(s) interdit(s) dans les champs Nom et/ou Prénom"); //Will be changed for something more visual
          return false;
        }
      };
      //Input validation for email
      const emailChecking = () => {
        if (emailRegex.test(email)) return true;
        else {
          alert("Veuillez vérifier votre email");
          return false;
        }
      };
      //password validation, checking if both inputs values are the same
      const passwordChecking = () => {
        if (password1 === password2) return true;
        else {
          alert("Les mots de passe ne correspondent pas");
          return false;
        }
      };
      if (letterChecking() && emailChecking() && passwordChecking())
        return true;
    };

    //POST Form function
    const postRegisterForm = () => {
      let registerForm = JSON.parse(localStorage.getItem("RegisterForm"));
      const promise = fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        body: JSON.stringify(registerForm),
        headers: {
          "Content-Type" : "application/json"
        },
      });
      //Response
      promise.then(async (response) => {
        try {
          localStorage.clear();
          const responseContent = await response.json();
          console.log(responseContent);
        } catch (error) {
          alert("Une erreur s'est produite");
        }
      });
    };

      //If form datas are ok, then create register object to send it to the back
      if (checkRegisterForm()) {
        let register = {
          lastName: lastname,
          firstName: firstname,
          email: email,
          password: password2,
          imageUrl: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
        };
        console.log(register);
        localStorage.setItem("RegisterForm", JSON.stringify(register));
        postRegisterForm();
        
        //setTimeout(document.querySelector('.confirm-panel').style.display = "block", 3000);
        <Redirect to="/login" />
      } else {
        document.querySelector('.deny-panel').style.display = "block";
      }
  };

  return (
    <form className="register-form" onSubmit={sendRegisterForm}>
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
          onClick={sendRegisterForm}
        >
          S'inscrire
        </button>
      </div>
      <ConfirmRegister />
      <DenyRegister />
    </form>
  );
};

export default RegisterForm;
