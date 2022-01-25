import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

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
    <div>
      {
        videogame.image ?
          <>
            <h2>Name:</h2>
            <h2>{videogame.name}</h2>
            <img src={videogame.image} alt='imagen' width="125" height="100" />
            <h2>Genres:</h2>
            {
              videogame.genres.map(item => <p>{item.name}</p>)
            }
            <h2>Description:</h2>
            <p>{videogame.description}</p>
            <h2>Released:</h2>
            <p>{videogame.released}</p>
            <h3>Rating: {videogame.rating}</h3>
            <h3>Platforms:</h3>
            {
              videogame.platforms.map(item => <p>{item}</p>)
            }
          </>
          : <p>Loading!!</p>
      }
    </div>
  )
}

export default VideogameDetail