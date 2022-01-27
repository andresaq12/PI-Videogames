import { Link, Outlet } from 'react-router-dom'

const NavBar = () => {

  return (
    <main>
      <nav>
        <Link to='/home'>
          <span>Home</span>
        </Link>
        <Link to='/game/add'>
          <span>Add Videogame</span>
        </Link>
      </nav>
      <section>
        <Outlet />
      </section>
    </main>
  )
}

export default NavBar