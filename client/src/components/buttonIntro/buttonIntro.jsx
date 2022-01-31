import { Link } from 'react-router-dom'
import '../buttonIntro/buttonIntro.css'

const ButtonIntro = () => {

  return (
    <>
      <div className='intro'>
        <Link to='/home'>
          <button className='introButton' type="button">Enter</button>
        </Link>
      </div>
    </>
  )
}

export default ButtonIntro