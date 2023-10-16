import React from 'react';
import { useSelector } from 'react-redux';
import "../styles/LikedPlaylist.scss";
import { SlOptions } from "react-icons/sl"
import { AiOutlineSearch } from "react-icons/ai"
import { BsFillPlayCircleFill, BsHeart } from "react-icons/bs"
import { Link } from 'react-router-dom';
import likedImg from "../assests/liked.png"
import { useDispatch } from 'react-redux';
import AUDI_PLAYER from '../redux/actions/play';

const LikedTracks = () => {
  const dispatch = useDispatch()
  const likedTracks = useSelector((state) => state.likedSong.likeSongs);

  function durationMs(ms){
    const mins = Math.floor(ms / 60000);
    const sec = ((ms % 60000) / 1000).toFixed(0);
    return `${mins}:${sec < 10 ? '0': ''}${sec}`;
  }

  function addToPlayer(trackAudio){
    dispatch({ payload: trackAudio, type: AUDI_PLAYER })
  }

  return (
    <div className='liked-tracks'>
      <div className="liked-about">
        <div className="liked-img">
          <img src={likedImg} alt="Liked_Img" />
        </div>
        <div className="liked-info">
          <p className='public-playlist'>
            PUBLIC PLAYLIST
          </p>
          <h2 className='liked-title'>Liked Songs</h2>
          <p className='liked-para'>Bekhzod ● {likedTracks.length} songs</p>
        </div>
      </div>
      <div className="container">
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
          <div className="top-tags">
                    <span># TITLE</span>
                    <p>ALBUM</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <g clip-path="url(#clip0_673_1439)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M23 14C23 18.9706 18.9706 23 14 23C9.02944 23 5 18.9706 5 14C5 9.02944 9.02944 5 14 5C18.9706 5 23 9.02944 23 14ZM25 14C25 20.0751 20.0751 25 14 25C7.92487 25 3 20.0751 3 14C3 7.92487 7.92487 3 14 3C20.0751 3 25 7.92487 25 14ZM14.5 8.5H12.5V15.5H18V13.5H14.5V8.5Z" fill="#B3B3B3"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_673_1439">
                        <rect width="28" height="28" fill="white"/>
                        </clipPath>
                    </defs>
                    </svg>
                </div>
        <div className="liked-content">
          {likedTracks.map((item, index) => (
                        <div className="music" key={item.track.id} onClick={() => addToPlayer(item)}>
                            <div className="msc-main">
                                <span className='music-number'>{index + 1}</span>
                                <div className="music-img">
                                    <img src={item.track.album.images[0].url} alt="" />
                                </div>
                                <div className="music-info">
                                    <p className='music-name'>{item.track.name}</p>
                                    <p className='music-artist'>{item.track.artists[0].name}</p>
                                </div>
                            </div>
                            <div className="music-album">
                                <p className='music-album-name'>
                                    {item.track.album.name.length > 20 ? item.track.album.name.slice(0, 20) + '...' : item.track.album.name}
                                </p>
                            </div>
                            <div className="music-duration">
                                {/* <button className='clk-like' onClick={() => addToLikedSong(item)}>
                                    <AiOutlineHeart />
                                </button> */}
                                <p>{durationMs(item.track.duration_ms)}</p>
                            </div>
                        </div>
                    ))}
        </div>
      </div>
    </div>
  );
}

export default LikedTracks;
