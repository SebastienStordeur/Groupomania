import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { BiHeart } from 'react-icons/bi';
import { RiDislikeLine } from 'react-icons/ri';


const PostFromUser = () => {

  const { id } = useParams();
  const [posts, setPosts] = useState([]);


  const getPosts = async() => {
    const response = await fetch(`http://localhost:5000/posts/${id}`);
    const posts = await response.json();
    console.log(posts);
    setPosts(posts.data)
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <section>
      <div className="post-container">
       {/*  {posts.map((post) => { 
           const { id, title, content, author, likes, dislikes } = post; 
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
              </div>
              <div className="post-content__like-box">
                <BiHeart className="like-heart like" size={26} />
                <span className="like-count">{likes}</span>
                <RiDislikeLine className="dislike-heart dislike" size={26} />
                <span className="dislike-count">{dislikes}</span>
              </div>
              <div className="post-content__comment-box"> 
                <h4 onClick={openAddComment}>Ajouter un commentaire</h4>
                <h4 onClick={openAllComments}>Voir les commentaires</h4>
              </div>
            </div>
          );
        })}   */}
      </div>

    </section>
  )
}

export default PostFromUser
