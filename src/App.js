import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'



import './App.css';

import MainNavigation from './shared/components/Navigation/MainNavigation';




const App = () => {
  return (
  <Router>
    <MainNavigation />
    <main>
    <Switch>
      <Route path="/" exact>
        
      </Route>
      <Route path="/games" exact>
        
      </Route>
      
      <Redirect to="/" />
      </Switch>
      </main>
  </Router>
  );
};

export default App;
