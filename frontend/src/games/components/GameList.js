import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import GameItem from './GameItem';
import Button from '../../shared/components/FormElements/Button';
import './GameList.css';

const GameList = props => {
  if (props.items.length === 0) {
    return (
      <div className="game-list center">
        <Card>
          <h2>No games found. Maybe create one?</h2>
          <Button to="/games/new">Share game</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="game-list">
      {props.items.map(game => (
        <GameItem
          key={game._id}
          id={game._id}
          image={game.image}
          name={game.name}
          publisher={game.publisher}
          release={game.release}
          director={game.director}
          rank={game.rank}
          genreId={game.genreId}
          onDelete={props.onDeleteGame}
        />
      ))}
    </ul>
  );
};

export default GameList;
