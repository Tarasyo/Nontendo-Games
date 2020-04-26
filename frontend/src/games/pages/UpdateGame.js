import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import {
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './GameForm.css';

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
];

const UpdateGame = () => {
  const [isLoading, setIsLoading] = useState(true);
  const gameId = useParams().gameId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: '',
        isValid: false
      },
      publisher: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const identifiedGame = DUMMY_GAMES.find(p => p.id === gameId);

  useEffect(() => {
    if (identifiedGame) {
      setFormData(
        {
          name: {
            value: identifiedGame.name,
            isValid: true
          },
          publisher: {
            value: identifiedGame.publisher,
            isValid: true
          }
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedGame]);

  const GameUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedGame) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find Game!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="game-form" onSubmit={GameUpdateSubmitHandler}>
      <Input
        id="name"
        element="input"
        type="text"
        label="name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid name."
        onInput={inputHandler}
        initialValue={formState.inputs.name.value}
        initialValid={formState.inputs.name.isValid}
      />
      <Input
        id="publisher"
        element="textarea"
        label="publisher"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid publisher."
        onInput={inputHandler}
        initialValue={formState.inputs.publisher.value}
        initialValid={formState.inputs.publisher.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE GAME
      </Button>
    </form>
  );
};

export default UpdateGame;
