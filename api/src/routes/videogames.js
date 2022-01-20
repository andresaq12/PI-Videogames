const axios = require('axios')
const { Router } = require('express')
const { Op } = require("sequelize")
const { Videogame, Genre } = require('../db')
const { API_KEY } = process.env
const router = Router()

// ---- GET /videogames?name="..." ---- CHECK
// ---- GET /videogames ---- CHECK
router.get('/', async (req, res, next) => {
  try {
    const { name } = req.query
    //Si pedimos un juego por query
    if (name) {
      const data = await Videogame.findAndCountAll({
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
      //Si pedimos todos los juegos
      let promiseAPI = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
      let promiseDB = Videogame.findAll({
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
      Promise.all([promiseAPI, promiseDB])
        .then(response => {
          const [dataAPI, dataDB] = response

          const final = dataAPI.data.results.slice(0, 1).map(({ name, background_image, genres }) => ({ name, image: background_image, genres }))
          // const final = [...dataAPI.data.results.slice(0, 1), ...dataDB]
          res.send(final)
        }).catch(error => console.log(error))
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router