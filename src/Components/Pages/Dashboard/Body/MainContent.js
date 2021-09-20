import React, { useState, useEffect } from "react";
import ModalPost from "./ModalPost";
import ModalGetComment from "./ModalGetComment";
import { BiHeart } from 'react-icons/bi';
import { RiDislikeLine } from 'react-icons/ri';
import { ImSpinner3 } from 'react-icons/im';
import axios from "axios";

const MainContent = () => {
  
  const openModal = () => {
    const modal = document.querySelector(".modal");
    const dashboard = document.querySelector('.main-content-section');
    modal.style.display = "block";
  };

  const openAllComments = () => {
    document.querySelector('.modal-get-comments').style.display = "block";
  }

  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState('');

  const getPosts = async () => {
    const response = await fetch('http://localhost:5000/api/post/');
    const posts = await response.json();
    setPosts(posts.data);
  }

  useEffect(() => {
    getPosts();
  }, []); 


  const like = async () => {
   // const response = await fetch(`http://localhost:5000/api/post/${id}/like`)
  }



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
           
           const addComment = async(e) => {
             e.preventDefault()
            axios({
              method: 'POST',
              data: { 
                content: comment,
                postId: id
              },
              withCredentials: true,
              url: `http://localhost:5000/api/post/${id}/comment`
            }).then((res) => {
              console.log(res)
            })
          }

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
                <div className="post-content__content--image-container">
                  <img src={imageUrl} alt="image" className="post-image" />
                </div>
              </div>
              <div className="post-content__like-box">
                <BiHeart className="like-heart like" size={26} />
                <span className="like-count">{likes}</span>
                <RiDislikeLine className="dislike-heart dislike" size={26} />
                <span className="dislike-count">{dislikes}</span>
              </div>
              <button className="btn">Delete</button>
              <div className="post-content__comment-box"> 
                <h4>Ajouter un commentaire</h4>
                <h4 onClick={openAllComments}>Voir les commentaires</h4>
              </div>
              <form className='comment-form' onSubmit={addComment}>
                <input className="add-comment input" name="comment-input" value={comment} onChange={(e) => setComment(e.target.value)}></input>
              </form>
            </div>
          );
        })}  
      </div>

    </section>
  );
};

export default MainContent;
