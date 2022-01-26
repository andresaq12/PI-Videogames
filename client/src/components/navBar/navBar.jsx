import { Link } from 'react-router-dom'

const NavBar = () => {

  return (
    <nav>
      <Link to='/home'>
        <span>Home</span>
      </Link>
      <Link to='/add'>
        <span>Add Videogame</span>
      </Link>
    </nav>
  )
}

export default NavBar