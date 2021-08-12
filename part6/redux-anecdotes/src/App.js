import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor, create } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state).sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteFor(id))
  }

  const createAnecdote = (event) => {
    event.preventDefault()
    dispatch(create(event.target.anecdote.value))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <AnecdoteForm dispatch={dispatch}/>
    </div>
  )
}

export default App