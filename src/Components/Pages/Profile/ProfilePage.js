import React, { useState } from 'react'
import { useParams } from 'react-router';
import { useEffect } from 'react/cjs/react.development';

import PostFromUser from './PostFromUser';

const ProfilePage = () => {

  const { id } = useParams();
  const [profile, setProfile] = useState([]);

  const getProfile = async() => {
    const response = await fetch(`http://localhost:5000/api/auth/${id}`);
    const profile = await response.json();
    console.log(profile)
    setProfile(profile);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <main>
      <section className="profile-section-info" key={id}>
        <div className="profile-section-info__img-ctn">
          {/* <img className="profile-section-info__img" src={image} alt={lastName + firstName} /> */}
        </div>
        <div className="profile-section-info__details">
          <h1>{profile.firstName + ' ' + profile.lastName}</h1>
          <h3>Nombre de posts : </h3>
        </div>
      </section>
    <PostFromUser />
    </main>
  )
}

export default ProfilePage
