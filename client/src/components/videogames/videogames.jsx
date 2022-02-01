import NavBar from '../navBar/navBar'
import Filters from '../filters/filters'
import Pagination from '../pagination/pagination'
import Videogame from '../videogame/videogame'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchVideogames } from '../../store/actions/index'
import '../videogames/videogames.css'

const Videogames = ({ videogames, fetchVideogames }) => {
  const [currentPage, setcurrentPage] = useState(1)
  const [cardsPerPage] = useState(15)

  //GET CURRENT CARDS
  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = videogames.slice(indexOfFirstCard, indexOfLastCard)

  const paginate = (pageNumber) => setcurrentPage(pageNumber)

  useEffect(() => {
    fetchVideogames()
  }, [])

  return (
    <>
      <NavBar />
      <div className='filters'>
        <Filters />
        <Pagination cardsPerPage={cardsPerPage} totalCards={videogames.length} paginate={paginate} />
      </div>
      <div className='cards'>
        {videogames.length >= 1 &&
          <>
            {currentCards.map(videogame =>
              <Videogame key={videogame.id} name={videogame.name} image={videogame.image} rating={videogame.rating} id={videogame.id} genres={videogame.genres} />
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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchVideogames: () => dispatch(fetchVideogames())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Videogames)