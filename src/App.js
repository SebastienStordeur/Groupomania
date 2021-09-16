import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Pages
import RegisterPage from "./Components/Pages/registerPage/registerPage";
import LoginPage from "./Components/Pages/loginPage/LoginPage";
import DashboardPage from "./Components/Pages/Dashboard/DashboardPage";
import ProfilePage from "./Components/Pages/Profile/ProfilePage";

//Routes
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PublicRoute restricted={false} component={RegisterPage} path="/" exact />
{/*           <Route exact path="/">
            <RegisterPage />
          </Route> */}
          <PublicRoute restricted={false} component={LoginPage} path="/login" exact />
{/*           <Route path="/login">
            <LoginPage />
          </Route> */}
          {/* <PrivateRoute component={DashboardPage} path="/dashboard" exact /> */}
           <Route path="/dashboard">
            <DashboardPage />
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
