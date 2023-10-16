import React from 'react'
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import "../styles/Music.scss"
import { AiOutlineHeart, AiOutlineLoading3Quarters } from "react-icons/ai"
import { useDispatch } from 'react-redux';
import ADD_TO_LIKE from '../redux/actions/like';
import AUDI_PLAYER from '../redux/actions/play';

const Musics = () => {
    const dispatch = useDispatch()

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

  function durationMs(ms){
    const mins = Math.floor(ms / 60000);
    const sec = ((ms % 60000) / 1000).toFixed(0);
    return `${mins}:${sec < 10 ? '0': ''}${sec}`;
  }

  function addToLikedSong(trackData){
    dispatch({ payload: trackData, type: ADD_TO_LIKE })
  }

  function addToPlayer(trackAudio){
    dispatch({ payload: trackAudio, type: AUDI_PLAYER })
  }

  return (
    <div className='musics'>
        <div className="container">
            <div className="music-content">
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
                {
                    playlistData ? (
                        playlistData?.tracks?.items.map((item, index) => (
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
                                    <button className='clk-like' onClick={() => addToLikedSong(item)}>
                                        <AiOutlineHeart />
                                    </button>
                                    <p>{durationMs(item.track.duration_ms)}</p>
                                </div>
                            </div>
                        ))
                    ):
                    <div className="skeleton">
                    <AiOutlineLoading3Quarters/>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default Musics