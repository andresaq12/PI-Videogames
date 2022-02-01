import { connect } from 'react-redux'
import { sortVideogames } from '../../store/actions'

const Order = ({ sortVideogames }) => {

  const handleChange = (e) => {
    const { value } = e.target
    sortVideogames(value)
  }

  return (
    <select name='select' onChange={handleChange}>
      <option value='selecciona'>Selecciona</option>
      <option value='ascendente'>A-Z</option>
      <option value='descendente'>Z-A</option>
    </select>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    sortVideogames: value => dispatch(sortVideogames(value))
  }
}

export default connect(null, mapDispatchToProps)(Order)
