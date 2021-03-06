import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Axios from "axios";
import Header from "../Header";
import UpdateForm from "./UpdateForm";
import PostFromUser from "./PostFromUser";
import { GrUpdate } from "react-icons/gr"

const Profile = () => {

  const updateForm = document.querySelector(".update-user-form");
  const bioForm = document.querySelector(".update-bio");
  const jobForm = document.querySelector(".update-job");
  const deletePop = document.querySelector(".delete-modal");
  const [profile, setProfile] = useState([]);
  const [file, setFile] = useState("");
  const { id } = useParams();
  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const tokenPart = authToken.split(".");
  const encodedPayload = tokenPart[1];
  const rawPayload = atob(encodedPayload);
  const userToken = JSON.parse(rawPayload);
  const array = [];

  const showUpdateForm = () => updateForm.classList.toggle("show");
  const showBioForm = () => bioForm.classList.toggle("show");
  const showJobForm = () => jobForm.classList.toggle("show");
  const showDeletePop = () => deletePop.classList.toggle("show-delete");

  const getProfile = async() => {
    const response = await fetch(`http://localhost:5000/users/${id}`, { headers: { Authorization: "Bearer " + authToken }});
    const profile = await response.json();
    array.push(profile)
    setProfile(array);
  }

  useEffect(() => {
    getProfile();
  }, [id]);

  return (
    <>
      <Header />
      <main className="dashboard-main">
        <section className="main-content-section">
          {profile.map((profil) => { 
            const { id, firstName, lastName, imageUrl, job, bio } = profil;

            const addProfilePicture = (e) => {
              e.preventDefault();
              const formData = new FormData();
              formData.append("image", file);
              Axios.put(`http://localhost:5000/users/${id}/manageProfilePicture`, formData, {
                headers: { "Content-Type": "multipart/form-data", Authorization: "Bearer " + authToken }
              })
              .then(() => {
                window.location.reload()
              })
            }

            return(
              <section className="profile-section-info" key={id}>
                <div className="profile-section-info__img">
                  <div className="profile-section-info__img--ctn">
                    <img className="profile-section-info__img--ctn__img" src={imageUrl} alt={firstName + lastName} />
                  </div>
                  {(id === userToken.userId || userToken.isAdmin === true) && <form className="post-form-profile">
                    <input className="post-form__file" type="file" aria-label="Ajouter une photo" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                    <button className="send-btn btn" aria-label="Envoyer votre nouvelle photo de profil" type="submit" onClick={addProfilePicture}>Envoyer</button>
                  </form>}
                </div>
                <div className="profile-section-info__details">
                  <h1>{firstName + ' ' + lastName}</h1>
                  <h3><span className="text">Poste occup?? : {job}</span> {(id === userToken.userId || userToken.isAdmin === true) && <button className="update-profile-btn" aria-label="Modifier le poste"><GrUpdate className="update" onClick={showJobForm} /></button>}</h3>
                  <h3><span className="text">Bio : {bio}</span> {(id === userToken.userId || userToken.isAdmin === true) && <button className="update-profile-btn" aria-label="Modifier la bio"><GrUpdate className="update" onClick={showBioForm} /></button>}</h3>
                  {(id === userToken.userId || userToken.isAdmin === true) && <div className="btn-box-profile">
                    <button className="btn modify-btn" aria-label="Modifier vos infos de comptes" onClick={showUpdateForm}>Modifier</button>
                    <button className="btn delete-btn" aria-label="Supprimer votre compte" onClick={showDeletePop}>Suppression</button>
                  </div>}
                </div> 
              </section>
            )
          })}
        <UpdateForm className="update-form" />
        <PostFromUser />
      </section>
    </main>
    </>
  )
}

export default Profile
