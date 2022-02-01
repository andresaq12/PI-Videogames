import { connect } from "react-redux"
import { selectType } from "../../store/actions"

const TypeFilter = ({ selectType }) => {

  const handleChange = (e) => {
    const { value } = e.target
    selectType(value)
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
    selectType: value => dispatch(selectType(value))
  }
}

export default connect(null, mapDispatchToProps)(TypeFilter)