import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { BiHeart } from 'react-icons/bi';
import { RiDislikeLine } from 'react-icons/ri';
import { Link } from "react-router-dom";
import { FaHeartBroken, FaHeart } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";
import Axios from "axios";


const PostFromUser = () => {

  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");   //Contenu du commentaire
  const [comments, setComments] = useState([]); //Ensemble des commentaires

  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const tokenPart = authToken.split(".");
  const encodedPayload = tokenPart[1];
  const rawPayload = atob(encodedPayload);
  const userToken = JSON.parse(rawPayload);

  const getPosts = async() => {
    const response = await fetch(`http://localhost:5000/posts/${id}`,  { headers: { Authorization: "Bearer " + authToken}});
    const posts = await response.json();
    setPosts(posts.data)
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    
      <div className="post-container">
        {posts.map((post) => { 
           const { id, content, author, imageUrl, like, dislike, userId } = post;
           const idPost = post.id;

           const deletePost = async(e) => {
            e.preventDefault();
            Axios({
              method: "DELETE",
              withCredentials: true,
              url: `http://localhost:5000/posts/${id}`,
              headers: {
                Authorization: "Bearer " + authToken,
              },
            }).then(() => getPosts());
          };
  
           const likePost = async(e) => {
            e.preventDefault();
            Axios({
              method: "POST",
              data: {
                like: 1,
                userId: userToken.userId,
                postId: id,
              },
              url: `http://localhost:5000/posts/${id}/like`,
              headers: {
                Authorization: "Bearer " + authToken,
              }
            }).then(() => getPosts());
          };
  
          const dislikePost = async(e) => {
            e.preventDefault();
            Axios({
              method: "POST",
              data: {
                like: -1,
                userId: userToken.userId,
                postId: id,
              },
              url: `http://localhost:5000/posts/${id}/like`,
              headers: {
                Authorization: "Bearer " + authToken,
              }
            }).then(() => getPosts());
          };
  
          const createComment = async(e) => {
            e.preventDefault();
            Axios({
              method: "POST",
              data: {
                content: comment,
                postId: id,
                userId: userToken.userId
              },
              withCredentials: true,
              url: `http://localhost:5000/posts/${id}/comment`,
              headers: {
                Authorization: "Bearer " + authToken,
              },
            }).then(() => {
              setComment("");
              getComments();
            });
          };
  
          const getComments = async() => {
            const response = await fetch(`http://localhost:5000/posts/${id}/comment`, { headers: { Authorization: "Bearer " + authToken}});
            const comments = await response.json();
            setComments(comments.data); 
          };

           return ( 
            <div className="post-content" key={id}>
            <div className="post-content__user-info">
              <div className="post-content__name">
              </div>
              {(userId === userToken.userId) &&  <div className="post-content__name--delete">
                <BsFillTrashFill className="trash-icon" onClick={deletePost} />
              </div>}
            </div>
            <div className="post-content__content">
              <p>{content}</p>
              <div className="post-content__content--image-container">
                <img src={imageUrl} alt="Image" className="post-image" />
              </div>
            </div>
            <div className="post-content__like-box">
              <FaHeart className="like-heart heart like" size={26} onClick={likePost}/>
              <span className="like-count">{like}</span>
              <FaHeartBroken className="dislike-heart heart dislike" size={24} onClick={dislikePost}/>
              <span className="dislike-count">{dislike}</span>
            </div>
            <div className="form-comment refresh">
              <form className="comment-form" onSubmit={createComment}>
                <input className="add-comment input" name="comment-input" onChange={(e) => setComment(e.target.value)} placeholder="Votre commentaire"/>
              </form>
              <button className="refresh-btn" onClick={getComments}>Afficher les commentaires</button>
            </div>
            <div className="comment-box">
              {comments.map((commentaire) => {
                const { id, content, postId, userId } = commentaire;

                if(postId === idPost) {
                const deleteComment = async(e) => {
                  e.preventDefault();
                  Axios({
                    method: "DELETE",
                    withCredentials: true,
                    url: `http://localhost:5000/comments/${id}`,
                    headers: {
                      Authorization: "Bearer " + authToken,
                    }
                  }).then(() => getComments());
                };

                return (
                  <div className='comment-box__container' key={id}>
                    <div>
                      <h4>Nom Prénom</h4>
                      <p>{content}</p>
                    </div>
                    {(userId === userToken.userId && <div className="post-content__name--delete">
                      <BsFillTrashFill className="trash-icon" onClick={deleteComment} />
                    </div>)}
                  </div>
                )};
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PostFromUser
