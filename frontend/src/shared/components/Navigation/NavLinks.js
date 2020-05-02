import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';


//Navigation links component redirect user on path by presiing buttons
const NavLinks = props => {
  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>All Genres</NavLink>
    </li>
    <li>
      <NavLink to="/games/new">Add Game</NavLink>
    </li>
  </ul>
};

export default NavLinks;