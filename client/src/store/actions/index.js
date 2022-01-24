import axios from 'axios'

export const fetchVideogames = () => {
  return dispatch => {
    axios.get(`http://localhost:3001/videogames`)
      .then(videogames => {
        dispatch({
          type: 'FETCH_VIDEOGAMES',
          payload: videogames.data
        })
      }).catch((error) => {
        console.log(error)
      })
  }
}

export const searchVideogames = (search) => {
  return dispatch => {
    axios.get(`http://localhost:3001/videogames?name=${search}`)
      .then(videogames => {
        dispatch({
          type: 'SEARCH_VIDEOGAMES',
          payload: videogames.data
        })
      }).catch((error) => {
        console.log(error)
      })
  }
}

export const sortVideogames = (sortType) => {
  return {
    type: 'SORT',
    payload: sortType
  }
}
