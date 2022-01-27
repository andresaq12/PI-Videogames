import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchVideogames } from '../../store/actions'

const SearchBar = () => {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(searchVideogames(search))
  }

  const handleInputChange = (e) => {
    setSearch(e.target.value)
    console.log(e.target.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Videojuego...' onChange={handleInputChange} />
        <input type='submit' value='Buscar' />
      </form>
    </div>
  )
}

export default SearchBar