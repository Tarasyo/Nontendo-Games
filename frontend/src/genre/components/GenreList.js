import React from 'react';

import GenreItem from './GenreItem';
import Card from '../../shared/components/UIElements/Card';
import './GenreList.css';

const GenreList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>Genre not found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="genre-list">
      {props.items.map(genre => (
        <GenreItem
          key={genre.id}
          id={genre.id}
          image={genre.image}
          name={genre.name}
          gamesCount={genre.games}
        />
      ))}
    </ul>
  );
};

export default GenreList;
