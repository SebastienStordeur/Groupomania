import React, { useState } from "react";
import Axios from axios;

const UpdateForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let id = 1; //A changer

  const updateUser = () => {

    const checkEmail = () => {

    }
    
    if(checkEmail() /* ajouter l'égalité des mdp */) {
      Axios({
        method: "POST",
        data: {
          email: email,
          password: confirmPassword,
        },
        withCredentials: true,
        url: `http://localhost:5000/users/${id}/updateProfile`,
        headers: {
          Authorization: "Bearer " + authToken,
        },
      }).then((res) => console.log(res))
    }

  }


  return (
    <div >
      <form className="update-user-form">
        <input className="email-input input" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input className="password-input input" value={password} placeholder="Nouveau mot de passe" onChange={(e) => setPassword(e.target.value)} />
        <input className="confirm-password-input input" value={confirmPassword} placeholder="Confirmation du mot de passe" onChange={(e) => setConfirmPassword(e.target.value)} />
      </form>
    </div>
  )
}

export default UpdateForm
