import { Link } from 'react-router-dom'
import '../buttonIntro/buttonIntro.css'

const ButtonIntro = () => {

  return (
    <>
      <div className='intro'>
        <div className='introText'>
          <p>VIDEOGAMES</p>
        </div>
        <div className='buttonContainer'>
          <Link to='/home'>
            <button className='introButton' type="button">Enter</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default ButtonIntro