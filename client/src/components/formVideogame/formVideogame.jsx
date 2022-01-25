import { useState } from "react"

const FormVideogame = () => {
  const [videogame, setVideogame] = useState({})
  console.log(videogame)
  const handleSubmit = (e) => {


  }

  const handleInputChange = (e) => {
    e.preventDefault()
    console.log('Name: ' + e.target.name + ', Value: ' + e.target.value)
    setVideogame({
      ...videogame,
      [e.target.name]: e.target.value
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor=''>Name:</label>
      <input onChange={handleInputChange} name="name" type='text' />
      <label htmlFor=''>Description:</label>
      <input onChange={handleInputChange} name="description" type='text' />
      <label htmlFor=''>Image:</label>
      <input onChange={handleInputChange} name="image" type='text' />
      <label htmlFor=''>Released Date:</label>
      <input onChange={handleInputChange} name="released_date" type='text' />
      <label htmlFor=''>Rating:</label>
      <input onChange={handleInputChange} name="rating" type='text' />
      <input type='submit' />
    </form>
  )
}

export default FormVideogame