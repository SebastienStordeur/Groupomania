import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import Axios from "axios";
import Header from "../Header";
import UpdateForm from "./UpdateForm";
import PostFromUser from "../../Profile/PostFromUser";

const Profile = () => {

  const history = useHistory();
  const [profile, setProfile] = useState([]);
  const [file, setFile] = useState("");
  const { id } = useParams();
  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const tokenPart = authToken.split(".");
  const encodedPayload = tokenPart[1];
  const rawPayload = atob(encodedPayload);
  const user = JSON.parse(rawPayload);
  const updateForm = document.querySelector(".update-form")

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

        const deleteProfile = () => {
          Axios({
            method: "DELETE",
            withCredentials: true,
            url: `http://localhost:5000/users/${id}`,
            headers: {
              Authorization: "Bearer " + authToken
            }
          }).then(() => {
            localStorage.removeItem("authToken");
            history.push("/")
          });
        };

/*         const modifyProfile = () => {
          Axios({ 
            method: "PUT",
            withCredentials: true,
            data: {
              lastName: 
            } 
            url: `http://localhost:5000/users/${id}`,
            headers: {
              Authorization: "Bearer " + authToken
            }
          });
        }; */

        const addProfilePicture = (e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.append("image", file);
          Axios.post(`http://localhost:5000/users/${id}/manageProfilePicture`, {
            headers: { "Content-Type": "multipart/form-data", Authorization: "Bearer " + authToken }
          })
        }

        return( 
        <section className="profile-section-info" key={id}>
          <div className="profile-section-info__img-ctn">
            <img className="profile-section-info_img" src={imageUrl} alt={firstName + lastName} />
            <form className="post-form-profile">
              <input className="post-form__file" type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
              <button className="send-btn btn" type="submit" onClick={addProfilePicture}>Envoyer</button>
            </form>
          </div>
          <div className="profile-section-info__details">
            <h1>{firstName + ' ' + lastName}</h1>
            <h3>Nombre de posts : {/* {postNumber} */}</h3>
            
            {(id === user.userId) && <div className="btn-box-profile">
              <button className="btn modify-btn">Modifier</button>
              <button className="btn delete-btn" onClick={deleteProfile}>Suppression</button>
            </div>}
          </div>     
        </section> 
        )
       })} 

      <UpdateForm className="update-form" />
      <PostFromUser />
    </main>
  )
}

export default Profile
