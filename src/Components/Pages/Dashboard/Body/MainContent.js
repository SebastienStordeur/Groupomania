import React from "react";
import { BsImageFill } from "react-icons/bs";
import { BiSend, BiHeart } from "react-icons/bi";
import { RiDislikeLine } from "react-icons/ri";

const MainContent = () => {
  return (
    <section className="main-content-section">
      <form className="post-form">
        <input
          className="post-form__input"
          placeholder="Quelque chose à partager ?"
        ></input>
        <div className="btn-box">
          <button className="post-form__img-btn small-btn" type="button">
            <BsImageFill />
          </button>
          <button className="post-form__submit-btn small-btn" type="submit">
            <BiSend />
          </button>
        </div>
      </form>

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
          Ceci est du contenu Add potential image container here
        </div>
        <div className="post-content__like-box">
          <BiHeart />
          <RiDislikeLine />
        </div>
      </div>
    </section>
  );
};

export default MainContent;
