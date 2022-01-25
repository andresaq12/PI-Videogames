import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchGenres, selectGenre } from "../../store/actions"


const GenreFilter = () => {
  const genres = useSelector(state => state.genres)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(selectGenre(e.target.value))
  }

  useEffect(() => {
    dispatch(fetchGenres())
  }, [])

  return (
    <select name='select' onChange={handleChange}>
      <option value='all'>All</option>
      {genres.map(genre =>
        <option key={genre.id} value={genre.id}>{genre.name}</option>
      )}
    </select>
  )
}

export default GenreFilter