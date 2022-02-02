/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai')
const session = require('supertest-session')
const app = require('../../src/app.js')
const { Videogame, Genre, conn } = require('../../src/db.js')

const agent = session(app);

const videogame = {
  name: 'Super Mario Bros',
  description: 'Mario y Luigui',
  released: '01-01-2010',
  image: 'https://i.blogs.es/638318/super_mario_bros_logo/450_1000.jpeg',
  rating: 4.30,
  platforms: ['Nintendo Switch', 'PC'],
  genres: ['3', '83']
}

const genres = [{ "id": 4, "name": "Action" },
{ "id": 51, "name": "Indie" },
{ "id": 3, "name": "Adventure" },
{ "id": 5, "name": "RPG" },
{ "id": 10, "name": "Strategy" },
{ "id": 2, "name": "Shooter" },
{ "id": 40, "name": "Casual" },
{ "id": 14, "name": "Simulation" },
{ "id": 7, "name": "Puzzle" },
{ "id": 11, "name": "Arcade" },
{ "id": 83, "name": "Platformer" },
{ "id": 1, "name": "Racing" },
{ "id": 59, "name": "Massively Multiplayer" },
{ "id": 15, "name": "Sports" },
{ "id": 6, "name": "Fighting" },
{ "id": 19, "name": "Family" },
{ "id": 28, "name": "Board Games" },
{ "id": 34, "name": "Educational" },
{ "id": 17, "name": "Card" }]

xdescribe('Videogame routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err)
    }))

  beforeEach(async () => {
    await Genre.sync({ force: true })
    Genre.bulkCreate(genres)
    await Videogame.sync({ force: true })
    const newVideogame = await Videogame.create({
      name: videogame.name,
      description: videogame.description,
      released: videogame.released,
      image: videogame.image,
      rating: videogame.rating,
      platforms: videogame.platforms
    })
    for (let i = 0; i < videogame.genres.length; i++) {
      let genre = await Genre.findByPk(videogame.genres[i])
      await genre.addVideogame(newVideogame.id)
    }
  })

  describe('GET /videogames', () => {

    it('should get 200', () =>
      agent.get('/videogames').expect(200)
    )

    it('should response with a body containing an Array of 100 elements', (done) => {
      agent.get('/videogames').then(res => {
        expect(res.body).to.be.instanceOf(Array)
        expect(res.body).to.have.lengthOf(100)
        done()
      }).catch(err => {
        done(err)
      })
    })

    it('should contain data from Super Mario Bros from local DB', (done) => {
      agent.get('/videogames').then(res => {
        expect(res.body[0]).to.be.instanceOf(Object)
        expect(res.body[0]).to.have.all.keys('id', 'name', 'image', 'rating', 'genres')
        expect(res.body[0].id).to.include('-')
        expect(res.body[0].name).to.be.equal('Super Mario Bros')
        expect(res.body[0].image).to.be.equal('https://i.blogs.es/638318/super_mario_bros_logo/450_1000.jpeg')
        expect(res.body[0].rating).to.be.equal('4.30')
        expect(res.body[0].genres).to.be.have.lengthOf.above(0)
        done()
      }).catch(err => {
        done(err)
      })
    })
  })

  describe('GET /videogames?name=Super Mario Bros', () => {

    it('should get 200', () =>
      agent.get('/videogames?name=Super Mario Bros').expect(200)
    )

    it('should response an object with an array in body', (done) => {
      agent.get('/videogames?name=Super Mario Bros').then(res => {
        expect(res).to.be.instanceOf(Object)
        expect(res.body).to.be.instanceOf(Array)
        expect(res.body).to.have.lengthOf(15)
        done()
      }).catch(err => {
        done(err)
      })
    })

    it('should contain data from Super Mario Bros from search', (done) => {
      agent.get('/videogames').then(res => {
        expect(res.body[0]).to.be.instanceOf(Object)
        expect(res.body[0]).to.have.all.keys('id', 'name', 'image', 'rating', 'genres')
        expect(res.body[0].id).to.include('-')
        expect(res.body[0].name).to.be.equal('Super Mario Bros')
        expect(res.body[0].image).to.be.equal('https://i.blogs.es/638318/super_mario_bros_logo/450_1000.jpeg')
        expect(res.body[0].rating).to.be.equal('4.30')
        expect(res.body[0].genres).to.be.have.lengthOf.above(0)
        done()
      }).catch(err => {
        done(err)
      })
    })
  })
})

