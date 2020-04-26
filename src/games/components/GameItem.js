import React, { useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';

import './GameItem.css';

const GameItem = props => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);


  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log('DELETING...');
  };

  return (
    <React.Fragment>
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
          <div className="game-item__image">
            <img src={props.image} alt={props.name} />
          </div>
          <div className="Game-item__info">
            <h2>{props.name}</h2>
            <h3>Publisher: {props.publisher}</h3>
            <p>Release: {props.release} Director: {props.director}</p>
            <h3>RANK: {props.rank}</h3>
          </div>
          <div className="game-item__actions">
            <Button to={`/games/${props.id}`}>EDIT</Button>
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
