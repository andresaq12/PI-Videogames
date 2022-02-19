# Videogames App

## Descripción

Se ha creado una aplicación en la cual se puedan ver los distintos videojuegos disponibles junto con información relevante de los mismos, utilizando la api externa [rawg](https://rawg.io/apidocs) y a partir de ella poder, entre algunas cosas:

  - Buscar videjuegos
  - Filtrarlos / Ordenarlos
  - Agregar nuevos videojuegos

#### __Tecnologías utilizadas:__
- React
- Redux
- Express
- Sequelize - Postgres

#### __Frontend__

- Presenta una landing page que redirige a home a través de un botón
- Una ruta __Home__ que permite visualizar los videojuegos de 15 en 15, además de filtros que permiten seccionar nuestra búsqueda tanto por género o por si existe en la API o en la base de datos, tambien permite ordenarlos en order alfabético y por rating. 
- Una ruta __VideogameDetail__ que permite ver los datos específicos de un juego, como su nombre, imagen, géneros, fecha de lanzamiento, rating, entre otros.
- Una ruta __VideogameCreate__ que contiene un formulario con nombre, descripción, imagen, rating, fecha de lanzamiento, géneros y plataformas, para agregar un videojuego a la base de datos.

#### __Base de datos__

El modelo de la base de datos presenta las siguientes entidades:

- Videojuego:
  - ID
  - Nombre
  - Descripción
  - Fecha de lanzamiento
  - Rating
  - Plataformas
- Genero:
  - ID
  - Nombre

#### __Backend__

Tenemos las siguientes rutas:

- __GET /videogames__:
  - Obtiene un listado de los videojuegos, tanto de la API como de la base de datos.
- __GET /videogames?name="..."__:
  - Obtiene un listado de las primeros 15 videojuegos que contengan la palabra ingresada como parámetro query
- __GET /videogame/{idVideogame}__:
  - Obtiene el detalle de un videojuego en particular
- __GET /genres__:
  - Obtiene todos los tipos de géneros de videojuegos posibles
- __POST /videogame__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body y crea un videojuego en la base de datos.