import { useDispatch } from 'react-redux'
import { ratingVideogames } from '../../store/actions'


const Rating = () => {

  const dispatch = useDispatch()

  const handleChange = (e) => {
    console.log(e.target.value)
    dispatch(ratingVideogames(e.target.value))
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