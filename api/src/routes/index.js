const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogamesRoute = require('./videogames')
const videogameRoute = require('./videogame')
const genreRoute = require('./genres')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videogamesRoute)
router.use('/videogame', videogameRoute)
router.use('/genres', genreRoute)


module.exports = router;
