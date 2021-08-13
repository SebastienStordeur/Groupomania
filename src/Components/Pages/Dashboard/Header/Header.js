import React from 'react'
import Navbar from './Navbar';
import ProfileDisconnect from './ProfileDisconnect';
import SearchUser from './SearchUser';

const Header = () => {
  return (
    <header className="main-header">
      <SearchUser />
      <Navbar />
      <ProfileDisconnect />
    </header>
  )
}

export default Header;
