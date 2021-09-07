import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from './utils/loginLogout';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (

    //show the component only when the user is logged in
    //Otherwise, redirect to register page
    <Route { ...rest} render={ props => (
      isLogin() ?
        <Component { ...props } />
      : <Redirect to="/" />
    )} />
  )
}

export default PrivateRoute
