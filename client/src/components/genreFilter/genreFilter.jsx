import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchGenres, selectGenre } from "../../store/actions"
import { connect } from 'react-redux'

const GenreFilter = ({ genres }) => {
  const dispatch = useDispatch()
  console.log(genres)

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

const mapStatetoProps = (state) => {
  return {
    genres: state.genres
  }
}

export default connect(mapStatetoProps)(GenreFilter)