const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

const videogame = {
  name: 'Super Mario Bros',
  description: 'Mario y Luigui',
  released: '01-01-2010',
  image: 'https://i.blogs.es/638318/super_mario_bros_logo/450_1000.jpeg',
  rating: 4.30,
  platforms: ['Nintendo Switch', 'PC'],
  // genres: ['3', '83']
}

describe('Videogame model', () => {

  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err)
    }))

  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }))

    it('should create a new game', (done) => {
      Videogame.create({ ...videogame })
        .then((res) => {
          expect(res.dataValues).to.be.instanceOf(Object)
          done()
        }).catch(err => {
          done(err)
        })
    })

    it('should have all keys and ID after create', (done) => {
      Videogame.create({ ...videogame })
        .then((res) => {
          expect(res.dataValues).to.have.all.keys('id', 'description', 'name', 'image', 'rating', 'released', 'platforms')
          expect(res.dataValues.id).to.contains('-')
          expect(res.dataValues.name).to.be.equal(videogame.name)
          expect(res.dataValues.description).to.be.equal(videogame.description)
          expect(res.dataValues.image).to.be.equal(videogame.image)
          expect(res.dataValues.rating).to.be.equal(videogame.rating.toFixed(2).toString())
          expect(res.dataValues.released).to.be.equal(videogame.released)
          expect(res.dataValues.platforms).to.be.eql(videogame.platforms)
          done()
        }).catch(err => {
          done(err)
        })
    })

    it('should create a game with only passing name, description and platforms', (done) => {
      Videogame.create({ name: videogame.name, description: videogame.description, platforms: videogame.platforms })
        .then((res) => {
          expect(res.dataValues.id).to.contains('-')
          expect(res.dataValues.name).to.be.equal(videogame.name)
          expect(res.dataValues.description).to.be.equal(videogame.description)
          expect(res.dataValues.platforms).to.be.eql(videogame.platforms)
          expect(res.dataValues.image).to.be.null
          expect(res.dataValues.rating).to.be.null
          expect(res.dataValues.released).to.be.null
          done()
        }).catch(err => {
          done(err)
        })
    })
  })
})