import React, { useRef, useState } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';

const VideoCard = ({ url, username, description, song, likes, comments, saves, shares, profilePic }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handleVideoPress = () => {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div className="video-card">
      <video
        ref={videoRef}
        onClick={handleVideoPress}
        className="video-player"
        loop
        src={url}
      />
      <FooterLeft
        username={username}
        description={description}
        song={song}
      />
      <FooterRight
        likes={likes}
        comments={comments}
        saves={saves}
        shares={shares}
        profilePic={profilePic}
      />
    </div>
  );
};

export default VideoCard;

