import { Link } from 'react-router-dom'
import SearchBar from '../searchBar/searchBar'
import '../navBar/navBar.css'

const NavBar = () => {

  return (
    <header>
      <nav className='nav'>
        <ul className='navLinks'>
          <li className='navItem'>
            <Link to='/home' className='textlink'>Home</Link>
          </li>
          <li className='navItem' >
            <Link to='/game/add' className='textlink'>Add Videogame</Link>
          </li>
        </ul>
      </nav>
      <SearchBar />
    </header >
  )
}

export default NavBar