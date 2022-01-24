// import { fetch_videogames } from "../actions"

const initialState = {
  videogames: [],
  filteredVideogames: []
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_VIDEOGAMES':
      return {
        ...state,
        videogames: action.payload
      }
    default:
      return {
        ...state
      }
  }
}

export default appReducer