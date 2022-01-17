const { Router } = require('express')
const { Op } = require("sequelize")
const { Videogame } = require('../db')
const router = Router()

// ---- GET /videogames ---- CHECK
// ---- GET /videogames?name="..." ---- CHECK
router.get('/', async (req, res, next) => {
  try {
    // const data = await Videogame.findAll()
    // res.send(data)
    const { name } = req.query
    if (name) {
      const data = await Videogame.findAll({
        where: {
          name: {
            [Op.substring]: name
          }
        }
      })
      res.send(data)
    } else {
      const data = await Videogame.findAll()
      res.send(data)
    }
  } catch (error) {
    next(error)
  }
})


module.exports = router