
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck, faHeart, faBookmark, faUserPlus, faCommentDots, faShareSquare
} from '@fortawesome/free-solid-svg-icons';
import './FooterRight.css';
// 2. Add a mute/unmute button in FooterRight.jsx
import React, { useState } from 'react';

const FooterRight = ({ videoRef, likes, comments, saves, shares, profilePic }) => {
  const [isMuted, setIsMuted] = useState(false);
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
    setLiked((prevLiked) => !prevLiked);
  };

  const handleMuteClick = () => {
    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
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
        {profilePic ? (
          <img
            src={profilePic}
            className="userprofile"
            alt="Profile"
            style={{ width: '45px', height: '45px', color: '#616161' }}
          />
        ) : null}
        <FontAwesomeIcon
          icon={userAddIcon}
          className="useradd"
          style={{ width: '15px', height: '15px', color: '#FF0000' }}
          onClick={handleUserAddClick}
        />
      </div>

      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faHeart}
          style={{ width: '35px', height: '35px', color: liked ? '#FF0000' : 'white' }}
          onClick={handleLikeClick}
        />
        <p>{formatLikesCount(parseLikesCount(likes)) + (liked ? 1 : 0)}</p>
      </div>

      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faCommentDots}
          style={{ width: '35px', height: '35px', color: 'white' }}
        />
        <p>{comments}</p>
      </div>

      <div className="sidebar-icon">
        {saved ? (
          <FontAwesomeIcon
            icon={faBookmark}
            style={{ width: '35px', height: '35px', color: '#ffc107' }}
            onClick={() => setSaved(false)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faBookmark}
            style={{ width: '35px', height: '35px', color: 'white' }}
            onClick={() => setSaved(true)}
          />
        )}
        <p>{saved ? saves + 1 : saves}</p>
      </div>

      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faShareSquare}
          style={{ width: '35px', height: '35px', color: 'white' }}
        />
        <p>{shares}</p>
      </div>

      <div className="sidebar-icon">
        <button
          style={{ width: '35px', height: '35px', color: isMuted ? '#FF0000' : 'white' }}
          onClick={handleMuteClick}
        >
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
      </div>

      <div className="sidebar-icon record">
        <img
          src="https://static.thenounproject.com/png/934821-200.png"
          alt="Record Icon"
        />
      </div>
    </div>
  );
};

export default FooterRight;