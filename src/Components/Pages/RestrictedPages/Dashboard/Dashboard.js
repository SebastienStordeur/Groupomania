import React from "react";
import Header from "../Header";
import PostInput from "./PostInput";
import Post from "./Post";

const Dashboard = () => {

  return (
    <div>
      <Header />
      <main className="dashboard-main">
        <section className="main-content-section">
          <PostInput />
          <Post />
        </section>
      </main>
    </div>
  )
}

export default Dashboard;