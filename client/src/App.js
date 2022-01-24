import { Routes, Route } from 'react-router';
import './App.css';
import Order from './components/order/order';
import SearchBar from './components/searchBar/searchBar';
import VideogameDetail from './components/videogameDetail/videogameDetail';
import Videogames from './components/videogames/videogames'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={[<SearchBar />, <Order />, <Videogames />]} />
        <Route path='/:id' element={<VideogameDetail />}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
