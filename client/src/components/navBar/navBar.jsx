import { Link, Outlet } from 'react-router-dom'
import styles from '../navBar/navBar.module.css'

const NavBar = () => {

  return (
    <>
      <nav className={styles.topnav}>
        <div className={styles.container}>
          <ul>
            <li>
              <Link to='/home' style={{ textDecoration: 'none' }}> Home</Link>
            </li>
            <li>
              <Link to='/game/add' style={{ textDecoration: 'none' }}>Add Videogame</Link>
            </li>
          </ul>
        </div>
      </nav>
    </ >
  )
}

export default NavBar