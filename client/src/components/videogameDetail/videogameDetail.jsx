import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import NavBar from '../navBar/navBar'
import axios from 'axios'
import '../videogameDetail/videogameDetail.css'

const VideogameDetail = () => {
  const [videogame, setVideogame] = useState({})
  const { id } = useParams()

  useEffect(() => {
    axios.get(`http://localhost:3001/videogame/${id}`)
      .then(response => {
        setVideogame(response.data)
      })
  }, [])

  return (
    <>
      <NavBar />
      {
        videogame.image ?
          <div className='gameDetail'>
            <h2>{videogame.name}</h2>
            <img className='imgDetail' src={videogame.image} alt='imagen' width="200" height="112.5" />
            <h2>Genres:</h2>
            <div className='genresDetail'>
              {
                videogame.genres.map(item => <p>{item.name}</p>)
              }
            </div>
            <h2>Description:</h2>
            <div className='gameDescription'>
              <p>{videogame.description}</p>
            </div>
            <h2>Released:</h2>
            <p>{videogame.released}</p>
            <h3>Rating: {videogame.rating}</h3>
            <h3>Platforms:</h3>
            <div className='platformsDetail'>
              {
                videogame.platforms.map(item => <p>{item}</p>)
              }
            </div>
          </div>
          : <p>Loading!!</p>
      }
    </>
  )
}

export default VideogameDetail