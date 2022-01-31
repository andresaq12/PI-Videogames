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
          if (dataAPI.data.length === 0 && dataDB.length === 0) res.send('Ninguna coincidencia')
          const selectDataAPI = dataAPI.data.results.map(({ id, name, background_image, rating, genres }) => ({
            id,
            name,
            image: background_image,
            rating,
            genres: genres.map(({ name }) => ({ name }))
          })
          )
          const joinData = [...dataDB, ...selectDataAPI]
          res.send(joinData)
        })
    } else {
      //Si pedimos todos los juegos
      // let data = []
      // let promiseDB = await Videogame.findAll({
      //   attributes: ['id', 'name', 'image', 'rating'],  //atributos que pido de Videogame
      //   include: {
      //     model: Genre, //incluimos datos de Genre
      //     attributes: ['name'], //atributo que pido de Genre
      //     through: {
      //       attributes: []  //indicamos que no queremos ningún dato de videogames_genres, que es la tabla unión
      //     }
      //   },
      //   // limit: 15
      // })
      // data = [...data, ...promiseDB]
      // for (let i = 1; i < 6; i++) {
      //   let promiseAPI = await axios.get(`https://api.rawg.io/api/games?page=${i}&key=${API_KEY}`) //Devuelve 100 entradas de la API
      //   const selectDataAPI = promiseAPI.data.results.map(({ id, name, background_image, rating, genres }) => ({ id, name, image: background_image, rating, genres: genres.map(({ id, name }) => ({ id, name })) }))
      //   data = [...data, ...selectDataAPI]
      //   console.log('Data:', data.length)
      // }
      // console.log(data.length)
      // res.send(data)
      //
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
        // limit: 15
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
          res.send(dataFiltered)
        })

      // let promiseAPI = axios.get(`https://api.rawg.io/api/games?page=1&key=${API_KEY}`) //Devuelve 100 entradas de la API
      // let promiseDB = Videogame.findAll({
      //   attributes: ['id', 'name', 'image', 'rating'],  //atributos que pido de Videogame
      //   include: {
      //     model: Genre, //incluimos datos de Genre
      //     attributes: ['name'], //atributo que pido de Genre
      //     through: {
      //       attributes: []  //indicamos que no queremos ningún dato de videogames_genres, que es la tabla unión
      //     }
      //   },
      //   // limit: 15
      // })
      // Promise.all([promiseAPI, promiseDB])
      //   .then(response => {
      //     const [dataAPI, dataDB] = response
      //     const selectDataAPI = dataAPI.data.results.map(({ id, name, background_image, rating, genres }) => ({ id, name, image: background_image, rating, genres: genres.map(({ id, name }) => ({ id, name })) }))
      //     const joinData = [...dataDB, ...selectDataAPI]
      //     console.log('DATA_API: ', selectDataAPI.length)
      //     console.log('FINAL: ', joinData.length)
      //     res.send(joinData)
      //   })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router