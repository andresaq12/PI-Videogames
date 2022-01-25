const axios = require('axios')
const { Router } = require('express')
const { Genre } = require('../db')
const { API_KEY } = process.env
const router = Router()

// ---- GET /genres ---- CHECK
router.get('/', async (req, res, next) => {
  try {
    const data = await Genre.findAll()
    if (data.length === 0) {
      const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      const { results } = response.data
      const data = results.map(item => ({ id: item.id, name: item.name }))
      await Genre.bulkCreate(data)
      res.send(data)
    } else {
      res.send(data)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router