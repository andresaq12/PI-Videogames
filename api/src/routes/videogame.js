const { Router } = require('express')
const { Videogame } = require('../db')
const router = Router()

// ---- GET /videogame/{idVideogame} ----
router.get('/:idVideogame', (req, res, next) => {
  try {
    const { idVideogame } = req.params
    // if (!idVideogame) res.send('soy get /videogame')
    // res.send(`soy get /videogames/${idVideogame}`)
    return Videogame.findByPk(idVideogame)
      .then(data => {
        res.send(data)
      })
  } catch (error) {
    next(error)
  }
})

// ---- POST / videogame ----
router.post('/', async (req, res, next) => {
  try {
    const { name, description, release_date, rating, platforms } = req.body
    const newVideogame = await Videogame.create({
      name,
      description,
      release_date,
      rating,
      platforms
    })
    res.send(newVideogame)
  } catch (error) {
    next(error)
  }
})


module.exports = router