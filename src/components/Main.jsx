import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "../styles/Main.scss"
import Mixes from './Mixes'
import Made from './Made'
import Recent from './Recent'
import Jump from './Jump'
import Unique from './Unique'
import { useLocation } from 'react-router-dom'
const expRoutes = ["/liked"]

const Main = () => {
    const location = useLocation()
    const TOKEN = localStorage.getItem('token')
    const [ mixesData, setMixesData ] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.spotify.com/v1/browse/featured-playlists', {
                    headers: {
                        'Authorization': TOKEN,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                data.playlists.items.length = 6
                setMixesData(data); 
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

  return !expRoutes.includes(location.pathname) ? (
    <div className='main' style={{display: location.pathname.includes('playlist') ? 'none' : 'block'}}>
        <div className="container">
            <div className="main-content">
                <h1>Good afternoon</h1>
                <div className="playlists-main">
                    <div className="playlists">
                        {mixesData.playlists?.items.map((item) => (
                            <div className="playlist" key={item.id}>
                                <Link to={`/playlist/${item.id}`}>
                                    <img src={item.images[0].url} alt="" />
                                    <h3>{item.name}</h3>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mixes-section">
                    <h1>Your top mixes</h1>
                    <Mixes/>
                </div>
                <div className="made-section">
                    <h1>Made for you</h1>
                    <Made/>
                </div>
                <div className="recent-section">
                    <h1>Recently played</h1>
                    <Recent/>
                </div>
                <div className="jump-section">
                    <h1>Jump back in</h1>
                    <Jump/>
                </div>
                <div className="unique-section">
                    <h1>Uniquely yours</h1>
                    <Unique/>
                </div>
            </div>
        </div>
    </div>
  ) : <></>
}

export default Main