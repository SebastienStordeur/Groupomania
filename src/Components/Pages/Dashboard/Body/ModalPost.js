import React, { useState } from "react";
import { ImCross } from "react-icons/im";

const ModalPost = () => {
  const closeModal = () => {
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
  };

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

  const post = (e) => {
    e.preventDefault();

    const checkPost = () => {
      const titleInput = document.querySelector(".input-title");
      const messageInput = document.querySelector(".input-box__message");

      if (titleInput.length < 5 || messageInput.length < 5) return false;
      else return true;
    };

    const postPost = () => {
      const postContent = JSON.parse(localStorage.getItem("post"));
      //promise
      const promise = fetch("http://localhost:5000/api/post/", {
        method: "POST",
        body: JSON.stringify(postContent),
        headers: {
          "Content-Type": "application/json",
        },
      });
      //response
      promise.then(async (response) => {
        try {
          localStorage.removeItem('post');
          const responseContent = await response.json();
          console.log(responseContent);
        } catch (error) {
          console.log(error);
        }
      });
    };

    
    if (checkPost()) {
      let insidePost = {
        author: "bravo",
        title: title,
        content: message,
        imageUrl: image,
        userId: 12
      };
      console.log(insidePost);
      localStorage.setItem("post", JSON.stringify(insidePost));
      console.log(checkPost())
      postPost();
    }
  };

  return (
    <div className="modal modal-post">
      <ImCross className="close-modal" onClick={closeModal} />
      <form className="input-box" onSubmit={post}>
        <input
          className="input-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre du post"
          required
        />
        <label htmlFor="message">Message</label>
        <textarea
          className="input-box__message"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tapez ici votre message"
          required
        />
        <input
          className="input-box__btn add-image-btn"
          type="file"
          accept="image/*"
          placeholder="Fichier"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button className="submit-post input-box__submit-btn" onClick={post}>
          Poster
        </button>
      </form>
    </div>
  );
};

export default ModalPost;
