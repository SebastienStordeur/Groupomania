import React from 'react'
import { BiSearchAlt2 } from "react-icons/bi";

const SearchUser = () => {
  return (
    <form className="search-form">
      <label htmlFor="search">Search User</label>
      <BiSearchAlt2 className="search-form__icn"/>
      <input className="search-form__input" name="search" placeholder="Chercher un utilisateur" />
    </form>
  )
}

export default SearchUser
