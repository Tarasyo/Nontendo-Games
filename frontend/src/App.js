//Just the App.js which is passed to the index.js 
//This commponent holds and return the main page components

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Genre from './genre/pages/Genre';
import NewGame from './games/pages/NewGame';
import GenreGames from './games/pages/GenreGames';
import UpdateGame from './games/pages/UpdateGame';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Genre />
          </Route>
          <Route path="/:genreId/games" exact>
            <GenreGames />
          </Route>
          <Route path="/games/new" exact>
            <NewGame />
          </Route>
          <Route path="/games/:gameId">
            <UpdateGame />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
