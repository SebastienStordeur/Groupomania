import React, { useState } from "react";
import { ImCross } from "react-icons/im";

const ModalPost = () => {
  const closeModal = () => {
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
  };

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");


  const post = (e) => {
    e.preventDefault();

    const postPost = () => {
      const postContent = JSON.parse(localStorage.getItem('post'));
      //promise
      const promise = fetch("http://localhost:5000/api/post/", {
        method: "POST",
        body: JSON.stringify(postContent),
        headers: {
          "Content-Type" : "application/json"
        },
      });
      //response
      promise.then(async (response) => {
        try {
          localStorage.clear();
          const responseContent = await response.json();
          console.log(responseContent);
        } catch(error) {
          console.log(error);
        };
      });
    }

    let insidePost = {
      title: title,
      content: message
    }
    console.log(insidePost);
    localStorage.setItem('post', JSON.stringify(insidePost));
    postPost();
  }
  

  return (
    <div className="modal modal-post">
      <ImCross className="close-modal" onClick={closeModal} />
      <form className="input-box" onSubmit={post}>
        <input className="input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
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
        <button className="submit-post input-box__submit-btn" onClick={post}>Poster</button>
      </form>
    </div>
  );
};

export default ModalPost;
