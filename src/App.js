import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Pages
import RegisterPage from "./Components/Pages/registerPage/registerPage";
import LoginPage from "./Components/Pages/loginPage/LoginPage";
import DashboardPage from "./Components/Pages/Dashboard/DashboardPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <RegisterPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/dashboard">
            <DashboardPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
