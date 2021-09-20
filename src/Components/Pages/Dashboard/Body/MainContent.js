import React, { useState, useEffect } from "react";
import ModalPost from "./ModalPost";
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

  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState(''); //value from the comment input
  const [comments, setComments] = useState([]);

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
           const { id, title, content, author, likes, dislikes, imageUrl } = post; //defining what a
           
          //delete a post
          const deletePost = async(e) => {
            e.preventDefault();
            axios({
              method: 'DELETE',
              withCredentials: true,
              url: `http://localhost:5000/api/post/${id}`
            }).then((res) => console.log(res));
          }

           //add a comment
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
              console.log(res);
            })
          };

          const getComments = async() => {
            const response = await fetch(`http://localhost:5000/api/post/${id}/comment`);
            const comments = await response.json();
            setComments(comments.data);
          }

         /*  useEffect(() => {
            getComments();
          }, []);  */

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
              <button className="btn" onClick={deletePost}>Delete</button>
              <div className="post-content__comment-box"> 
                <h4>Ajouter un commentaire</h4>
                <h4>Voir les commentaires</h4>
              </div>
              <form className='comment-form'  onSubmit={addComment}>
                <input className="add-comment input" name="comment-input" value={comment} onChange={(e) => setComment(e.target.value)}></input>
              </form>

              <div className="comment-content">
                <button onClick={getComments}>Test</button>
              </div>
              <div className='comment-box'> 
                {/* {comments.data.map((commentaire) => {
                  const { id, content, userId, postId} = commentaire;
                  return (
                    <div className='comment-box__container' key={id}>
                      <p>{content}</p>
                    </div>
                  )
                })} */}
              </div>
            </div>
          );
        })}  
      </div>

    </section>
  );
};

export default MainContent;
