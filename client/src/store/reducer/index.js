const initialState = {
  videogames: [],
  filteredVideogames: [],
  genres: [],
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
    case 'FETCH_GENRES':
      return {
        ...state,
        genres: action.payload
      }
    case 'SELECT_GENRE':
      if (action.payload === 0) {
        return {
          ...state,
          filteredVideogames: state.videogames
        }
      }
      let genreVideogames = state.videogames.filter(item => item.genres.map(data => data.id).includes(action.payload))
      return {
        ...state,
        filteredVideogames: genreVideogames
      }
    case 'SORT':
      if (action.payload === 'selecciona') return {
        ...state
      }
      let orderedVideogames = [...state.filteredVideogames]
      orderedVideogames = orderedVideogames.sort((a, b) => {
        if (a.name > b.name) {
          return action.payload === 'ascendente' ? 1 : -1
        }
        if (a.name < b.name) {
          return action.payload === 'ascendente' ? -1 : 1
        }
        return 0
      })
      return {
        ...state,
        filteredVideogames: orderedVideogames
      }
    case 'RATING':
      if (action.payload === 'selecciona') return {
        ...state
      }
      let ratingVideogames = [...state.filteredVideogames]
      ratingVideogames = ratingVideogames.sort((a, b) => {
        if (a.rating > b.rating) {
          return action.payload === 'ratingUp' ? 1 : -1
        }
        if (a.rating < b.rating) {
          return action.payload === 'ratingUp' ? -1 : 1
        }
        return 0
      })
      return {
        ...state,
        filteredVideogames: ratingVideogames
      }
    case 'SELECT_TYPE':
      if (action.payload === 'all') return {
        ...state,
        filteredVideogames: state.videogames
      }
      let typeVideogames = []
      if (action.payload === 'api') {
        typeVideogames = state.videogames.filter(item => typeof (item.id) === 'number')
        return {
          ...state,
          filteredVideogames: typeVideogames
        }
      } else {
        typeVideogames = state.videogames.filter(item => typeof (item.id) === 'string')
        return {
          ...state,
          filteredVideogames: typeVideogames
        }
      }
    default:
      return {
        ...state
      }
  }
}

export default appReducer