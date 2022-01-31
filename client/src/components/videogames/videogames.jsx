import Videogame from '../videogame/videogame'
import NavBar from '../navBar/navBar'
import GenreFilter from '../genreFilter/genreFilter'
import TypeFilter from '../typeFilter/typeFilter'
import Order from '../order/order'
import Pagination from '../pagination/pagination'
import Rating from '../rating/rating'
import { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { fetchVideogames } from '../../store/actions/index'
import '../videogames/videogames.css'

const Videogames = ({ videogames }) => {
  const [currentPage, setcurrentPage] = useState(1)
  const [cardsPerPage] = useState(15)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchVideogames())
  }, [])

  //GET CURRENT CARDS
  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = videogames.slice(indexOfFirstCard, indexOfLastCard)

  const paginate = (pageNumber) => setcurrentPage(pageNumber)

  return (
    <>
      <NavBar />
      <div className='filters'>
        <GenreFilter />
        <Order />
        <TypeFilter />
        <Rating />
        <Pagination cardsPerPage={cardsPerPage} totalCards={videogames.length} paginate={paginate} />
      </div>
      <div className='cards'>
        {videogames.length >= 1 &&
          <>
            {currentCards.map(videogame =>
              <Videogame key={videogame.id} name={videogame.name} image={videogame.image} rating={videogame.rating} id={videogame.id} />
            )}
          </>
        }
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    videogames: state.filteredVideogames
  }
}

export default connect(mapStateToProps)(Videogames)