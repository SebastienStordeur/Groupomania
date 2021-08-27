import React from "react";
import ModalPost from "./ModalPost";
import { BiHeart } from "react-icons/bi";
import { RiDislikeLine } from "react-icons/ri";

const MainContent = () => {
  const openModal = () => {
    const modal = document.querySelector(".modal");
    modal.style.display = "block";
  };

  // verif image ou text is here
  return (
    <section className="main-content-section">
      <button className="button post-btn" onClick={openModal}>
        Créer un nouveau post
      </button>
      <ModalPost style={{ display: "none" }} />
    </section>
  );
};

export default MainContent;
