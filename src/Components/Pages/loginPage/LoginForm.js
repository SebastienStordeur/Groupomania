import React, { useState } from 'react';
import { AiFillEye} from 'react-icons/ai';
import { Redirect } from 'react-router-dom';
import {login} from '../../../utils/loginLogout';
import Axios from 'axios';

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
    const emailChecking = () => {
      if (emailRegex.test(email)) return true;
      else {
        alert("Veuillez vérifier votre email");
        return false;
      }
    };

/*     function setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      let expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    } */

    if(emailChecking) {
      Axios({
        method: 'POST',
        data: {
          email: email,
          password: password
        },
        withCredentials: true, 
        url: "http://localhost:5000/api/auth/login",
      }).then((res) =>  {
        console.log(res)
        //setCookie('id', JSON.stringify(res.data.id))
        document.cookie=`id=${res.data.id}`
        //setCookie('name', JSON.stringify(res.data.lastName))
        //setCookie("Infos", res.data.id)
        //document.cookie = JSON.stringify(res.data.id);
        localStorage.setItem('test', JSON.stringify(res));

        //document.cookie="cookiename=;expires = Thu, 01 Jan 1970 00:00:00 GMT"
      })
    };
  };

  return (
    <form className="login-form" onSubmit={loginFunction}>
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
        <button className="btn signup-button" onClick={loginFunction}>Se connecter</button>
      </div>
    </form>
  );
};

export default LoginForm;