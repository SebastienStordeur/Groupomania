import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Pages 
import RegisterPage from './Components/Pages/registerPage/registerPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/register'><RegisterPage /></Route>
          <Route path='/signup'></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
