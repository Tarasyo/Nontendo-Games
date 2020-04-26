import React from 'react';

import GenreList from '../components/GenreList';

const Genre = () => {
  const Genre = [
    {
      id: 'u1',
      name: 'Adventure',
      image:
        '//upload.wikimedia.org/wikipedia/en/thumb/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg/220px-The_Legend_of_Zelda_Breath_of_the_Wild.jpg',
      games: 3
    }
  ];

  return <GenreList items={Genre} />;
};

export default Genre;
