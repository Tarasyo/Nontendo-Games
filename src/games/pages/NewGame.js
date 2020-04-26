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
        label="name"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid name."
        onInput={inputHandler}
      />
      <Input
        id="publisher"
        element="textarea"
        label="publisher"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid name."
        onInput={inputHandler}
      />
      <Input
        id="release"
        element="input"
        label="release"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid release."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD GAME
      </Button>
    </form>
  );
};

export default NewGame;
