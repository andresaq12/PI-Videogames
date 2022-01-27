import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import ButtonIntro from './components/buttonIntro/buttonIntro'
import FormVideogame from './components/formVideogame/formVideogame'
import GenreFilter from './components/genreFilter/genreFilter'
import NavBar from './components/navBar/navBar'
import Order from './components/order/order'
import Rating from './components/rating/rating'
import SearchBar from './components/searchBar/searchBar'
import TypeFilter from './components/typeFilter/typeFilter'
import VideogameDetail from './components/videogameDetail/videogameDetail'
import Videogames from './components/videogames/videogames'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<ButtonIntro />} />
        <Route path='/home' element={[<NavBar />, <SearchBar />, <Order />, <Rating />, <GenreFilter />, <TypeFilter />, <Videogames />]} />
        <Route path='/game/:id' element={[<NavBar />, <VideogameDetail />]} />
        <Route path='/game/add' element={[<NavBar />, <FormVideogame />]} />
        <Route path='*' element={<Navigate replace to='/home' />} />
      </Routes>
    </div >
  );
}

export default App;
