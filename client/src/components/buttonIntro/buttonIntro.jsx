import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const ButtonIntro = () => {

  return (
    <div>
      <Link to='/home'>
        <button type="button">Ingrese</button>
      </Link>
    </div>
  )
}

export default ButtonIntro