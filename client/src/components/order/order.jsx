import { connect } from 'react-redux'
import { sortVideogames, setCurrentPage } from '../../store/actions'

const Order = ({ sortVideogames, setCurrentPage }) => {

  const handleChange = (e) => {
    const { value } = e.target
    sortVideogames(value)
    setCurrentPage(1)
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
    sortVideogames: value => dispatch(sortVideogames(value)),
    setCurrentPage: value => dispatch(setCurrentPage(value))
  }
}

export default connect(null, mapDispatchToProps)(Order)
