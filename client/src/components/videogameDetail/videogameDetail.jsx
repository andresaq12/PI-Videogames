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
            <h2>{videogame.name}</h2>
            <h4>{videogame.rating}</h4>
            <img src={videogame.image} alt='imagen' width="125" height="100" />
          </>
          : <p>Loading!!</p>
      }
    </div>
  )
}

export default VideogameDetail