import NavBar from '../navBar/navBar'
import { useState } from "react"
import { connect } from 'react-redux'
import axios from 'axios'
import '../formVideogame/formVideogame.css'

const FormVideogame = ({ genres }) => {
  const [videogame, setVideogame] = useState({ name: '', rating: '', image: '', released: '', description: '', genres: [], platforms: [] })
  const [error, setError] = useState({ name: '', rating: '', image: '', released: '', description: '', genres: [], platforms: [] })

  const platform = ['Xbox One', 'PlayStation 4', 'Xbox 360', 'PC', 'macOs', 'Linux', 'Xbox Series S/X', 'Xbox', 'PlayStation 5', 'Nintendo Switch', 'PlayStation 2', 'PlayStation 3']

  const validate = (input) => {
    let errors = {}
    if (!input.name) {
      errors.name = 'Name required'
    } else if (!/^[a-zA-Z0-9_.,: &()]+$/.test(input.name)) {
      errors.name = 'Invalid character'
    }
    if (!input.rating) {
      errors.rating = 'Rating required'
    } else if (!/[0-4](,|\.)[0-9]{2}|5(,|\.)0{2}/.test(input.rating)) {
      errors.rating = 'Invalid rating'
    }
    if (!input.image) {
      errors.image = 'Image required'
    }
    if (!input.released) {
      errors.released = 'Invalid date'
    }
    if (!input.description) {
      errors.description = 'Description must be not empty'
    }
    if (input.genres.length < 1) {
      errors.genres = 'Select one genre'
    }
    if (input.platforms.length < 1) {
      errors.platforms = 'Select one platform'
    }
    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (Object.keys(error).length === 0) {
      axios.post(`http://localhost:3001/videogame`, videogame)
        .then(() => alert('Videojuego agregado correctamente'))
    } else {
      alert('Faltan algunos campos. Revise nuevamente')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setVideogame({
      ...videogame,
      [name]: value
    })
    let data = validate({ ...videogame, [name]: value })
    setError({ ...data })
  }

  const handleSelectChange = (e) => {
    const { name, value } = e.target
    if (!videogame[name].includes(value)) {
      setVideogame({
        ...videogame,
        [name]: [...videogame[name], value]
      })
    } else {
      setVideogame({
        ...videogame,
        [name]: [...videogame[name].filter(data => data !== value)]
      })
    }
    let data = validate({ ...videogame, [name]: value })
    setError({ ...data })
  }

  return (
    <>
      <NavBar />
      <div className='gameForm'>
        <p>Add Videogame</p>
        <form onSubmit={handleSubmit} autoComplete='off' >
          <div className='nameForm'>
            <input onChange={handleInputChange} name="name" type='text' placeholder='Name' />
          </div>
          <div className='errorForm'>
            {
              error.name ? <p>Invalid character</p> : <p></p>
            }
          </div>
          <div className='imageForm'>
            <input onChange={handleInputChange} name="image" placeholder='Image' type='text' />
          </div>
          <div className='errorForm'>
            {
              error.image ? <p>Invalid link</p> : <p></p>
            }
          </div>
          <div className='releasedForm'>
            <input onChange={handleInputChange} type='date' id='released' name="released" />
          </div>
          <div className='errorForm'>
            {
              error.released ? <p>Invalid date</p> : <p></p>
            }
          </div>
          <div className='ratingForm'>
            <input onChange={handleInputChange} name="rating" placeholder='Rating (0.00 - 5.00)' type='text' />
          </div>
          <div className='errorForm'>
            {
              error.rating ? <p>Invalid rating</p> : <p></p>
            }
          </div>
          <div className='descriptionForm'>
            <textarea id='description' onChange={handleInputChange} name="description" placeholder='  Write a description...' />
          </div>
          <div className='errorForm'>
            {
              error.description ? <p>Description must be not empty</p> : <p></p>
            }
          </div>
          <label htmlFor=''>Genres:</label>
          <select name='genres' onChange={handleSelectChange} defaultValue={'select'}>
            <option value='select' disabled hidden>Select</option>
            {genres.map(data =>
              <option key={data.id} value={data.id}>{data.name}</option>
            )}
          </select>
          <div className='dataGenres'>
            {
              videogame.genres.length > 0 ? videogame.genres.map(item => {
                let data = genres.find(element => element.id === item)
                return <p>{data.name}</p>
              }) : <></>
            }
          </div>
          <label htmlFor=''>Platforms:</label>
          <select name='platforms' onChange={handleSelectChange} defaultValue={'select2'}>
            <option value='select2' disabled hidden>Select</option>
            {platform.map(data =>
              <option key={data} value={data}>{data}</option>
            )}
          </select>
          <div className='dataPlatforms'>
            {
              videogame.platforms.length > 0 ? videogame.platforms.map(item => <p>{item}</p>) : <></>
            }
          </div>
          <div className='submitForm'>
            <input disabled={error.disableSubmit} type='submit' value='Submit' />
          </div>
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