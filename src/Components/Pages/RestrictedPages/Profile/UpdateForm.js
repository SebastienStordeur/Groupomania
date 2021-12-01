import React, { useState } from "react";
import Axios from "axios";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom"
import DenyUpdate from "./DenyUpdate";
import ConfirmUpdate from "./confirmUpdate";

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
  const tokenPart = authToken.split(".");
  const encodedPayload = tokenPart[1];
  const rawPayload = atob(encodedPayload);
  const userToken = JSON.parse(rawPayload);

  let { id } = useParams();
  const deletePop = document.querySelector(".delete-modal");
  const showDeletePop = () => deletePop.classList.toggle("show-delete");
  const history = useHistory();

  const confirmPanel = document.querySelector(".confirm-panel");
  const denyPanel = document.querySelector(".deny-panel");

  const updateUser = (e) => {

    e.preventDefault();

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
      .then((res) => {
        if(res.status === 201) {
          denyPanel.style.display = "none";
          confirmPanel.style.display = "flex";
          setLastname(""); 
          setFirstname("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setTimeout(() => {
            confirmPanel.style.display = "none";
            window.location.reload(false)
          }, 1000);
        }
      }, () => {
        denyPanel.style.display = "flex";
      });
    }
  };

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
      .then((res) => { 
        if(res.status === 201) {
          setBio("")
          window.location.reload(false);
        }
      });
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
        if(res.status === 201) { 
          setJob("");
          window.location.reload(false);
        };
      })
    }
  }

  const deleteProfile = () => {
    Axios({
      method: "DELETE",
      withCredentials: true,
      url: `http://localhost:5000/users/${id}`,
      headers: {
        Authorization: "Bearer " + authToken
      }
    }).then(() => {
        if(userToken.isAdmin===true) {
          history.push("/")
        }
        else {
          localStorage.removeItem("authToken");
          history.push("/")
        }
      });
    };

  return (
    <div className="update-forms-container">
      <div>
        <form className="update-user-form" onSubmit={updateUser}>
          <input className="lastname-input input-update" aria-label="Changement de nom" value={lastName} placeholder="Nom de famille" onChange={(e) => setLastname(e.target.value)} />
          <input className="lastname-input input-update" aria-label="Changement de prénom" value={firstName} placeholder="Prénom" onChange={(e) => setFirstname(e.target.value)} />
          <input className="email-input input-update" aria-label="Changement d'email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input className="password-input input-update" aria-label="Nouveau mot de passe" type="password" value={password} placeholder="Nouveau mot de passe" onChange={(e) => setPassword(e.target.value)} />
          <input className="confirm-password-input input-update" aria-label="Confirmation du mot de passe" type="password" value={confirmPassword} placeholder="Confirmation du mot de passe" onChange={(e) => setConfirmPassword(e.target.value)} />
          <button className="btn" aria-label="Envoyer le formulaire" type="submit" onSubmit={updateUser}>Envoyer</button>
        </form>
        <form className="update-bio" onSubmit={updateBio}>
          <input className="bio-input input-update" aria-label="Changement de bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Votre nouvelle bio" />
          <button className="btn" type="submit" aria-label="Envoyer la nouvelle bio" onSubmit={updateBio}>Envoyer</button>
        </form>
        <form className="update-job" onSubmit={updateJob}>
          <input className="job-input input-update" aria-label="Changement de poste" value={job} onChange={(e) => setJob(e.target.value)} placeholder="Rôle au sein de l'entreprise.." />
          <button className="btn" type="submit" aria-label="Envoyer le nouveau poste" onSubmit={updateJob}>Envoyer</button>
        </form>
        <ConfirmUpdate className="confirm-panel"/>
        <DenyUpdate className="deny-panel" /> 
        <div className="delete-modal">
          <h1>Êtes-vous sûr de vouloir supprimer votre compte ? Ce processus est irréversible.</h1>
            <div className="delete-btn-box">
              <button className="cancel-btn btn" onClick={showDeletePop}>Annuler</button>
              <button className="delete-btn btn" onClick={deleteProfile}>Supprimer</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateForm
