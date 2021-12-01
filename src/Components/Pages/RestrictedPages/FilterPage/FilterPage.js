import React, { useState, useEffect } from 'react'
import Axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from 'react-router';
import { BsFillTrashFill } from "react-icons/bs";
import Header from '../Header'

const FilterPage = () => {

  const { tag } = useParams();
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState([]);

  const authToken = JSON.parse(localStorage.getItem("authToken"));
  const tokenPart = authToken.split(".");
  const encodedPayload = tokenPart[1];
  const rawPayload = atob(encodedPayload);
  const userToken = JSON.parse(rawPayload);

  const getPosts = async() => {
    const response = await fetch("http://localhost:5000/posts/", { headers: { Authorization: "Bearer " + authToken}});
    const posts = await response.json();
    setPosts(posts.data);
    
    const filtre = posts.data.filter(post => post.tags.includes(tag))
    setFilter(filtre)
  };

  useEffect(() => {
    getPosts();
  }, [tag])

  return (
    <>
      <Header />

      <main className="dashboard-main">
        <section className="main-content-section">
          <div className="filter-title">
            <h1>Posts contenant le tag {tag}</h1>
          </div>
          <div className="post-container">
            {filter.map((post) => {
              const { id, content, imageUrl, tags, user, userId } = post;



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

              const tagList = tags.split(" ");
              return(
                <div className="post-content" key={id}>
                  <div className="post-content__user-info">
                    <div className="post-content__name">
                      <Link to={`/profile/${user.id}`}>
                        <h3>{user.lastName + " " + user.firstName}</h3>
                      </Link>
                    </div>
                    {(userId === userToken.userId || userToken.isAdmin === true ) &&  <div className="post-content__name--delete">
                      <BsFillTrashFill className="trash-icon" onClick={deletePost}/>
                    </div>} 
                  </div>
                  <div className="post-content__content">
                    <p>{content}</p>
                    <div className="post-content__content--image-container">
                      <img src={imageUrl} alt="" className="post-image" />
                    </div>
                    <div className="tag-box">
                      <span>Tags : </span>
                      { tagList.map((tag) => { 
                        return (
                          <Link to={`/filter/${tag}`}>
                            <div className="tag" >
                              <span>{tag || "Aucun tag"}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) 
            })}
          </div>
        </section>
      </main>
    </>
  )
}

export default FilterPage
