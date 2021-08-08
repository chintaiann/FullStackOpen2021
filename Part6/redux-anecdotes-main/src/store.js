import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import anecReducer, {initializeAnec} from './reducers/anecdoteReducer'
import notiReducer from './reducers/notiReducer'
import filterReducer from './reducers/filterReducer'
import noteService from './services/anecdotes'


const reducer = combineReducers({
    anecdotes: anecReducer, 
    notification: notiReducer,
    filter: filterReducer 
  })
  
  const store = createStore(reducer,composeWithDevTools(
      applyMiddleware(thunk)
  ))
  
  noteService.getAll().then(anecdotes => 
    store.dispatch(initializeAnec(anecdotes)))



export default store
