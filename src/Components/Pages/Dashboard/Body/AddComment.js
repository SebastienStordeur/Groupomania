import React, { useState } from "react";
import { ImCross } from "react-icons/im";

const AddComment = () => {
  const closeModal = () => {
    const modal = document.querySelector(".add-comment-modal");
    modal.style.display = "none";
  };

  const [comment, setComment] = useState("");

/*   const postComment = () => {
    const postCommentContent = JSON.parse(localStorage.getItem("comment"));
    const promise = fetch("http://localhost:5000/api/post/${id}/comment")
  } */


  return (
    <div className="add-comment-modal modal">
      <ImCross className="close-modal" onClick={closeModal} />
      <form className="input-box" onSubmit={closeModal}>
        <input
          className="input-comment"
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Votre commentaire"
          required
        />
      </form>
    </div>
  );
};

export default AddComment;
