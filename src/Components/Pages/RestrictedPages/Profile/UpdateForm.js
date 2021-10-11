import React, { useState } from "react";
import Axios from "axios";

const UpdateForm = () => {

  const [lastName, setLastname] = useState("");
  const [firstName, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let id = 5; //A changer
  const updateUser = () => {

    const letterRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    const checkNames = () => {
      if(letterRegex.test(lastName) && letterRegex.test(firstName)) return true;
      else {
        alert("Caractères interdits dans les champs Nom et/ou Prénom");
        return false;
      };
    };

    const checkEmail = () => {
      if(emailRegex.test(email)) return true;
      else {
        alert("Caractères interdits dans le champ Nom et/ou Prénom");
        return false;
      };
    };
    
    const checkPasswords = () => {
      if(password === confirmPassword ) return true;
      else {
        alert("Les mots de passe ne correspondent pas");
        return false;
      };
    };

    if(checkNames() && checkEmail() && checkPasswords()) {
      Axios({
        method: "PUT",
        data: {
          lastName: lastName,
          firstName: firstName,
          email: email,
          password: confirmPassword,
        },
        withCredentials: true,
        url: `http://localhost:5000/users/${id}/updateProfile`,
        /* headers: {
          Authorization: "Bearer " + authToken,
        }, */
      })
      .then((res) => {
        console.log(res)
        setLastname(""); 
        setFirstname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      })
    };
  }


  return (
    <div >
      <form className="update-user-form" onSubmit={updateUser}>
      <input className="lastname-input input" value={lastName} placeholder="Nom de famille" onChange={(e) => setLastname(e.target.value)} />
        <input className="lastname-input input" value={firstName} placeholder="Nom de famille" onChange={(e) => setFirstname(e.target.value)} />
        <input className="email-input input" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input className="password-input input" value={password} placeholder="Nouveau mot de passe" onChange={(e) => setPassword(e.target.value)} />
        <input className="confirm-password-input input" value={confirmPassword} placeholder="Confirmation du mot de passe" onChange={(e) => setConfirmPassword(e.target.value)} />
      </form>
    </div>
  )
}

export default UpdateForm
