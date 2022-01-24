import { useDispatch } from 'react-redux'
import { sortVideogames } from '../../store/actions'


const Order = () => {

  const dispatch = useDispatch()

  const handleChange = (e) => {
    console.log(e.target.value)
    dispatch(sortVideogames(e.target.value))
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