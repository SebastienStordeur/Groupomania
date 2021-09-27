import React, { useState } from "react";
import Axios from "axios";

const PostInput = () => {

  const [content, setContent] = useState("");
  const [file, setFile] = useState("");

  const post = (e) => {
    e.preventDefault();
    const postChecking = () => {
      const regex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
      if(regex.test(content)) return true;
      else return false;
    };

    if(postChecking()) {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("image", file);

      Axios.post("http://localhost:5000/posts/", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    };
  };

  return (
    <form className="post-form" onSubmit={post}>
      <div className="post-form__main-input">
        <input className="post-form__content" placeholder="Contenu de votre prochain post.." value={content} onChange={(e) => setContent(e.target.value)}/>
      </div>
      <div className="post-form__secondary-input">
        <input className="post-form__file" type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        <button className="post-form__submit btn" type="submit" onClick={post}>Poster</button>
      </div>
    </form>
  )
}

export default PostInput;
