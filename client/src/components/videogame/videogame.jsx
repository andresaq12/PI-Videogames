import { Link } from 'react-router-dom'
import '../videogame/videogame.css'

const Videogame = ({ id, name, image, rating, genres }) => {

  return (
    <div className='card'>
      <div className='textBox'>
        <div className='rating'>
          <p >{rating}</p>
        </div>
        <div className='name'>
          <p>
            <Link to={'/game/' + id} className='nameLink' style={{ textDecoration: 'none' }}>{name}</Link>
          </p>
        </div>
      </div >
      <div className='hide'>
        {
          genres && genres.map(item => <p>{item.name}</p>)
        }
        {/* <p>{genres[0].name}</p> */}
      </div>
      <div className='imgBox'>
        <div className='img-card' style={{ backgroundImage: `url(${image})` }}>
        </div>
      </div>
    </div >
  )
}

export default Videogame
