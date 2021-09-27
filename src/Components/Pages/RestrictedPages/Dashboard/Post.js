import React, { useState, useEffect } from "react";
import Axios from "axios"
import Comment from "./Comment";
import { FaHeartBroken, FaHeart } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";


const Post = () => {

  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");

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

        const deletePost = async(e) => {
          e.preventDefault();
          Axios({
            method: "DELETE",
            withCredentials: true,
            url: `http://localhost:5000/posts/${id}`,
          }).then((res) => console.log(res));
        };

         const likePost = async(e, like) => {
          e.preventDefault();
          Axios({
            method: "POST",
            data: {
              like: 1,
            },
            url: `http://localhost:5000/posts/${id}/like`,
          });
        };

        const dislikePost = async(e, dislike) => {
          e.preventDefault();
          Axios({
            method: "POST",
            data: {
              like: dislike ? -1 : 0,
            },
            url: `http://localhost:5000/posts/${id}/like`,
          });
        };

        const createComment = async(e) => {
          e.preventDefault();
          Axios({
            method: "POST",
            data: {
              content: comment,
              postId: id,
            },
            withCredentials: true,
            url: `http://localhost:5000/posts/${id}/comment`,
          }).then((res) => console.log(res));
        };

        return (
          <div className="post-content" key={id}>
            <div className="post-content__user-info">
              <div className="post-content__name">
                <h3>Nom prénom</h3>
              </div>
              <div className="post-content__name--delete">
                  <BsFillTrashFill className="trash-icon" onClick={deletePost} />
                </div>
            </div>
            <div className="post-content__content">
              <p>{content}</p>
              <div className="post-content__content--image-container">
                <img src={imageUrl} alt="Image" className="post-image" />
              </div>
            </div>
            <div className="post-content__like-box">
              <FaHeart className="like-heart heart like" size={26} onClick={likePost}/>
              <span className="like-count">{likes}</span>
              <FaHeartBroken className="dislike-heart heart dislike" size={24} onClick={dislikePost}/>
              <span className="dislike-count">{dislikes}</span>
            </div>
            <form className="comment-form" onSubmit={createComment}>
              <input className="add-comment input" name="comment-input" onChange={(e) => setComment(e.target.value)} placeholder="Votre commentaire"/>
            </form>
          </div>
        )
      })}
    </div>
  )
}

export default Post
