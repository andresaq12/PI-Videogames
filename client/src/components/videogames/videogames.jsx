import Videogame from '../videogame/videogame'
import { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { fetchVideogames } from '../../store/actions/index'


const Videogames = ({ videogames }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchVideogames())
  }, [])

  return (
    <>
      {videogames.map(videogame =>
        <Videogame key={videogame.id} name={videogame.name} image={videogame.image} rating={videogame.rating} />
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    videogames: state.filteredVideogames
  }
}

export default connect(mapStateToProps)(Videogames)