import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faSearch } from '@fortawesome/free-solid-svg-icons';

const TopNavbar = () => {
  return (
    <div className="top-navbar">
      <FontAwesomeIcon icon={faTv} className="icon" />
      <div className="nav-text">
        <span>Following</span> | <span className="highlight">For You</span>
      </div>
      <FontAwesomeIcon icon={faSearch} className="icon" />
    </div>
  );
};

export default TopNavbar;

