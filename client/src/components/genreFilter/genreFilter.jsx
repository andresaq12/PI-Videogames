import { useEffect } from "react"
import { connect } from "react-redux"
import { fetchGenres, selectGenre } from "../../store/actions"

const GenreFilter = ({ genres, selectGenre, fetchGenres }) => {

  const handleChange = (e) => {
    const { value } = e.target
    selectGenre(value)
  }

  useEffect(() => {
    fetchGenres()
  }, [])

  return (
    <select name='select' onChange={handleChange}>
      <option key={0} value={0}>All</option>
      {genres.map(genre =>
        <option key={genre.id} value={genre.id}>{genre.name}</option>
      )}
    </select>
  )
}

const mapStateToProps = (state) => {
  return {
    genres: state.genres
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenres: () => dispatch(fetchGenres()),
    selectGenre: value => dispatch(selectGenre(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GenreFilter)