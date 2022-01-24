import axios from 'axios'

// export const fetch_videogames = () => {
//   return {
//     type: 'FETCH_VIDEOGAMES'
//   }
// }

export const fetchVideogames = () => {
  return dispatch => {
    axios.get(`http://localhost:3001/videogames`)
      .then(videogames => {
        dispatch({
          type: 'FETCH_VIDEOGAMES',
          payload: videogames.data
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
}