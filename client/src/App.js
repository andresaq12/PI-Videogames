import { Routes, Route } from 'react-router';
import './App.css';
import ButtonIntro from './components/buttonIntro/buttonIntro';
import GenreFilter from './components/genreFilter/genreFilter';
import Order from './components/order/order';
import Rating from './components/rating/rating';
import SearchBar from './components/searchBar/searchBar';
import VideogameDetail from './components/videogameDetail/videogameDetail';
import Videogames from './components/videogames/videogames'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<ButtonIntro />} />
        <Route path='/home' element={[<SearchBar />, <Order />, <Rating />, <GenreFilter />, <Videogames />]} />
        <Route path='/:id' element={<VideogameDetail />}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
