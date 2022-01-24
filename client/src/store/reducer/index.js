const initialState = {
  videogames: [],
  filteredVideogames: [],
  videogameDetail: {}
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_VIDEOGAMES':
      return {
        ...state,
        videogames: action.payload,
        filteredVideogames: action.payload

      }
    case 'SEARCH_VIDEOGAMES':
      return {
        ...state,
        videogames: action.payload,
        filteredVideogames: action.payload
      }
    case 'SORT':
      if (action.payload === 'Selecciona') return {
        ...state
      }
      let orderedVideogames = [...state.videogames]
      orderedVideogames = orderedVideogames.sort((a, b) => {
        if (a.name > b.name) {
          return action.payload === 'Ascendente' ? 1 : -1
        }
        if (a.name < b.name) {
          return action.payload === 'Ascendente' ? -1 : 1
        }
        return 0
      })
      return {
        ...state,
        filteredVideogames: orderedVideogames
      }
    default:
      return {
        ...state
      }
  }
}

export default appReducer