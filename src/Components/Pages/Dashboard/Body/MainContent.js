import React from "react";
import ModalPost from "./ModalPost";
import { BiHeart } from "react-icons/bi";
import { RiDislikeLine } from "react-icons/ri";

const MainContent = () => {
  const openModal = () => {
    const modal = document.querySelector(".modal");
    modal.style.display = "block";
  };

  fetch("http://localhost:5000/api/post/", { method: "GET" })
    .then((response) => {
      response.json().then((data) => {
        console.log(data)
      })
    })
    .catch(() => { document.querySelector('.post-container').innerHTML = "Rien à afficher." })

  return (
    <section className="main-content-section">
      <button className="button post-btn" onClick={openModal}>
        Créer un nouveau post
      </button>
      <ModalPost style={{ display: "none" }} />
      <div className="post-container"></div>
    </section>
  );
};

export default MainContent;
