import React from 'react';
import { useParams } from 'react-router-dom';

import GameList from '../components/GameList';

const DUMMY_GAMES = [
  {
    id: 'g1',
    name: 'The Legend of Zelda: Breath of the Wild',
    publisher: 'Nintendo',
    imageUrl:
      '//upload.wikimedia.org/wikipedia/en/thumb/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg/220px-The_Legend_of_Zelda_Breath_of_the_Wild.jpg',
    release: '03-03-2017',
    director: 'Hidemaro Fujibayashi',
    rank: 8,
    genreId: 'u1'
  },
  {
    id: 'g2',
    name: 'The Legend of Zelda: Breath of the Wild',
    publisher: 'Nintendo',
    imageUrl:
      '//upload.wikimedia.org/wikipedia/en/thumb/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg/220px-The_Legend_of_Zelda_Breath_of_the_Wild.jpg',
    release: '03-03-2017',
    director: 'Hidemaro Fujibayashi',
    rank: 8,
    genreId: 'u2'
  },
];

const GenreGames = () => {
  const genreId = useParams().ganreId;
  const loadedGames = DUMMY_GAMES.filter(game => game.creator === genreId);
  return <GameList items={loadedGames} />;
};

export default GenreGames;
