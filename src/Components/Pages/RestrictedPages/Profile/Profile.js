import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Axios from "axios";
import Header from "../Header";
import UpdateForm from "./UpdateForm";
import PostFromUser from "../../Profile/PostFromUser";

const Profile = () => {

  const [profile, setProfile] = useState([]);
  const { id } = useParams();
  const authToken = JSON.parse(localStorage.getItem("authToken"));

  const array = [];

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
    <main>
      <Header />
      {profile.map((profil) => { 
        const { id, firstName, lastName, /* postNumber */ imageUrl } = profil;
        return( 
        <section className="profile-section-info" key={id}>
          <div className="profile-section-info__img-ctn">
            <img className="profile-section-info_img" src={imageUrl} alt={firstName + lastName} />
          </div>
          <div className="profile-section-info__details">
            <h1>{firstName + ' ' + lastName}</h1>
            <h3>Nombre de posts : {/* {postNumber} */}</h3>
          </div>
        </section> 
        )
       })} 

      <UpdateForm />
      <PostFromUser />
    </main>
  )
}

export default Profile