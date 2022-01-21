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
      let promiseAPI = axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`) //Devuelve 20 entradas de la API
      let promiseDB = Videogame.findAll({
        where: {
          name: {
            [Op.substring]: name  //buscamos que tenga el name en cualquier parte de su nombre
          }
        },
        limit: 15
      })
      Promise.all([promiseAPI, promiseDB])
        .then(response => {
          const [dataAPI, dataDB] = response
          console.log('DATA API:', dataAPI)
          console.log('DATA DB: ', dataDB)
          if (dataAPI.data.length === 0 && dataDB.length === 0) res.send('Ninguna coincidencia')
          const selectDataAPI = dataAPI.data.results.map(({ id, name, background_image, genres }) => ({ id, name, image: background_image, genres: genres.map(({ name }) => ({ name })) }))
          const joinData = [...dataDB, ...selectDataAPI]
          res.send(joinData)
        }).catch(error => console.log(error))
    } else {
      //Si pedimos todos los juegos
      let promiseAPI = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`) //Devuelve 20 entradas de la API
      let promiseDB = Videogame.findAll({
        attributes: ['id', 'name', 'image'],  //atributos que pido de Videogame
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
          const selectDataAPI = dataAPI.data.results.map(({ id, name, background_image, genres }) => ({ id, name, image: background_image, genres: genres.map(({ name }) => ({ name })) }))
          const joinData = [...dataDB, ...selectDataAPI]
          // console.log('Size dataAPI: ', dataAPI.data.results.length)
          // console.log('Size joinData: ', joinData.length)
          res.send(joinData)
        }).catch(error => console.log(error))
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router