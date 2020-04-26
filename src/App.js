import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'



import './App.css';
import Users from './types/pages/Users.js';
import NewPlace from './game/games/NewGame.js/index.js';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import TypeGames from './game/games/TypeGames';



const App = () => {
  return (
  <Router>
    <MainNavigation />
    <main>
    <Switch>
      <Route path="/" exact>
        <Users />
      </Route>
      <Route path="/:userId/places" exact>
        <TypeGames />
      </Route>
      <Route path="/places/new" exact>
        <NewPlace />
      </Route>
      <Redirect to="/" />
      </Switch>
      </main>
  </Router>
  );
};

export default App;
