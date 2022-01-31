import { useDispatch } from 'react-redux'
import { ratingVideogames } from '../../store/actions'

const Rating = () => {

  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { value } = e.target
    dispatch(ratingVideogames(value))
  }

  return (
    <select name='select' onChange={handleChange}>
      <option value='selecciona'>Selecciona</option>
      <option value='ratingUp'>Menos a Mas</option>
      <option value='ratingDown'>Mas a menos</option>
    </select>
  )
}

export default Rating