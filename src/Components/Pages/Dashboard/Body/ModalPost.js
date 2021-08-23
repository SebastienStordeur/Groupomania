import React, { useState } from "react";
import { ImCross } from "react-icons/im";

const ModalPost = () => {
  const closeModal = () => {
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
  };

  /*   const importImage = (file) => {
      var input = file.target;

      var reader = new FileReader();
      reader.onload = function() {
        var dataURL = reader.result;
        var output = document.querySelector('.output');
        output.src= dataURL;
      
      reader.readAsDataURL(input.file[0]);
    };
  } */

  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

  return (
    <div className="modal modal-post">
      <ImCross className="close-modal" onClick={closeModal} />
      <div className="input-box">
        <label htmlFor="message">Message</label>
        <textarea
          className="input-box__message"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tapez ici votre message"
        />
        <input
          className="input-box__btn add-image-btn"
          type="file"
          accept="image/*"
          placeholder="Fichier"
        />
        {/* //<div className="output"></div> */}
        <input
          className="input-box__img-input"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="URL d'image"
        />
        <button className="submit-post input-box__submit-btn">Poster</button>
      </div>
    </div>
  );
};

export default ModalPost;
