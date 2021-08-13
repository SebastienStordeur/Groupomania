import React from 'react'
import { AiFillHome } from "react-icons/ai"
import { IoIosNotifications } from "react-icons/io"
import { FaUserFriends } from "react-icons/fa"

const Navbar = () => {
  return (
    <div className="icons-container">
      <AiFillHome size={32} className="home-icn menu-icn"/>
      <FaUserFriends size={32} className="friend-icn menu-icn"/>
      <IoIosNotifications size={32} className="notif-icn menu-icn"/>
    </div>
  )
}

export default Navbar

//Ajout de liens vers les pages