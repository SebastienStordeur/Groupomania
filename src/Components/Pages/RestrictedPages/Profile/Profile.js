import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import Axios from "axios";
import Header from "../Header";
import UpdateForm from "./UpdateForm";
import PostFromUser from "./PostFromUser";
import { GrUpdate } from "react-icons/gr"

const Profile = () => {

  const history = useHistory();
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
  }, []);

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
            }

            return(
              <section className="profile-section-info" key={id}>
                <div className="profile-section-info__img">
                  <div className="profile-section-info__img--ctn">
                    <img className="profile-section-info__img--ctn__img" src={imageUrl} alt={firstName + lastName} />
                  </div>
                  {(id === userToken.userId || userToken.isAdmin === true) && <form className="post-form-profile">
                    <input className="post-form__file" type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                    <button className="send-btn btn" type="submit" onClick={addProfilePicture}>Envoyer</button>
                  </form>}
                </div>
                <div className="profile-section-info__details">
                  <h1>{firstName + ' ' + lastName}</h1>
                  <h3><span className="text">Poste occupé : {job}</span> {(id === userToken.userId || userToken.isAdmin === true) && <span><GrUpdate className="update" onClick={showJobForm} /></span>}</h3>
                  <h3><span className="text">Bio : {bio}</span> {(id === userToken.userId || userToken.isAdmin === true) && <span><GrUpdate className="update" onClick={showBioForm} /></span>}</h3>
                  {(id === userToken.userId || userToken.isAdmin === true) && <div className="btn-box-profile">
                    <button className="btn modify-btn" onClick={showUpdateForm}>Modifier</button>
                    <button className="btn delete-btn" onClick={showDeletePop}>Suppression</button>
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
