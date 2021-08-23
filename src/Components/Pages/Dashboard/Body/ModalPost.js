import React from 'react'
import {ImCross} from "react-icons/im";

const ModalPost = () => {

  const closeModal = () => {
    const modal = document.querySelector('.modal')
    modal.style.display = "none";
  }

  return (
    <div className="modal modal-post">
      <ImCross  className="close-modal" onClick={closeModal} />
      <div className="input-box">
        <label htmlFor = "message">Message</label>
        <textarea className="input-box__message" type="text" placeholder="Tapez ici votre message"/>
        <button className="input-box__btn add-image-btn">Ajouter une image</button>
        <input className="input-box__img-input" type="text" placeholder="URL d'image"/>
        <button className="submit-post input-box__submit-btn">Poster</button>
      </div>
    </div>
  )
}

export default ModalPost;
