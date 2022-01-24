import { createStore, applyMiddleware, compose } from 'redux'
import appReducer from './reducer'
import thunkMiddleware from 'redux-thunk'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(appReducer, composeEnhancer(applyMiddleware(thunkMiddleware)))

export default store