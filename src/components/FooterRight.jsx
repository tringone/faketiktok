import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck, faHeart, faBookmark, faUserPlus, faCommentDots, faShareSquare
} from '@fortawesome/free-solid-svg-icons';

function FooterRight({ likes, comments, saves, shares, profilePic }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userAddIcon, setUserAddIcon] = useState(faUserPlus);

  const handleUserAddClick = () => {
    setUserAddIcon(faCheck); // Change icon to checkmark temporarily
    setTimeout(() => {
      setUserAddIcon(faUserPlus); // Revert back after 3 seconds
    }, 3000);
  };

  const handleLikeClick = () => {
    setLiked(prevLiked => !prevLiked);
  };

  const parseLikesCount = (count) => {
    if (typeof count === 'string' && count.endsWith('K')) {
      return parseFloat(count) * 1000;
    }
    return parseInt(count);
  };

  const formatLikesCount = (count) => {
    if (count > 10000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count;
  };

  return (
    <div className="footer-right">
      <div className="sidebar-icon">
        <img src={profilePic} alt="User Profile" style={{ width: '45px', height: '45px' }} />
        <FontAwesomeIcon icon={userAddIcon} onClick={handleUserAddClick} style={{ color: '#ff0000' }} />
      </div>
      <div className="sidebar-icon">
        <FontAwesomeIcon icon={faHeart} onClick={handleLikeClick} style={{ color: liked ? '#ff0000' : 'white' }} />
        <p>{formatLikesCount(parseLikesCount(likes)) + (liked ? 1 : 0)}</p>
      </div>
      <div className="sidebar-icon">
        <FontAwesomeIcon icon={faCommentDots} style={{ color: 'white' }} />
        <p>{comments}</p>
      </div>
      <div className="sidebar-icon">
        {saved ? (
          <FontAwesomeIcon icon={faBookmark} onClick={() => setSaved(false)} style={{ color: '#ffc107' }} />
        ) : (
          <FontAwesomeIcon icon={faBookmark} onClick={() => setSaved(true)} style={{ color: 'white' }} />
        )}
        <p>{saved ? saves + 1 : saves}</p>
      </div>
      <div className="sidebar-icon">
        <FontAwesomeIcon icon={faShareSquare} style={{ color: 'white' }} />
        <p>{shares}</p>
      </div>
    </div>
  );
}

export default FooterRight;

