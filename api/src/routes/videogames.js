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
            [Op.iLike]: `%${name}%`  //buscamos que tenga el name en cualquier parte de su nombre, no importa mayúsculas ni minísculas
          }
        },
        order: [
          ['name', 'ASC'],
        ],
        limit: 15
      })
      Promise.all([promiseAPI, promiseDB])
        .then(response => {
          const [dataAPI, dataDB] = response
          if (dataAPI.data.length === 0 && dataDB.length === 0) res.send({ res: 'Ninguna coincidencia' })
          const selectDataAPI = dataAPI.data.results.map(({ id, name, background_image, rating, genres }) => ({
            id,
            name,
            image: background_image,
            rating,
            genres: genres.map(({ name }) => ({ name }))
          }))
          const joinData = [...dataDB, ...selectDataAPI.slice(dataDB.length, 15)]
          res.status(200).send(joinData)
        })
    } else {
      let dataPromise = []
      let dataFiltered = []
      let promiseDB = await Videogame.findAll({
        attributes: ['id', 'name', 'image', 'rating'],  //atributos que pido de Videogame
        include: {
          model: Genre, //incluimos datos de Genre
          attributes: ['name'], //atributo que pido de Genre
          through: {
            attributes: []  //indicamos que no queremos ningún dato de videogames_genres, que es la tabla unión
          }
        },
        limit: 20
      })
      dataFiltered = [...dataFiltered, ...promiseDB]
      for (let i = 1; i < 6; i++) {
        dataPromise.push(axios.get(`https://api.rawg.io/api/games?page=${i}&key=${API_KEY}`))
      }
      Promise.all(dataPromise)
        .then(response => {
          for (const item of response) {
            let newData = item.data.results.map(({ id, name, background_image, rating, genres }) => ({ id, name, image: background_image, rating, genres: genres.map(({ id, name }) => ({ id, name })) }))
            dataFiltered = [...dataFiltered, ...newData]
          }
          res.status(200).send(dataFiltered.slice(0, 100))
        })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router