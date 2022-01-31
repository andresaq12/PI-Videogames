import { useDispatch } from "react-redux"
import { selectType } from "../../store/actions"

const TypeFilter = () => {
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { value } = e.target
    dispatch(selectType(value))
  }

  return (
    <select name='select' onChange={handleChange}>
      <option value='all'>All</option>
      <option value='api'>Existing</option>
      <option value='db'>Added</option>
    </select>
  )
}

export default TypeFilter