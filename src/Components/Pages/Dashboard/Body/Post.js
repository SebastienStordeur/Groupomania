import React from "react";

const Post = (post) => {

  const { title, content } = post;

  const submitPost = () => {
    const postContent = JSON.parse(localStorage.getItem('post'));
    //promise
    const promise = fetch("http://localhost:5000/api/post/", {
      method: "POST",
      body: JSON.stringify(postContent),
      headers: {
        "Content-Type" : "application/json"
      },
    });
    //response
    promise.then(async (response) => {
      try {
        localStorage.clear();
        const responseContent = await response.json();
        console.log(responseContent);
      } catch(error) {
        console.log(error);
      }
    })
  }

  return (
    <div className="post-content">
      <div className="post-content__user-info">
        <div className="post-content__photo-container">
          {/* <img src={} alt ={} className="account-info__photo"/> */}
        </div>
        <div className="post-content__name">
          <h3>Sébastien Stordeur</h3>
        </div>
      </div>
      <div className="post-content__content">
        <p>{content}</p>
      </div>
      <div className="post-content__like-box">
        <BiHeart className="like-heart like" size={26} />
        <RiDislikeLine className="dislike-heart dislike" size={26} />
      </div>
    </div>
  );
};

export default Post;
