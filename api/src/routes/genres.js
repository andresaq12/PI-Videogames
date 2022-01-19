const { Router } = require('express')
const { Genre } = require('../db')
const axios = require('axios')
const { API_KEY } = process.env
const router = Router()

// ---- GET /genres ---- CHECK
router.get('/', async (req, res, next) => {
  try {
    const { select } = req.body
    if (select) {
      const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      const { results } = response.data
      const data = results.map(item => ({ id: item.id, name: item.name }))
      await Genre.bulkCreate(data)
      res.send('Generos recibidos correctamente de la API')
    } else {
      const data = await Genre.findAll()
      res.send(data)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { name, id } = req.body
    const newGenre = await Genre.create({
      id,
      name
    })
    res.send(newGenre)
  } catch (error) {
    next(error)
  }
})

module.exports = router