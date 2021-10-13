import React, { useState } from "react";
import Axios from "axios";
import { useParams } from "react-router";

const UpdateForm = () => {

  const [lastName, setLastname] = useState("");
  const [firstName, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [job, setJob] = useState("");
  const regex = /@"^[A-Za-z0-9\s@]*$"/;
  const letterRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
  const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const authToken = JSON.parse(localStorage.getItem("authToken"));
  let { id } = useParams();

  const updateUser = () => {

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
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then(() => {
        setLastname(""); 
        setFirstname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      })
    };
  }

  const updateBio = (e) => {
    e.preventDefault();
    const checkbio = () => {
      if(regex.test(bio)) return true;
      else{
        alert("Caractères interdits dans la bio.")
        return false;
      };
    };
    if(checkbio) {
      Axios({ 
        method: "PUT",
        data: { bio: bio },
        withCredentials: true,
        url: `http://localhost:5000/users/${id}/updateBio`,
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then((res) => { if(res.status === 201) setBio("") }
      );
    };
  };

  const updateJob = (e) => {
    e.preventDefault();
    const checkJob = () => {
      if(letterRegex.test(job)) return true;
      else {
        alert("Caractères interdits dans 'job'.");
        return false;
      };
    };
    if(checkJob) {
      Axios({
        method: "PUT",
        data: { job: job },
        withCredentials: true,
        url: `http://localhost:5000/users/${id}/updateJob`,
        headers: {
          Authorization: "Bearer " + authToken,
        },
      })
      .then((res) =>  { 
        if(res.status ===201) { 
          setJob(""); 
          console.log(res.data.message)
        } else { 
          console.log(res.data.message)
        } 
      })
    }
  }

  return (
    <div className="update-forms-container">
      <div>
        <form className="update-user-form" onSubmit={updateUser}>
          <input className="lastname-input input-update" value={lastName} placeholder="Nom de famille" onChange={(e) => setLastname(e.target.value)} />
          <input className="lastname-input input-update" value={firstName} placeholder="Prénom" onChange={(e) => setFirstname(e.target.value)} />
          <input className="email-input input-update" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input className="password-input input-update" type="password" value={password} placeholder="Nouveau mot de passe" onChange={(e) => setPassword(e.target.value)} />
          <input className="confirm-password-input input-update" type="password" value={confirmPassword} placeholder="Confirmation du mot de passe" onChange={(e) => setConfirmPassword(e.target.value)} />
          <button className="btn" type="submit" onSubmit={updateUser}>Envoyer</button>
        </form>
        <form className="update-bio" onSubmit={updateBio}>
          <input className="bio-input input-update" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Votre nouvelle bio" />
          <button className="btn" type="submit"  onSubmit={updateBio}>Envoyer</button>
        </form>
        <form className="update-job" onSubmit={updateJob}>
          <input className="job-input input-update" value={job} onChange={(e) => setJob(e.target.value)} placeholder="Rôle au sein de l'entreprise.." />
          <button className="btn" type="submit" onSubmit={updateJob}>Envoyer</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateForm
