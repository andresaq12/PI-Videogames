import { Link } from 'react-router-dom'
import styles from '../videogame/videogame.module.css'

const Videogame = ({ id, name, image, rating }) => {
  return (
    <div className={styles.card}>
      <div className={styles.textBox}>
        <p className={styles.rating}>{rating}</p>
        <div>
          <p className={styles.name}>
            <Link to={'/game/' + id}>{name}</Link>
          </p>
        </div>
      </div >
      <div className={styles.imgBox} >
        <img src={image} alt={name} width='150' />
      </div>
    </div>
  )
}

export default Videogame
