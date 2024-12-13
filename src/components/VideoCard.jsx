import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types'; // Fix: Import PropTypes
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';

const VideoCard = (props) => {
  const {
    url,
    username,
    description,
    song,
    likes,
    shares,
    comments,
    saves,
    profilePic,
    setVideoRef,
    autoplay
  } = props;

  const videoRef = useRef(null);

  useEffect(() => {
    if (autoplay && videoRef.current) {
      videoRef.current.play();
    }
  }, [autoplay]);

  const onVideoPress = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div className="video">
      {/* The video element */}
      <video
        className="player"
        onClick={onVideoPress}
        ref={(ref) => {
          videoRef.current = ref;
          if (typeof setVideoRef === 'function') {
            setVideoRef(ref);
          }
        }}
        loop
        muted
        playsInline
        src={url}
      ></video>

      <div className="bottom-controls">
        <div className="footer-left">
          <FooterLeft username={username} description={description} song={song} />
        </div>
        <div className="footer-right">
          <FooterRight
            likes={likes}
            shares={shares}
            comments={comments}
            saves={saves}
            profilePic={profilePic}
          />
        </div>
      </div>
    </div>
  );
};

// PropTypes validation
VideoCard.propTypes = {
  url: PropTypes.string.isRequired,
  username: PropTypes.string,
  description: PropTypes.string,
  song: PropTypes.string,
  likes: PropTypes.number,
  shares: PropTypes.number,
  comments: PropTypes.number,
  saves: PropTypes.number,
  profilePic: PropTypes.string,
  setVideoRef: PropTypes.func,
  autoplay: PropTypes.bool
};

VideoCard.defaultProps = {
  username: '',
  description: '',
  song: '',
  likes: 0,
  shares: 0,
  comments: 0,
  saves: 0,
  profilePic: '',
  autoplay: false
};

export default VideoCard;
