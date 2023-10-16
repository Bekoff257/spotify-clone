import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Uniqu.scss'


const Unique = () => {
    const TOKEN = localStorage.getItem('token')
    const [ mixesDataPlay, setMixesDataPlay ] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFCbimwdOYlsl/playlists', {
                    headers: {
                        'Authorization': TOKEN,
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                data.playlists.items.length = 4
                setMixesDataPlay(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

  return (
    <div className='unique'>
        <div className="unique-content">
             {mixesDataPlay.playlists?.items.map((item) => (
                    <div className="playlist" key={item.id}>
                        <Link to={`/playlist/${item.id}`}>
                            <img src={item.images[0].url} alt="" />
                            <h3>{item.name}</h3>
                            <p>{item.description.length > 15 ? item.description.slice(0, 100) + '...' : item.description}</p>
                        </Link>
                    </div>
            ))}
        </div>
    </div>
  )
}

export default Unique