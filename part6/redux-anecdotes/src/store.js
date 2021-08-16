import { createStore, combineReducers } from 'redux'
import anecdoteReducer, { create } from './reducers/anecdoteReducer'
import anecdotesService from './services/anecdotes'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notifications: notificationReducer,
  filter: filterReducer
})

const store = createStore(reducer, composeWithDevTools())

anecdotesService.getAll().then(anecdotes => anecdotes.forEach(anecdote => {
  console.log(anecdote)
  store.dispatch({ type: 'CREATE', data: anecdote })
}))

export default store