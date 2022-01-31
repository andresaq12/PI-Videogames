import { Routes, Route, Navigate } from 'react-router-dom'
import ButtonIntro from './components/buttonIntro/buttonIntro'
import FormVideogame from './components/formVideogame/formVideogame'
import VideogameDetail from './components/videogameDetail/videogameDetail'
import Videogames from './components/videogames/videogames'
import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<ButtonIntro />} />
        <Route path='/home' element={<Videogames />} />
        <Route path='/game/:id' element={<VideogameDetail />} />
        <Route path='/game/add' element={<FormVideogame />} />
        <Route path='*' element={<Navigate replace to='/home' />} />
      </Routes>
    </div >
  );
}

export default App;
