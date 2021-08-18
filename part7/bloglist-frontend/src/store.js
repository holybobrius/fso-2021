import { combineReducers, createStore } from 'redux'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

const reducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  blogs: blogReducer
})

const store = createStore(reducer)

console.log(store)

export default store