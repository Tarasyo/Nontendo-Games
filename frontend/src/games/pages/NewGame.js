import React from 'react';
import { useHistory } from 'react-router-dom';
//import DatePicker from 'react-datepicker';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MAX
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './GameForm.css';
import { useHttpClient } from '../../shared/hooks/http-hook';


//Add new game commponent 
const NewGame = () => {
    //const [startDate, setStartDate] = useState(new Date());
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  //If some changes are made in form this wll change the value in use form 
  //isValid checks for value not to be empty the submit button will be active just if
  //all isValid will be true
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
      image: {
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
    
  
//POST request takes input value of each vatible and send it 
  const history = useHistory();

  const gameSubmitHandler = async event => {
    event.preventDefault();
    try {
        const formData = new FormData();
        formData.append('name', formState.inputs.name.value);
        formData.append('publisher', formState.inputs.publisher.value);
        formData.append('image', formState.inputs.image.value);
        formData.append('release', formState.inputs.release.value);
        formData.append('director', formState.inputs.director.value);
        formData.append('rank', formState.inputs.rank.value);
        formData.append('genreId', formState.inputs.genreId.value);
      await sendRequest(
        'http://tarasyo.me/api/games/',
        'POST',
        formData
      );
      history.push('/');
    } catch (err) {}
  };
  
//this is input form wit hhas error handalin. Iput component was custom createt and validation of the fillds as well
//Most of ipuputs requre some input just rank cheks some number not motre then 10
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
      <ImageUpload 
      id="image"
      onInput={inputHandler}
      errorText="Please provide an image."
      />
      <Input
        id="genreId"
        element="select"
        label="Select Genre"
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
