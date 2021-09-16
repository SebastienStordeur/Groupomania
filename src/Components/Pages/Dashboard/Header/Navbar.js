import React from 'react'
import { Link, useParams } from "react-router-dom";
import { AiFillHome } from "react-icons/ai"
import { IoIosNotifications } from "react-icons/io"
import { FaUserAlt } from "react-icons/fa"


const Navbar = () => {

  const { id } = useParams()

  return (
    <div className="icons-container">
      <Link to="/dashboard">
        <AiFillHome size={32} className="home-icn menu-icn"/>
      </Link>
      <Link to={`/profile/${id}`}>
        <FaUserAlt size={30} className="friend-icn menu-icn"/>
      </Link>
    </div>
  )
}

export default Navbar

//Ajout de liens vers les pages