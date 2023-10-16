import React from 'react'
import '../styles/RightSidebar.scss'
import { HiMiniHome } from "react-icons/hi2"
import { NavLink } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { BiLibrary } from 'react-icons/bi'
import { useState, useEffect } from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { Link } from 'react-router-dom'

const RightSidebar = () => {
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
                setMixesData(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

  return (
    <div className='right-sidebar'>
        <div className="container">
            <div className="right-content">
                <div className="hero-right">
                    <ul className='hero-list'>
                        <li className='hero-item'>
                            <NavLink to={'/'} className={({isActive}) => isActive ? 'active' : ''}>
                                <HiMiniHome />
                                Home
                            </NavLink>
                        </li>
                        <li className='hero-item'>
                            <NavLink to={'/'} className={({isActive}) => isActive ? 'active' : ''}>
                                <FiSearch />
                                Search
                            </NavLink>
                        </li>
                        <li className='hero-item'>
                            <NavLink to={'/'} className={({isActive}) => isActive ? 'active' : ''}>
                                <BiLibrary />
                                Your Library
                            </NavLink>
                        </li>
                    </ul>
                    <div className="main_hero">
                    <ul className='main-hero-list'>
                        <li className='main-hero-item'>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 0C0.895431 0 0 0.895431 0 2V30C0 31.1046 0.895431 32 2 32H30C31.1046 32 32 31.1046 32 30V2C32 0.895431 31.1046 0 30 0H2ZM15 9H17V15H23V17H17V23H15V17H9V15H15V9Z" fill="white"/>
                                </svg>
                                Create Playlist
                            </button>
                        </li>
                        <li className='main-hero-item'>
                        <NavLink to={'/liked'} className={({isActive}) => isActive ? 'active' : ''}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <rect width="32" height="32" rx="2" fill="url(#paint0_linear_124_3039)"/>
                            <path d="M16.0006 10.158C17.6448 8.56071 20.1858 8.61373 21.7699 10.3307C23.3532 12.0484 23.4078 14.784 21.9351 16.5684L15.9992 23L10.0647 16.5684C8.59191 14.784 8.64721 12.0439 10.2299 10.3307C11.8154 8.616 14.3514 8.55844 16.0006 10.158Z" fill="white"/>
                            <defs>
                                <linearGradient id="paint0_linear_124_3039" x1="1" y1="1" x2="32" y2="30.5" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#3822EA"/>
                                <stop offset="1" stop-color="#C7E9D7"/>
                                </linearGradient>
                            </defs>
                            </svg>
                            Liked Songs
                        </NavLink>
                        </li>
                    </ul>
                    </div>
                    <div className="mixed">
                    <ul className='mix_list'>
                        {
                            mixesData ? (
                                mixesData.playlists?.items.map((mix) => (
                                    <li key={mix.id} className='mix-item'>
                                        <Link to={`/playlist/${mix.id}`}>
                                            {mix.name.length > 20 ? mix.name.slice(0, 20) + '...' : mix.name}
                                        </Link>
                                    </li>
                                ))
                            ) : <div className="skeleton">
                                <AiOutlineLoading3Quarters/>
                            </div>
                        }
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RightSidebar