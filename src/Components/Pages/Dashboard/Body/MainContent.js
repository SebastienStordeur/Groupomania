import React from "react";
import ModalPost from "./ModalPost";
import { BiHeart } from "react-icons/bi";
import { RiDislikeLine } from "react-icons/ri";

const MainContent = () => {

  const openModal = () => {
    const modal = document.querySelector('.modal');
    modal.style.display = "block";
  }

// verif image ou text is here
  return (
    <section className="main-content-section">
      <button className="button post-btn" onClick={openModal}>
        Créer un nouveau post
      </button>
    <ModalPost style={{display: "none"}} />

      <div className="post-content">
        <div className="post-content__user-info">
          <div className="post-content__photo-container">
            {/* <img src={} alt ={} className="account-info__photo"/> */}
          </div>
          <div className="post-content__name">
            <h3>Sébastien Stordeur</h3>
          </div>
        </div>
        <div className="post-content__content">
          <p>Ceci est du contenu Add potential image container here</p>
        </div>
        <div className="post-content__like-box">
          <BiHeart className="like-heart like" size={26} />
          <RiDislikeLine className="dislike-heart dislike" size={26} />
        </div>
      </div>
    </section>
  );
};

export default MainContent;
