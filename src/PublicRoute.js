import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from './utils/loginLogout';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    // if restricted =  false
    // = public route
    // if restricted = true
    // = restricted route
    <Route { ...rest } render={ props => (
      isLogin() && restricted ?
        <Redirect to="/dashboard" />
      : <Component { ...props } />
    )} />
  )
}

export default PublicRoute
