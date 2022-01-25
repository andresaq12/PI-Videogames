import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { selectGenre } from "../../store/actions"


const GenreFilter = () => {
  const dispatch = useDispatch()

  const handleChange = (e) => {
    console.log(e.target.value)
    dispatch(selectGenre(e.target.value))
  }

  useEffect()

  return (
    <select name='select' onChange={handleChange}>
      <option value='selecciona'>Selecciona</option>
      <option value='Action'>Action</option>
      <option value='Adventure'>Adventure</option>
    </select>
  )
}

export default GenreFilter