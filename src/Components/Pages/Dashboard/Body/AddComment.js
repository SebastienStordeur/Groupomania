import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import Axios from 'axios';

const AddComment = () => {
  const closeModal = () => {
    const modal = document.querySelector(".add-comment-modal");
    modal.style.display = "none";
  };

  const [comment, setComment] = useState("");


  const postComment = (e) => {
    e.preventDefault()
    const postCommentContent = JSON.parse(localStorage.getItem("comment"));
    const promise = fetch(`http://localhost:5000/api/post/:1/comment`, {
      method: 'POST',
      body: JSON.stringify(postCommentContent),
      headers: { 'Content-Type' : 'application/json' },
    });
    promise.then(async(response) => {
      try {
        localStorage.removeItem('comment')
        const responseContent = await response.json()
        console.log(responseContent);
      } catch (error) {
        console.log('impossible')
      }
    })
  } 

/*   const postComment = (e) => {
    e.preventDefault()
    Axios({
      method: 'POST',
      data: {
        content: comment,
      },
      withCredentials: true,
      url: 'http://localhost:5000/api/post/1/comment'
    }).then((res) => console.log(res));
  }; */

  return (
    <div className='add-comment-modal modal'>
      <ImCross className='close-modal' onClick={closeModal} />
      <form className='input-box' onSubmit={closeModal}>
        <label htmlFor='add-comment' className='label-add-comment'>Ajouter un commentaire</label>
        <textarea
          className='input-comment'
          type='text'
          name='add-comment'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='Votre commentaire'
          required
        />
        <button className='submit-post input-box__submit-btn' onClick={postComment}>Envoyer</button>
      </form>
    </div>
  );
};

export default AddComment;
