import Videogame from '../videogame/videogame'
import NavBar from '../navBar/navBar'
import GenreFilter from '../genreFilter/genreFilter'
import TypeFilter from '../typeFilter/typeFilter'
import Order from '../order/order'
import Rating from '../rating/rating'
import { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { fetchVideogames } from '../../store/actions/index'
import '../videogames/videogames.css'

const Videogames = ({ videogames }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchVideogames())
  }, [])

  return (
    <>
      {
        videogames.length >= 1 &&
        <>
          <NavBar />
          <div className='filters'>
            <GenreFilter />
            <Order />
            <TypeFilter />
            <Rating />
            <div className='pages'>
              BOTONES PÁGINAS
            </div>
          </div>
          <div className='cards'>
            {videogames.map(videogame =>
              <Videogame key={videogame.id} name={videogame.name} image={videogame.image} rating={videogame.rating} id={videogame.id} />
            )}
          </div>
        </>
      }
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    videogames: state.filteredVideogames
  }
}

export default connect(mapStateToProps)(Videogames)