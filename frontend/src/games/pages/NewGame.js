import React from 'react';
import { useHistory } from 'react-router-dom';
//import DatePicker from 'react-datepicker';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MAX
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './GameForm.css';
import { useHttpClient } from '../../shared/hooks/http-hook';

const NewGame = () => {
    //const [startDate, setStartDate] = useState(new Date());
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
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
      },
      genreId: {
        value: '',
        isValid: false
      }
    },
    false
  );
    
  

  const history = useHistory();

  const gameSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        'https://5000-b8ced7cc-fda7-4fd7-92b0-6db1168d8c0c.ws-eu01.gitpod.io/api/games/',
        'POST',
        JSON.stringify({
        name: formState.inputs.name.value,
        publisher: formState.inputs.publisher.value,
        imageUrl: formState.inputs.imageUrl.value,
        release: formState.inputs.release.value,
        director: formState.inputs.director.value,
        rank: formState.inputs.rank.value,
        genreId: formState.inputs.genreId.value
        }),
        { 'Content-Type': 'application/json' }
      );
      history.push('/');
    } catch (err) {}
  };
  

  return (
      <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="game-form" onSubmit={gameSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
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
        validators={[VALIDATOR_MAX(10)]}
        errorText="Please enter a valid Rank MAX 10."
        onInput={inputHandler}
      />
      <Input
        id="imageUrl"
        element="input"
        label="Image URL"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid URL."
        onInput={inputHandler}
      />
      <Input
        id="genreId"
        element="select"
        label="Genre Options"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter one of the Genre."
        onInput={inputHandler}
      />
      
        

      <Button type="submit" disabled={!formState.isValid}>
        ADD GAME
      </Button>
    </form>
    
    </React.Fragment>
    
  );
};

export default NewGame;
