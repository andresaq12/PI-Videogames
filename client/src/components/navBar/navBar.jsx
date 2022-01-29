import { Link, Outlet } from 'react-router-dom'
import styles from '../navBar/navBar.module.css'

const NavBar = () => {

  return (
    <header>
      <nav className={styles.topnav}>
        <ul>
          <li>
            <Link to='/home' className={styles.link}> Home</Link>
          </li>
          <li>
            <Link to='/game/add'>Add Videogame</Link>
          </li>
        </ul>
      </nav>
    </header >
  )
}

export default NavBar

  // < header >
  // <nav className={styles.topnav}>
  //   <div className={styles.container}>
  //     <ul>
  //       <li>
  //         <Link to='/home' style={{ textDecoration: 'none' }}> Home</Link>
  //       </li>
  //       <li>
  //         <Link to='/game/add' style={{ textDecoration: 'none' }}>Add Videogame</Link>
  //       </li>
  //     </ul>
  //   </div>
  // </nav>