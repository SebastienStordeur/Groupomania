import React, { useState, useEffect } from "react";
import Axios from "axios"
import { Link } from "react-router-dom";
import { FaHeartBroken, FaHeart } from "react-icons/fa";
import { BsFillTrashFill } from "react-icons/bs";

const Post = () => {

  const [posts, setPosts] = useState([]);       //Ensemble des posts
  const [comment, setComment] = useState("");   //Contenu du commentaire
  const [comments, setComments] = useState([]); //Ensemble des commentaires
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");

  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const tokenPart = authToken.split(".");
  const encodedPayload = tokenPart[1];
  const rawPayload = atob(encodedPayload);
  const userToken = JSON.parse(rawPayload);

  const getPosts = async() => {
    const response = await fetch("http://localhost:5000/posts/", { headers: { Authorization: "Bearer " + authToken}});
    const posts = await response.json();
    setPosts(posts.data);
  };  

   useEffect(() => {
    getPosts()
  }, []);

  const post = (e) => {
    e.preventDefault();
    const user = JSON.parse(rawPayload);
    const postChecking = () => {
      const regex = /^[\w'\-,.][^_!¡?÷?¿/\\+=@#$%ˆ&*{}|~<>;:[\]]{2,}$/i;
      if(regex.test(content)) return true;
      else return false;
    };

    if(postChecking()) {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("image", file);
      formData.append("userId", user.userId)

      Axios.post("http://localhost:5000/posts/", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: "Bearer " + authToken  }
      })
      .then(() => {
        getPosts();
        setContent(""); 
        setFile("");
      })
    };
  };

  return (
    <>      
      <form className="post-form" onSubmit={post}>
        <div className="post-form__main-input">
          <input className="post-form__content" placeholder="Contenu de votre prochain post.." value={content} onChange={(e) => setContent(e.target.value)}/>
        </div>
        <div className="post-form__secondary-input">
          <input className="post-form__file" type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
          <button className="post-form__submit btn" type="submit" onClick={post}>Poster</button>
        </div>
      </form>
      
      <div className="post-container">
        {posts.map((post) => {
          const { id, content, like, dislike, imageUrl, userId, user } = post;
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

          const checkComment = () => {
            const regex = /^[\w'\-,.][^_!¡?÷?¿/\\+=@#$%ˆ&*{}|~<>;:[\]]{2,}$/i;
            if(regex.test(comment)) return true;
            else return false;
          }

          
          const createComment = async(e) => {
            e.preventDefault();
            if(checkComment()){
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
            }
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
                  <Link to={`/profile/${user.id}`}>
                    <h3>{user.lastName + " " + user.firstName}</h3>
                  </Link>
                </div>
                {(userId === userToken.userId || userToken.isAdmin === true ) &&  <div className="post-content__name--delete">
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
                  const { id, content, postId, userId, user } = commentaire;

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
                        <Link to={`/profile/${user.id}`}>
                          <h3>{user.lastName + " " + user.firstName}</h3>
                        </Link>
                        <p>{content}</p>
                      </div>
                      {((userId === userToken.userId || userToken.isAdmin === true) && <div className="post-content__name--delete">
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
    </>
  )
}

export default Post
