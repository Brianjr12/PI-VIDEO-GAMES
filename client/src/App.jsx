import './App.css'
import {videoGames} from './api/VideoGamesApi.js'
import {Routes,Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import CreateGamePage from './pages/CreateGamePage'
import NotFoundPage from './pages/NotFoundPage'

function  App(){

  return (
    <>
      <Routes>
        <Route  path='/' element={<LoginPage/>} />
        <Route  path='/home' element={<HomePage videoGames={videoGames}  />} />
        <Route  path='/detail' element={<DetailPage />} />
        <Route  path='/create' element={<CreateGamePage />} />
        <Route  path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App
