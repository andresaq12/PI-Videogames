import { connect, useDispatch } from 'react-redux'
import { ratingVideogames } from '../../store/actions'

const Rating = ({ ratingVideogames }) => {

  const handleChange = (e) => {
    const { value } = e.target
    ratingVideogames(value)
  }

  return (
    <select name='select' onChange={handleChange}>
      <option value='selecciona'>Selecciona</option>
      <option value='ratingUp'>Menor a mayor</option>
      <option value='ratingDown'>Mayor a menor</option>
    </select>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    ratingVideogames: value => dispatch(ratingVideogames(value))
  }
}

export default connect(null, mapDispatchToProps)(Rating)