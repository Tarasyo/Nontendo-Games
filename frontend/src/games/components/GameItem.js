import React, { useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import './GameItem.css';

//GameItem takes data that passed from GameList and structure all valuse of the each object in the nice view 
const GameItem = props => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);


  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
   setShowConfirmModal(false);
    try {
      await sendRequest(
        `https://5000-b8ced7cc-fda7-4fd7-92b0-6db1168d8c0c.ws-eu01.gitpod.io/api/games/${props.id}`,
        'DELETE'
      );
      props.onDelete(props.id);
    } catch (err) {}
  };
 

  return (
    <React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="game-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this Game? Please note that it
          can't be undone thereafter.
        </p>
      </Modal>
      <li className="game-item">
        <Card className="game-item__content">
        {isLoading && <LoadingSpinner asOverlay />}
          <div className="game-item__image">
            <img src={`https://5000-b8ced7cc-fda7-4fd7-92b0-6db1168d8c0c.ws-eu01.gitpod.io/${props.image}`} alt={props.name} />
          </div>
          <div className="game-item__info">
            <h2>{props.name}</h2>
            <h3>Publisher: {props.publisher}</h3>
            <p>Release: {props.release} Director: {props.director}</p>
            <h3>RANK: {props.rank}</h3>
          </div>
          <div className="game-item__actions">
            <Button  to={`/games/${props.id}`}> EDIT</Button>
            <Button danger onClick={showDeleteWarningHandler}>
              DELETE
            </Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default GameItem;
