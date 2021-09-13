import React, { useState } from "react";
import { AiFillEye} from "react-icons/ai";
import { Redirect } from "react-router-dom";
import {login} from '../../../utils/loginLogout';
import Axios from "axios";

const LoginForm = (props) => {
  
  //allow to toggle password visibility
  const showPassword = (e) => {
    const psw = e.target.parentNode.parentNode.firstChild;
    e.preventDefault();
    if (psw.type === "password") psw.type = "text";
    else psw.type = "password";
  };


  const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const loginFunction = (e) => {
    e.preventDefault();
    
    //Check email format
    const emailChecking = () => {
      if (emailRegex.test(email)) return true;
      else {
        alert("Veuillez vérifier votre email");
        return false;
      }
    };

    //Reach back, send promise and get response
     const postLogin = () => {
      let credentials = JSON.parse(localStorage.getItem('credentials'))
      //Promise
      const promise = fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-Type" : "application/json"
        },
      });
      //Response
      promise.then(async (response) => {
        try {
          localStorage.removeItem('credentials');
          const responseContent = await response.json();
          console.log(responseContent);
          return true
        } catch(error) {
          console.log(error);
          return false;
        };
      });
    }  

     if(emailChecking) {
      Axios({
        method: 'POST',
        data: {
          email: email,
          password: password
        },
        withCredentials: false, 
        url: "http://localhost:5000/api/auth/login"
      }).then((res) => console.log(res));
    };  

/*      if (emailChecking())  {
      let credentials = {
        email: email,
        password: password
      };
      console.log(credentials);
      localStorage.setItem('credentials', JSON.stringify(credentials));
      postLogin()
      if (!postLogin()){
        login();
      } */
    //}; 
  }

  const test = (e) => {
    e.preventDefault()
    //if(emailChecking) {
      Axios({
        method: 'POST',
        data: {
          email: email,
          password: password
        },
        withCredentials: true, 
        url: "http://localhost:5000/api/auth/login"
      }).then((res) => console.log(res));
    //};
  }

  return (
    <form className="login-form" onSubmit={test}>
      <label className="input" value="Adresse mail">
        <input
          className="input__field email-input"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="input" value="Mot de passe">
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
            className="show-psw"
            onClick={showPassword}
          />
        </div>
      </label>
      <div className="btn-box">
        <button className="btn signup-button" onClick={test}>Se connecter</button>
      </div>
    </form>
  );
};

export default LoginForm;
