import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideogames } from '../store/actions/index'
import Videogame from './videogame';

const Videogames = () => {

  const videogames = useSelector(state => state.videogames)
  const dispatch = useDispatch()
  console.log(videogames)
  useEffect(() => {
    dispatch(fetchVideogames())
  }, [])

  return (
    <>
      {videogames.map(videogame =>
        <Videogame key={videogame.id} name={videogame.name} image={videogame.image} />
      )}
    </>
  )
}

export default Videogames