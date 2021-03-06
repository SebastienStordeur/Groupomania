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
  const [tags, setTags] = useState([]);
  const [tagArray, setTagArray] = useState([]);

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
  const displayTagList = async() => {
    const response = await fetch("http://localhost:5000/tags/getTags");
    const tags = await response.json();
    setTags(tags.data);
  };

  useEffect(() => {
    displayTagList()
  }, []);

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
      formData.append("tags", null || tagArray);
      formData.append("userId", user.userId)

      Axios.post("http://localhost:5000/posts/", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: "Bearer " + authToken  }
      })
      .then(() => {
        Array.from(document.getElementsByClassName("added")).map(x => x.classList.remove("added"));
        getPosts();
        setContent(""); 
        setFile("");
        setTagArray([]);
        document.querySelector(".post-form__file").value = null;
      })
    };
  };

  return (
    <>
      <form className="post-form" onSubmit={post}>
        <div className="post-form__main-input">
          <input className="post-form__content" aria-label="Contenu de post" placeholder="Contenu de votre prochain post.." value={content} onChange={(e) => setContent(e.target.value)}/>
        </div>
        <div className="post-form__tags">
          <span>Tags</span>
          {tags.map((tag) => {
            const { id, name } = tag;

            const addTag = (element) => {
              element.preventDefault();
              element.target.parentElement.classList.toggle("added");
              setTagArray(tagArray)
              if (!tagArray.includes(tag.name)) {
                tagArray.push(tag.name)
                setTagArray(tagArray)
              } 
              else {
                tagArray.splice(tagArray.indexOf(tag.name),1)
                setTagArray(tagArray)
              }
            }

            return(
              <button className="tag" key={id} >
                <span onClick={addTag}>{name}</span>
              </button>
            )

          })}
        </div>
        <div className="post-form__secondary-input">
          <input className="post-form__file" type="file" aria-label="Ajout de fichier image" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
          <button className="post-form__submit btn" type="submit" onClick={post}>Poster</button>
        </div>
      </form>

      <div className="post-container">
        {posts.map((post) => {
          const { id, content, like, dislike, imageUrl, userId, user, tags } = post;
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

          const tagList = tags.split(" ");

          return (
            <div className="post-content" key={id}>
              <div className="post-content__user-info">
                <div className="post-content__name">
                  <Link to={`/profile/${user.id}`} aria-label={`Lien vers le profil de ${user.firstName + " " + user.lastName}`}>
                    <h3>{user.lastName + " " + user.firstName}</h3>
                  </Link>
                </div>
                {(userId === userToken.userId || userToken.isAdmin === true ) &&  <button className="post-content__name--delete" aria-label="Supprimer le post.">
                  <BsFillTrashFill className="trash-icon" onClick={deletePost} />
                </button>}
              </div>
              <div className="post-content__content">
                <p>{content}</p>
                <div className="post-content__content--image-container">
                  <img src={imageUrl} alt={`Contenu visuel du post {id}`} className="post-image" />
                </div>
                <div className="tag-box">
                  <span>Tags : </span>
                  {
                    tagList.map((tag) => {
                      return (
                        <Link to={`filter/${tag}`}>
                          <div className="tag" >
                            <span>{tag || "Aucun tag"}</span>
                          </div>
                        </Link>
                      );
                    })
                  }
                </div>
              </div>
              <div className="post-content__like-box">
                <button className="like-btn" aria-label="Bouton like">
                  <FaHeart className="like-heart heart like" size={26} onClick={likePost}/>
                </button>
                <span className="like-count">{like}</span>
                <button className="like-btn" aria-label="Bouton dislike">
                  <FaHeartBroken className="dislike-heart heart dislike" size={24} onClick={dislikePost}/>
                </button>
                <span className="dislike-count">{dislike}</span>
              </div>
              <div className="form-comment refresh">
                <form className="comment-form" onSubmit={createComment}>
                  <input className="add-comment input" aria-label="Ajout de commentaire" name="comment-input" onChange={(e) => setComment(e.target.value)} placeholder="Votre commentaire"/>
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
                      {((userId === userToken.userId || userToken.isAdmin === true) && <button className="post-content__name--delete">
                        <BsFillTrashFill className="trash-icon" onClick={deleteComment} />
                      </button>)}
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
