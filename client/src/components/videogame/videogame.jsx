import { Link } from 'react-router-dom'
import '../videogame/videogame.css'

const Videogame = ({ id, name, image, rating }) => {
  return (
    <div className='card'>
      <div className='textBox'>
        <p className='rating'>{rating}</p>
        <div>
          <p className='name'>
            <Link to={'/game/' + id} className='nameLink' style={{ textDecoration: 'none' }}>{name}</Link>
          </p>
        </div>
      </div >
      <div className='imgBox'>
        <img src={image} alt={name} width='150' height='84.375' />
      </div>
    </div >
  )
}

export default Videogame
