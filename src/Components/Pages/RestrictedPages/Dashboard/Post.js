import React, { useState, useEffect } from "react";
import Axios from "axios"
import { FaHeartBroken, FaHeart } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";

const Post = () => {

  const [posts, setPosts] = useState([]);       //Ensemble des posts
  const [comment, setComment] = useState("");   //Contenu du commentaire
  const [comments, setComments] = useState([]); //Ensemble des commentaires

  const authToken = JSON.parse(localStorage.getItem("authToken"));

  const getPosts = async() => {
    const response = await fetch("http://localhost:5000/posts/", { headers: { Authorization: "Bearer " + authToken}});
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
              userId: 3,
              postId: id,
            },
            url: `http://localhost:5000/posts/${id}/like`,
            headers: {
              Authorization: "Bearer " + authToken,
            }
          }).then((res) => console.log(res));
        };

        const dislikePost = async(e) => {
          e.preventDefault();
          Axios({
            method: "POST",
            data: {
              userId: 3,
              postId: id,
            },
            url: `http://localhost:5000/posts/${id}/dislike`,
            headers: {
              Authorization: "Bearer " + authToken,
            }
          }).then((res) => console.log(res));
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
            headers: {
              Authorization: "Bearer " + authToken,
            },
          });
/*           const commentForm = document.querySelector("comment-form");
          commentForm.reset(); */
        };

        const getComments = async() => {
          const response = await fetch(`http://localhost:5000/posts/${id}/comment`, { headers: { Authorization: "Bearer " + authToken}});
          const comments = await response.json();
          setComments(comments.data); 
        };

/*         const getLikes = async() => {
          Axios({
            method: "GET",
            withCredentials: true,
            url: `http://localhost:5000/posts/${id}/like`
          })
        } */

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
              {
                
              }
              <FaHeart className="like-heart heart like" size={26} onClick={likePost}/>
              <span className="like-count">{likes}</span>
              <FaHeartBroken className="dislike-heart heart dislike" size={24} onClick={dislikePost}/>
              <span className="dislike-count">{dislikes}</span>
            </div>
            <div className="form-comment refresh">
              <form className="comment-form" onSubmit={createComment}>
                <input className="add-comment input" name="comment-input" onChange={(e) => setComment(e.target.value)} placeholder="Votre commentaire"/>
              </form>
              <button className="refresh-btn" onClick={getComments}>Get comments</button>
            </div>
            <div className="comment-box">
              {comments.map((commentaire) => {
                const { id, content, userId, postId } = commentaire;

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
                    <div className="post-content__name--delete">
                      <BsFillTrashFill className="trash-icon" onClick={deleteComment} />
                    </div>
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

export default Post
