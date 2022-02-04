import GenreFilter from '../genreFilter/genreFilter'
import TypeFilter from '../typeFilter/typeFilter'
import Order from '../order/order'
import Rating from '../rating/rating'
import { Link } from 'react-router-dom'
import '../filters/filters.css'

const Filters = () => {

  return (
    <div className='containerFilter'>
      <p>Genres:</p>
      <GenreFilter />
      <p>Database:</p>
      <TypeFilter />
      <p>Order:</p>
      <Order />
      <p>Rating:</p>
      <Rating />
      <Link to='/game/add'>
        <button className='addGame'>Add Game</button>
      </Link>
    </div>
  )
}

export default Filters