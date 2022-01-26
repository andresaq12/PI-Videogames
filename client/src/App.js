import { Routes, Route } from 'react-router';
import './App.css';
import ButtonIntro from './components/buttonIntro/buttonIntro';
import FormVideogame from './components/formVideogame/formVideogame';
import GenreFilter from './components/genreFilter/genreFilter';
import NavBar from './components/navBar/navBar';
import Order from './components/order/order';
import Rating from './components/rating/rating';
import SearchBar from './components/searchBar/searchBar';
import TypeFilter from './components/typeFilter/typeFilter';
import VideogameDetail from './components/videogameDetail/videogameDetail';
import Videogames from './components/videogames/videogames'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<ButtonIntro />}>
          <Route index element={<NavBar />} />
        </Route>
        <Route path='/home' element={[<SearchBar />, <Order />, <Rating />, <GenreFilter />, <TypeFilter />, <Videogames />]} />
        <Route path='/:id' element={<VideogameDetail />} />
        <Route path='/add' element={<FormVideogame />} />
      </Routes>
    </div>
  );
}

export default App;
