import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Pages
import Signup from "./Components/PublicPages/Signup/Signup";
import Login from "./Components/PublicPages/Login/Login";
import Dashboard from "./Components/Pages/RestrictedPages/Dashboard/Dashboard";
import ProfilePage from "./Components/Pages/Profile/ProfilePage";

//Routes
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PublicRoute restricted={false} component={Signup} path="/" exact />
{/*           <Route exact path="/">
            <RegisterPage />
          </Route> */}
           <PublicRoute restricted={false} component={Login} path="/login" exact /> 
{/*           <Route path="/login">
            <LoginPage />
          </Route> */}
          {/* <PrivateRoute component={DashboardPage} path="/dashboard" exact /> */}
           <Route path="/dashboard">
            <Dashboard />
          </Route> 
          {/* <PrivateRoute component={ProfilePage} path="/profile:id" exact /> */}
        <Route path="/profile/:id" children={<ProfilePage />}>
          </Route> 
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
