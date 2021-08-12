import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer,{initBlogs} from './reducers/blogReducer'
import notiReducer from './reducers/notiReducer'
import authReducer from './reducers/authReducer'
import userReducer from './reducers/userReducer'
import blogService from './services/blogs'


const reducer = combineReducers({
  blogs: blogReducer, 
  notification: notiReducer, 
  user: authReducer, 
  users: userReducer 
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)


export default store