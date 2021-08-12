import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Pages
import RegisterPage from "./Components/Pages/registerPage/registerPage";
import LoginPage from "./Components/Pages/loginPage/LoginPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <RegisterPage />
          </Route>
          <Route path="/signup">
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
