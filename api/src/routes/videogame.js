const { Router } = require('express')
const { Videogame, Genre } = require('../db')
const router = Router()

// ---- GET /videogame/{idVideogame} ---- CHECK
router.get('/:idVideogame', (req, res, next) => {
  try {
    const { idVideogame } = req.params
    idVideogame.includes('-') ? console.log('Tiene -') : console.log('No tiene -')
    return Videogame.findByPk(idVideogame, {
      attributes: ['name', 'description', 'release_date', 'image', 'rating', 'platforms']
    })
      .then(data => {
        res.send(data)
      })
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