import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import VideoCard from './components/VideoCard';
import BottomNavbar from './components/BottomNavbar';
import TopNavbar from './components/TopNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const videoUrls = [
  {
    url: require('./videos/video1.mp4'),
    profilePic: 'https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/9d429ac49d6d18de6ebd2a3fb1f39269~c5_100x100.jpeg?x-expires=1688479200&x-signature=pjH5pwSS8Sg1dJqbB1GdCLXH6ew%3D',
    username: 'csjackie',
    description: 'Lol nvm #compsci #chatgpt #ai #openai #techtok',
    song: 'Original sound - Famed Flames',
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
  },
  {
    url: require('./videos/video2.mp4'),
    profilePic: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/eace3ee69abac57c39178451800db9d5~c5_100x100.jpeg?x-expires=1688479200&x-signature=wAkVmwL7lej15%2B16ypSWQOqTP8s%3D',
    username: 'dailydotdev',
    description: 'Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes',
    song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
    likes: '13.4K',
    comments: 3121,
    saves: 254,
    shares: 420,
  },
  {
    url: require('./videos/video3.mp4'),
    profilePic: 'https://p77-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4e6698b235eadcd5d989a665704daf68~c5_100x100.jpeg?x-expires=1688479200&x-signature=wkwHDKfNuIDqIVHNm29%2FRf40R3w%3D',
    username: 'wojciechtrefon',
    description: '#programming #softwareengineer #vscode #programmerhumor #programmingmemes',
    song: 'help so many people are using my sound - Ezra',
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
  },
  {
    url: require('./videos/video4.mp4'),
    profilePic: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4bda52cf3ad31c728153859262c329db~c5_100x100.jpeg?x-expires=1688486400&x-signature=ssUbbCpZFJj6uj33D%2BgtcqxMvgQ%3D',
    username: 'faruktutkus',
    description: 'Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ',
    song: 'orijinal ses - Computer Science',
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVideos, setFilteredVideos] = useState(videoUrls);
  const videoRefs = useRef([]);
  const [currentVideoInfo, setCurrentVideoInfo] = useState(null);
  const [isSharePopupVisible, setIsSharePopupVisible] = useState(false);

  const toggleSharePopup = () => {
    setIsSharePopupVisible(!isSharePopupVisible);
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const videoElement = entry.target;
        if (entry.isIntersecting) {
          videoElement.play();
          const videoIndex = videoRefs.current.indexOf(videoElement);
          if (videoIndex !== -1) {
            setCurrentVideoInfo(filteredVideos[videoIndex]);
          }
        } else {
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe each video
    videoRefs.current.forEach((videoRef) => {
      if (videoRef) observer.observe(videoRef);
    });

    // Clean up the observer on unmount
    return () => {
      observer.disconnect();
    };
  }, [filteredVideos]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = videoUrls.filter((video) =>
        video.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredVideos(filtered);
    } else {
      setFilteredVideos(videoUrls);
    }
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
  };

  const handleDrag = (e) => {
    let initialY = 0;
    let finalY = 0;

    const onMouseDown = (event) => {
      initialY = event.clientY;
    };

    const onMouseUp = (event) => {
      finalY = event.clientY;
      if (initialY > finalY + 50) {
        setFilteredVideos((prev) => prev.slice(1).concat(prev[0]));
      } else if (initialY < finalY - 50) {
        setFilteredVideos((prev) => [prev[prev.length - 1]].concat(prev.slice(0, -1)));
      }
    };

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  };

  const handleCopy = (videoUrl) => {
    navigator.clipboard.writeText(videoUrl).then(() => {
      alert('Video URL copied to clipboard!');
    });
  };

  return (
    <div className="App">
      <TopNavbar />
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search by hashtag"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
      <div className="video-container" onMouseDown={handleDrag}>
        {filteredVideos.map((video, index) => (
          <div key={index} className="video-wrapper">
            <VideoCard
              url={video.url}
              profilePic={video.profilePic}
              username={video.username}
              description={video.description}
              song={video.song}
              likes={video.likes}
              comments={video.comments}
              saves={video.saves}
              shares={video.shares}
              setVideoRef={(ref) => (videoRefs.current[index] = ref)}
            />
            <button onClick={() => handleCopy(video.url)}>Save</button>
            <button onClick={toggleSharePopup}>Share</button>
          </div>
        ))}
      </div>
      {isSharePopupVisible && (
        <div className="share-popup">
          <h3>Share this video</h3>
          <button>Facebook</button>
          <button>Instagram</button>
          <button>Thread</button>
          <button onClick={toggleSharePopup}>Close</button>
        </div>
      )}
      {currentVideoInfo && (
        <div className="video-info">
          <h3>Video Information</h3>
          <p><strong>Username:</strong> {currentVideoInfo.username}</p>
          <p><strong>Description:</strong> {currentVideoInfo.description}</p>
          <p><strong>Song:</strong> {currentVideoInfo.song}</p>
          <p><strong>Likes:</strong> {currentVideoInfo.likes}</p>
          <p><strong>Comments:</strong> {currentVideoInfo.comments}</p>
          <p><strong>Saves:</strong> {currentVideoInfo.saves}</p>
          <p><strong>Shares:</strong> {currentVideoInfo.shares}</p>
        </div>
      )}
      <BottomNavbar />
    </div>
  );
}

export default App;
