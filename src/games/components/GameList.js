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
          key={game.id}
          id={game.id}
          image={game.imageUrl}
          name={game.name}
          publisher={game.publisher}
          release={game.release}
          director={game.director}
          rank={game.rank}
          creatorId={game.creator}
        />
      ))}
    </ul>
  );
};

export default GameList;
