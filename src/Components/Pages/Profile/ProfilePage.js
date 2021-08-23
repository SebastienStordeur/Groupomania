import React from 'react'
import Header from '../Dashboard/Header/Header';

const ProfilePage = () => {

  //const [image, lastName, firstName] = user;
  return (
    <main>
      <Header />
      <section className="profile-section-info">
        <div className="profile-section-info__img-ctn">
          {/* <img className="profile-section-info__img" src={image} alt={lastName + firstName} /> */}
        </div>
        <div className="profile-section-info__details">
          {/* <h1>{firstName + lastName}</h1> */}
          <h3>Nombre de posts : </h3>
          <button className="sub-btn">S'abonner</button>
        </div>
      </section>
    </main>
  )
}

export default ProfilePage
