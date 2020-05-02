import React from 'react';
import ReactDOM from 'react-dom';

import './Backdrop.css';

//Back drope in time when SideDrawer works u can close and open navigation bar
const Backdrop = props => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
