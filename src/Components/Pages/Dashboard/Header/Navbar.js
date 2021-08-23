import React from 'react'
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai"
import { IoIosNotifications } from "react-icons/io"
import { FaUserFriends } from "react-icons/fa"

const Navbar = () => {
  return (
    <div className="icons-container">
      <Link to="/dashboard">
        <AiFillHome size={32} className="home-icn menu-icn"/>
      </Link>
      <Link to='/profile'>
        <FaUserFriends size={32} className="friend-icn menu-icn"/>
      </Link>
      <IoIosNotifications size={32} className="notif-icn menu-icn"/>
    </div>
  )
}

export default Navbar

//Ajout de liens vers les pages