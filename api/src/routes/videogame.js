const { default: axios } = require('axios')
const { Router } = require('express')
const { Videogame, Genre } = require('../db')
const { API_KEY } = process.env
const router = Router()

// ---- GET /videogame/{idVideogame} ---- CHECK
router.get('/:idVideogame', async (req, res, next) => {
  try {
    const { idVideogame } = req.params
    if (idVideogame.includes('-')) {
      const data = await Videogame.findByPk(idVideogame, {
        attributes: ['name', 'description', 'release_date', 'image', 'rating', 'platforms']
      })
      res.send(data)
    } else {
      const response = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)
      let { name, background_image, genres, description_raw, released, rating, platforms } = response.data
      genres = genres.map(item => item.name)
      platforms = platforms.map(item => item.platform.name)
      const data = {
        name,
        image: background_image,
        genres,
        description: description_raw,
        released,
        rating,
        platforms
      }
      res.send(data)
    }
  } catch (error) {
    next(error)
  }
})

// ---- POST / videogame ---- CHECK
router.post('/', async (req, res, next) => {
  try {
    const { name, description, release_date, rating, platforms, genres } = req.body
    const newVideogame = await Videogame.create({
      name,
      description,
      release_date,
      rating,
      platforms
    })
    for (let i = 0; i < genres.length; i++) {
      let genre = await Genre.findByPk(genres[i])
      await genre.addVideogame(newVideogame.id)
    }
    res.send(newVideogame)
  } catch (error) {
    next(error)
  }
})

module.exports = router