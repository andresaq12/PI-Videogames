const { Router } = require('express')
const { Op } = require("sequelize")
const { Videogame, Genre } = require('../db')
const router = Router()

// ---- GET /videogames ---- CHECK
// ---- GET /videogames?name="..." ---- CHECK
router.get('/', async (req, res, next) => {
  try {
    const { name } = req.query
    if (name) {
      const data = await Videogame.findAll({
        where: {
          name: {
            [Op.substring]: name  //buscamos que tenga el name en cualquier parte de su nombre
          }
        },
        limit: 15
      })
      if (data.length === 0) res.send({ message: 'No hubo coincidencias' })
      else {
        res.send(data)
      }
    } else {
      const data = await Videogame.findAll({
        attributes: ['name', 'image'],  //atributos que pido de Videogame
        include: {
          model: Genre, //incluimos datos de Genre
          attributes: ['name'], //atributo que pido de Genre
          through: {
            attributes: []  //indicamos que no queremos ningún dato de videogames_genres, que es la tabla unión
          }
        },
        limit: 15 //limite de 15 datos
      })
      res.send(data)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router