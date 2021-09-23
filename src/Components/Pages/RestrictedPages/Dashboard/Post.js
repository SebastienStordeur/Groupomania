import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import { BiHeart } from 'react-icons/bi';
import { RiDislikeLine } from 'react-icons/ri';

const Post = () => {

  const [posts, setPosts] = useState([])

  const getPosts = async() => {
    const response = await fetch("http://localhost:5000/posts/");
    const posts = await response.json();
    setPosts(posts.data);
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="post-container">
      {posts.map((post) => {
        const { id, content, author, likes, dislikes, imageUrl } = post;
        return (
          <div className="post-content" key={id}>
            <div className="post-content__user-info">
              <div className="post-content__name">
                <h3>{author}</h3>
              </div>
            </div>
            <div className="post-content__content">
              <p>{content}</p>
              <div className="post-content__content--image-container">
                <img src={imageUrl} alt="Image" className="post-image" />
              </div>
            </div>
            <div className="post-content__like-box">
              <BiHeart className="like-heart like" size={26} />
              <span className="like-count">{likes}</span>
              <RiDislikeLine className="dislike-heart dislike" size={26} />
              <span className="dislike-count">{dislikes}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Post
