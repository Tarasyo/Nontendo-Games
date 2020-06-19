import React, { useEffect, useState } from 'react';

import GenreList from '../components/GenreList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';


//Genre component send get request, and pass response in loadedGenres whisch pas to GenerList
const Genre = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedGenres, setLoadedGenres] = useState();

  
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const responseData = await sendRequest(
          'https://tarasyo.me/api/genre/'
        );

        setLoadedGenres(responseData);
        
      } catch (err) {}
    };
    fetchGenres();
   
  }, [sendRequest]);
  
 
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedGenres && <GenreList items={loadedGenres} />}
    </React.Fragment>
  );
  
};

export default Genre;
