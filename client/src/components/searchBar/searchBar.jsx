import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchVideogames } from '../../store/actions'
import styles from '../searchBar/searchBar.css'

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
        <button className={styles.button} type='submit' value='Buscar'>Buscar</button>
      </form>
    </div>
  )
}

export default SearchBar