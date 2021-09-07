import React from 'react'
import { Link } from 'react-router-dom';
import { logout } from '../../../../utils/loginLogout';

const ProfileDisconnect = () => {
  return (
    <div>
      <Link to="/">
        <h2 style={{ cursor:'pointer'}} onClick={logout}>Deconnexion</h2>
      </Link>
    </div>
  )
}

export default ProfileDisconnect
