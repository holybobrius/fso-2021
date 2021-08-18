import { combineReducers, createStore } from 'redux'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  user: userReducer,
  notification: notificationReducer
})

const store = createStore(reducer)

console.log(store)

export default store