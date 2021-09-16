import React from 'react'
import Navbar from './Navbar';
import ProfileDisconnect from './ProfileDisconnect';

const Header = () => {
  return (
    <header className="main-header">
      <Navbar />
      <ProfileDisconnect />
    </header>
  )
}

export default Header;
