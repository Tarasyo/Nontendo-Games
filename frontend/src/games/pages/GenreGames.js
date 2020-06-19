import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import GameList from '../components/GameList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

//In this component fetches the data that requrite just id of the Genre 
//as we need to retrive the games that connected with this genre
const GenreGames = () => {
 const [loadedGames, setLoadedGames] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const genreId = useParams().genreId;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const responseData = await sendRequest(
          `https://tarasyo.me/api/games/genre/${genreId}`
        );
        setLoadedGames(responseData);
      } catch (err) {}
    };
    fetchGames();
  }, [sendRequest, genreId]);
  //After deliting checs ids if all games of this genre to remove from the list deleted one
  const gameDeletedHandler = deletedGameId => {
    setLoadedGames(prevGames =>
      prevGames.filter(game => game._id !== deletedGameId)
    );
  };
  //If no erros found sends data to GameList
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
