import { connect } from "react-redux"
import { selectType, setCurrentPage } from "../../store/actions"

const TypeFilter = ({ selectType, setCurrentPage }) => {

  const handleChange = (e) => {
    const { value } = e.target
    selectType(value)
    setCurrentPage(1)
  }

  return (
    <select name='select' onChange={handleChange}>
      <option value='all'>All</option>
      <option value='api'>Existing</option>
      <option value='db'>Added</option>
    </select>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectType: value => dispatch(selectType(value)),
    setCurrentPage: value => dispatch(setCurrentPage(value))
  }
}

export default connect(null, mapDispatchToProps)(TypeFilter)