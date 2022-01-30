import NavBar from '../navBar/navBar'
import { useState } from "react"
import { connect } from 'react-redux'
import axios from 'axios'
import '../formVideogame/formVideogame.css'

const FormVideogame = ({ genres }) => {
  const [videogame, setVideogame] = useState({ genres: [], platforms: [] })

  const platform = ['Xbox One', 'PlayStation 4', 'Xbox 360', 'PC', 'macOs', 'Linux', 'Xbox Series S/X', 'Xbox', 'PlayStation 5', 'Nintendo Switch', 'PlayStation 2', 'PlayStation 3']

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:3001/videogame`, videogame)
      .then(() => { })
  }

  const handleInputChange = (e) => {
    setVideogame({
      ...videogame,
      [e.target.name]: e.target.value
    })
  }

  const handleGenreChange = (e) => {
    if (!videogame[e.target.name].includes(e.target.value)) {
      setVideogame({
        ...videogame,
        [e.target.name]: [...videogame[e.target.name], e.target.value]
      })
    } else {
      setVideogame({
        ...videogame,
        [e.target.name]: [...videogame[e.target.name].filter(data => data !== e.target.value)]
      })
    }

  }
  const handlePlatformChange = (e) => {
    if (!videogame[e.target.name].includes(e.target.value)) {
      setVideogame({
        ...videogame,
        [e.target.name]: [...videogame[e.target.name], e.target.value]
      })
    } else {
      setVideogame({
        ...videogame,
        [e.target.name]: [...videogame[e.target.name].filter(data => data !== e.target.value)]
      })
    }
  }

  return (
    <>
      <NavBar />
      <div className='gameForm'>
        <p>Add Videogame</p>
        <form onSubmit={handleSubmit} autoComplete='off' >
          {/* <label htmlFor=''>Name:</label> */}
          <input onChange={handleInputChange} name="name" type='text' placeholder='Name' />
          {/* <label htmlFor=''>Image:</label> */}
          <input onChange={handleInputChange} name="image" placeholder='Image' type='text' />
          {/* <label htmlFor=''>Released Date:</label> */}
          <input onChange={handleInputChange} name="released" placeholder='Released (YYYY-MM-DD)' type='text' />
          {/* <label htmlFor=''>Rating:</label> */}
          <input onChange={handleInputChange} name="rating" placeholder='Rating' type='text' />
          {/* <label htmlFor=''>Description:</label> */}
          <textarea id='description' onChange={handleInputChange} name="description" placeholder='  Write a description...' />
          <label htmlFor=''>Genres:</label>
          <select name='genres' onChange={handleGenreChange}>
            <option value='select'>Select</option>
            {genres.map(data =>
              <option key={data.id} value={data.id}>{data.name}</option>
            )}
          </select>
          {
            videogame.genres.length > 0 ? videogame.genres.map(item => {
              let data = genres.find(element => element.id === item)
              return <p>{data.name}</p>
            }) : <></>
          }
          <label htmlFor=''>Platforms:</label>
          <select name='platforms' onChange={handlePlatformChange}>
            <option value='select2'>Select</option>
            {platform.map(data =>
              <option key={data} value={data}>{data}</option>
            )}
          </select>
          {
            videogame.platforms.length > 0 ? videogame.platforms.map(item => <p>{item}</p>) : <></>
          }
          <input type='submit' value='Submit' />
        </form>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    genres: state.genres
  }
}

export default connect(mapStateToProps)(FormVideogame)