import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import GameList from '../components/GameList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const GenreGames = () => {
 const [loadedGames, setLoadedGames] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const genreId = useParams().genreId;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const responseData = await sendRequest(
          `https://5000-b8ced7cc-fda7-4fd7-92b0-6db1168d8c0c.ws-eu01.gitpod.io/api/games/genre/${genreId}`
        );
        setLoadedGames(responseData);
      } catch (err) {}
    };
    fetchGames();
  }, [sendRequest, genreId]);

  const gameDeletedHandler = deletedGameId => {
    setLoadedGames(prevGames =>
      prevGames.filter(game => game._id !== deletedGameId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedGames && <GameList items={loadedGames} onDeleteGame={gameDeletedHandler} />}
    </React.Fragment>
  );
};

export default GenreGames;
