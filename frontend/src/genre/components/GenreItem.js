import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../../shared/components/UIElements/Avatar';
import Card from '../../shared/components/UIElements/Card';
import './GenreItem.css';

const GenreItem = props => {
  return (
    <li className="genre-item">
      <Card className="genre-item__content">
        <Link to={`/${props.id}/games`}>
          <div className="genre-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="genre-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.gamesCount} {props.gamesCount === 1 ? 'Game' : 'Games'}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default GenreItem;
