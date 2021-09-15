import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import Axios from 'axios';

const ModalPost = () => {
  const closeModal = () => {
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
  };

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState('');

  const post = (e) => {
    e.preventDefault();

    const checkPost = () => {
      const titleInput = document.querySelector(".input-title");
      const messageInput = document.querySelector(".input-box__message");

      if (titleInput.length < 5 || messageInput.length < 5) return false;
      else return true;
    };

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', file);

    Axios.post('http://localhost:5000/api/post', formData, {
      headers: { 'Content-Type': 'multipart/form-data'}
    })
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tapez ici votre message"
          required
        />
        <input
          className="input-box__btn add-image-btn"
          type="file"
          accept="image/*"
          placeholder="Fichier"
          onChange={ (e) => {
            setFile(e.target.files[0]);
          }} 
        />

        <button className="submit-post input-box__submit-btn" onClick={post}>
          Poster
        </button>
      </form>
    </div>
  );
};

export default ModalPost;
