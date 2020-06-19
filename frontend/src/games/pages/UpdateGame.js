import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { VALIDATOR_REQUIRE, VALIDATOR_MAX } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './GameForm.css';

const UpdateGame = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedGame, setLoadedGame] = useState();
  const gameId = useParams().gameId;

  

  //in general works in same way as new game just before pushe new data I assign
  //the id of the game and fetch data by this id and fill the form

  const [formState, inputHandler, setFormData] = useForm(
   {
      name: {
        value: '',
        isValid: false
      },
      publisher: {
        value: '',
        isValid: false
      },
      release: {
        value: '',
        isValid: false
      },
      director: {
        value: '',
        isValid: false
      },
      rank: {
        value: '',
        isValid: false
      },
      imageUrl: {
        value: '',
        isValid: false
      },
      genreId: {
        value: '',
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const responseData = await sendRequest(
          `https://tarasyo.me/api/games/${gameId}`
        );
        setLoadedGame(responseData);
        setFormData(
        {
      name: {
        value: responseData.name,
        isValid: true
      },
      publisher: {
        value: responseData.publisher,
        isValid: true
      },
      release: {
        value: responseData.release,
        isValid: true
      },
      director: {
        value: responseData.director,
        isValid: true
      },
      rank: {
        value: responseData.rank,
        isValid: true
      },
      genreId: {
        value: responseData.genreId,
        isValid: true
      }
    },
    true
  );

      } catch (err) {}
    };
    fetchGame();
  }, [sendRequest, gameId, setFormData]);
  const history = useHistory();

  const gameUpdateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `https://tarasyo.me/api/games/${gameId}`,
        'PATCH',
        JSON.stringify({
        name: formState.inputs.name.value,
        publisher: formState.inputs.publisher.value,
        release: formState.inputs.release.value,
        director: formState.inputs.director.value,
        rank: formState.inputs.rank.value,
        genreId: formState.inputs.genreId.value
        }),
        {
          'Content-Type': 'application/json'
        }
      );
      history.push('/');
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedGame && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find Game!</h2>
        </Card>
      </div>
    );
  }


  return (
      <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
       {!isLoading && loadedGame && (
    <form className="game-form" onSubmit={gameUpdateSubmitHandler}>
       <Input
        id="name"
        element="input"
        type="text"
        label="Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid name."
        onInput={inputHandler}
        initialValue={loadedGame.name}
        initialValid={true}
      />
      <Input
        id="publisher"
        element="input"
        label="Publisher"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid name."
        onInput={inputHandler}
        initialValue={loadedGame.publisher}
        initialValid={true}
      />
      <Input
        id="release"
        element="input"
        label="Release"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid release."
        onInput={inputHandler}
        initialValue={loadedGame.release}
        initialValid={true}
      />
      
       <Input
        id="director"
        element="input"
        label="Director"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid director."
        onInput={inputHandler}
        initialValue={loadedGame.director}
        initialValid={true}
      />
       <Input
        id="rank"
        element="input"
        label="Rank"
        validators={[VALIDATOR_MAX(10)]}
        errorText="Please enter a valid Rank MAX 10."
        onInput={inputHandler}
        initialValue={loadedGame.rank}
        initialValid={true}
      />
      <Input
        id="genreId"
        element="select"
        label="Select Genre"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter one of the Genre."
        onInput={inputHandler}
        initialValue={loadedGame.genreId}
        initialValid={true}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE GAME
      </Button>
    </form>
       )}
    </React.Fragment>
  );
};

export default UpdateGame;
