import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Pages
import Signup from "./Components/PublicPages/Signup/Signup";
import Login from "./Components/PublicPages/Login/Login";
import Dashboard from "./Components/Pages/RestrictedPages/Dashboard/Dashboard";
import Profile from "./Components/Pages/RestrictedPages/Profile/Profile";
import Redirection from "./Components/PublicPages/Redirection";
import TagManagement from "./Components/Pages/RestrictedPages/AdminPage/TagManagement";
import FilterPage from "./Components/Pages/RestrictedPages/FilterPage/FilterPage";

//Routes
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import AdminRoute from "./AdminRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PublicRoute restricted={true} component={Signup} path="/" exact />
          <PublicRoute restricted={true} component={Login} path="/login" exact />
          <PrivateRoute component={Dashboard} path="/dashboard" exact />
          <PrivateRoute component={Profile} path="/profile/:id" exact />
          <PrivateRoute component={FilterPage} path="/filter/:tag" exact />
          <AdminRoute component={TagManagement} path="/admin" exact />
          <Route component={Redirection} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
