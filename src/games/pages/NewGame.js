import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './GameForm.css';

const NewGame = () => {
  const [formState, inputHandler] = useForm(
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
      }
    },
    false
  );

  const gameSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs); // send this to the backend!
  };

  return (
    <form className="game-form" onSubmit={gameSubmitHandler}>
      <Input
        id="name"
        element="input"
        type="text"
        label="Name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid name."
        onInput={inputHandler}
      />
      <Input
        id="publisher"
        element="input"
        label="Publisher"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid name."
        onInput={inputHandler}
      />
      <Input
        id="release"
        element="input"
        label="Release"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid release."
        onInput={inputHandler}
      />
       <Input
        id="director"
        element="input"
        label="Director"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid director."
        onInput={inputHandler}
      />
       <Input
        id="rank"
        element="input"
        label="Rank"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid Rank."
        onInput={inputHandler}
      />
      <Input
        id="imgeUrl"
        element="input"
        label="Image URL"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid URL."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD GAME
      </Button>
    </form>
  );
};

export default NewGame;
