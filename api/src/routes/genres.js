const { Router } = require('express')
const { Genre } = require('../db')
const router = Router()

// ---- GET /genres ----
router.get('/', (req, res, next) => {
  try {
    return Genre.findAll()
      .then(data => {
        res.send(data)
      })
  } catch (error) {
    next(error)
  }
})

module.exports = router