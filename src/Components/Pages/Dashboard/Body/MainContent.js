import React, { useState, useEffect } from "react";
import ModalPost from "./ModalPost";
import { BiHeart } from 'react-icons/bi';
import { RiDislikeLine } from 'react-icons/ri';

const MainContent = () => {
  
  const openModal = () => {
    const modal = document.querySelector(".modal");
    modal.style.display = "block";
  };

  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const response = await fetch('http://localhost:5000/api/post/');
    const posts = await response.json();
    console.log(posts)
    setPosts(posts.data);
    console.log(posts.data)
    for (let post of posts.data) {
      console.log(post)
    }
  }

  useEffect(() => {
    getPosts();
  }, []); 


  return (
    <section className="main-content-section">
      <button className="button post-btn" onClick={openModal}>
        Créer un nouveau post
      </button>
      <ModalPost style={{ display: "none" }} />
      <div className="post-container">
        {posts.map((post) => { 
           const { id, title, content, author } = post; 
           return ( 
            <div className="post-content"  key={post.id} >
              <div className="post-content__user-info">
                <div className="post-content__photo-container">
              <img src={post.imageUrl} alt={post.title} />
            </div>
            <div className="post-content__name">
              <h3></h3>
            </div>
          </div>
          <div className="post-content__content">
            <h3>{post.title}</h3>
            <p>{post.content}</p> 
          </div>
          <div className="post-content__like-box">
            <BiHeart className="like-heart like" size={26} />
            <RiDislikeLine className="dislike-heart dislike" size={26} />
          </div>
        </div>
         );
        })}  
      </div>

    </section>
  );
};

export default MainContent;
