import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";

//Pages
import Signup from "./Components/PublicPages/Signup/Signup";
import Login from "./Components/PublicPages/Login/Login";
import Dashboard from "./Components/Pages/RestrictedPages/Dashboard/Dashboard";
import Profile from "./Components/Pages/RestrictedPages/Profile/Profile";

//Routes
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PublicRoute restricted={true} component={Signup} path="/" exact />
          <PublicRoute restricted={true} component={Login} path="/login" exact /> 
          <PrivateRoute component={Dashboard} path="/dashboard" exact />
          <PrivateRoute component={Profile} path="/profile/:id" exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
