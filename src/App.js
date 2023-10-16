import './App.css';
import Mixes from './components/Mixes';
import { useEffect, useState } from "react"
import RightSidebar from './components/RightSidebar';
import Main from './components/Main';
import { Route, Routes } from 'react-router-dom';
import PlaylistView from './routes/PlaylistView';
import Activity from './components/Activity';
import LikedTracks from './routes/LikedTracks';
import AudioPlayer from './routes/AudioPlayer';

function App() {
  const [ clientData, setClientData ] = useState([])
  const CLIENT_ID = 'f21942f7a0e8482da1fba61332c2ce33'
  const SECRET_ID = 'a79e8074aa054729a6c4b92912dfe598'

  useEffect(() => {
    const fetchData = async () => {
      const response =  await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + SECRET_ID)
        },
        body: 'grant_type=client_credentials'
      })
      const auth = await response.json()
      localStorage.setItem('token', `${auth.token_type} ${auth.access_token}`);
      setClientData(auth.access_token)
    }
    fetchData()
  }, [])

  return (
    <>
      <div className="App">
      <div className="App_Content">
        <RightSidebar/>
        <Main/>
        <Routes>
          <Route path='/playlist/:id' element={<PlaylistView/>}/>
          <Route path='/liked' element={<LikedTracks/>}/>
      </Routes>
        <Activity/>
      </div>
     <AudioPlayer/>
    </div>
       
    </>
  );
}

export default App;
