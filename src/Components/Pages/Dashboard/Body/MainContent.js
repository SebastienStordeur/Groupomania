import React, { useState, useEffect } from "react";
import ModalPost from "./ModalPost";
import AddComment from "./AddComment";
import ModalGetComment from "./ModalGetComment";
import { BiHeart } from 'react-icons/bi';
import { RiDislikeLine } from 'react-icons/ri';
import { ImSpinner3 } from 'react-icons/im';

const MainContent = () => {
  
  const openModal = () => {
    const modal = document.querySelector(".modal");
    modal.style.display = "block";
  };

  //Close any kind of modal if clicked outside of it
/*   const closeModal = () => {
    const modals = document.querySelectorAll('.modal');
    modals.style.display = 'none';
  } */

  const openAddComment = () => {
    document.querySelector('.add-comment-modal').style.display = "block";
  }

  const openAllComments = () => {
    document.querySelector('.modal-get-comments').style.display = "block";
  }

  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const response = await fetch('http://localhost:5000/api/post/');
    const posts = await response.json();
    setPosts(posts.data);
  }

  useEffect(() => {
    getPosts();
  }, []); 


  return (
    <section className="main-content-section" /* onClick={closeModal} */>
      <button className="button post-btn" onClick={openModal}>
        Créer un nouveau post
      </button>
      <button className="button act-btn" onClick={getPosts}>
        <ImSpinner3 size={24}/>
      </button>
      <ModalPost style={{ display: "none" }} />
      <div className="post-container">
        {posts.map((post) => { 
           const { id, title, content, author, likes, dislikes, imageUrl } = post; 
           return ( 
            <div className="post-content"  key={id} >
              <div className="post-content__user-info">
                <div className="post-content__name">
                  <h3>{author}</h3>
                </div>
              </div>
              <div className="post-content__content">
                <h3>{title}</h3>
                <p>{content}</p> 
                <img src={imageUrl} alt="image" />
              </div>
              <div className="post-content__like-box">
                <BiHeart className="like-heart like" size={26} />
                <span className="like-count">{likes}</span>
                <RiDislikeLine className="dislike-heart dislike" size={26} />
                <span className="dislike-count">{dislikes}</span>
              </div>
              <div className="post-content__comment-box"> 
                <h4 onClick={openAddComment}>Ajouter un commentaire</h4>
                <AddComment style={{ display: 'none' }} />
                <h4 onClick={openAllComments}>Voir les commentaires</h4>
              </div>
            </div>
          );
        })}  
      </div>

    </section>
  );
};

export default MainContent;
