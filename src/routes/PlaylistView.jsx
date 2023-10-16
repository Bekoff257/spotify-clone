import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SlOptions } from "react-icons/sl"
import { AiOutlineSearch } from "react-icons/ai"
import { BsFillPlayCircleFill, BsHeart } from "react-icons/bs"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import '../styles/PlaylistView.scss';
import Musics from '../components/Musics';

const PlaylistView = () => {
  const { id } = useParams();
  const [playlistData, setPlaylistData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log(data);
        setPlaylistData(data);
      } catch (error) {
        console.error('Error fetching playlist data:', error);
      }
    };
    fetchData();
  }, [id]);

  const calculateTotalDuration = () => {
    if (playlistData && playlistData.tracks) {
      const totalDurationMs = playlistData.tracks.items.reduce(
        (acc, track) => acc + track.track.duration_ms,
        0
      );
      const totalDurationHours = Math.floor(totalDurationMs / 3600000);
      const totalDurationMinutes = Math.floor((totalDurationMs % 3600000) / 60000);
      return { totalDurationHours, totalDurationMinutes };
    }
    return { totalDurationHours: 0, totalDurationMinutes: 0 };
  };

  const totalDuration = calculateTotalDuration();

  return (
    <div className="playlist-view">
        <div className="playlistview-content">
            <div className="next-prev-btn">
            <Link to={'/'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle opacity="0.5" cx="20" cy="20" r="20" fill="black"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5425 19.302C12.1381 19.7064 12.1546 20.3669 12.5787 20.7506L23.2736 30.4269C23.7855 30.8901 24.576 30.8506 25.0392 30.3386C25.5023 29.8267 25.4628 29.0362 24.9509 28.5731L15.4253 19.9547L24.9961 10.3839C25.4843 9.89573 25.4843 9.10427 24.9961 8.61612C24.508 8.12796 23.7165 8.12796 23.2284 8.61612L12.5425 19.302Z" fill="white"/>
            </svg>
            </Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle opacity="0.5" cx="20" cy="20" r="20" fill="black"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M27.0701 19.302C27.4745 19.7064 27.458 20.3669 27.0339 20.7506L16.339 30.4269C15.8271 30.8901 15.0366 30.8506 14.5735 30.3386C14.1103 29.8267 14.1498 29.0362 14.6617 28.5731L24.1873 19.9547L14.6165 10.3839C14.1283 9.89573 14.1283 9.10427 14.6165 8.61612C15.1046 8.12796 15.8961 8.12796 16.3843 8.61612L27.0701 19.302Z" fill="white"/>
                </svg>
            </div>
          {playlistData && (
            <div className="top_playlist">
              <div className="info-img">
                <img src={playlistData.images?.[0]?.url} alt="top_image" />
              </div>
              <div className="info-text">
                <p className="playlist-type">{playlistData.public ? <span>PUBLIC PLAYLIST</span> : <span>PRIVATE PLAYLIST</span>}</p>
                <h3 className="playlist-name">{playlistData.name}</h3>
                <p className="playlist-desc">{playlistData.description}</p>
                <p className="playlist-owner">
                  Made for <span>{playlistData.owner?.display_name}</span> ● {playlistData.tracks?.total} songs,
                  {totalDuration.totalDurationHours} hours {totalDuration.totalDurationMinutes} min
                </p>
              </div>
            </div>
          )}
          <div className="btn-functions">
            <div className="fn-btns">
                <button className='play-fnbtn'>
                    <BsFillPlayCircleFill/>
                </button>
                <Link to={'/liked'} className='like-fnbtn'>
                    <BsHeart/>
                </Link>
                <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
                    <g clip-path="url(#clip0_131_2995)">
                        <circle cx="26" cy="26" r="17.75" stroke="white" stroke-width="2.5"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M34.8388 28.9289L26.8839 36.8839C26.3957 37.372 25.6043 37.372 25.1161 36.8839L17.1612 28.9289C16.673 28.4408 16.673 27.6493 17.1612 27.1612C17.6493 26.673 18.4408 26.673 18.9289 27.1612L24.75 32.9822L24.75 17C24.75 16.3096 25.3096 15.75 26 15.75C26.6904 15.75 27.25 16.3096 27.25 17L27.25 32.9822L33.0711 27.1612C33.5592 26.673 34.3507 26.673 34.8388 27.1612C35.327 27.6493 35.327 28.4408 34.8388 28.9289Z" fill="white"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_131_2995">
                        <rect width="52" height="52" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
                <button className='options'>
                    <SlOptions/> 
                </button>
            </div>
            <div className="custom-order-search">
                <AiOutlineSearch/>
                <select>
                    <option>Custom Order</option>
                    <option>Ascending</option>
                    <option>Descending</option>
                </select>
            </div>
          </div>
        </div>
        {
          playlistData ? (
            <div className="musics-table">
            <Musics/>
          </div>
          ):
          <div className="skeleton">
           <AiOutlineLoading3Quarters/>
          </div>
        }
    </div>
  );
};

export default PlaylistView;
