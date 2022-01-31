import { useDispatch } from 'react-redux'
import { sortVideogames } from '../../store/actions'

const Order = () => {

  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { value } = e.target
    dispatch(sortVideogames(value))
  }

  return (
    <select name='select' onChange={handleChange}>
      <option value='Selecciona'>Selecciona</option>
      <option value='Ascendente'>Ascendente</option>
      <option value='Descendente'>Descendente</option>
    </select>
  )
}

export default Order