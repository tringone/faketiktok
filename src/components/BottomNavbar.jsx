import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserFriends, faPlus, faInbox, faUser } from '@fortawesome/free-solid-svg-icons';

const BottomNavbar = () => {
  return (
    <div className="bottom-navbar">
      <div className="nav-item"><FontAwesomeIcon icon={faHome} /><span>Home</span></div>
      <div className="nav-item"><FontAwesomeIcon icon={faUserFriends} /><span>Friends</span></div>
      <div className="nav-item"><FontAwesomeIcon icon={faPlus} /><span>Create</span></div>
      <div className="nav-item"><FontAwesomeIcon icon={faInbox} /><span>Inbox</span></div>
      <div className="nav-item"><FontAwesomeIcon icon={faUser} /><span>Profile</span></div>
    </div>
  );
};

export default BottomNavbar;
