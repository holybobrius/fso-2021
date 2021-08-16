import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { sendConfirmation } from '../reducers/notificationReducer'
import Notification from './Notification'

const AnecdotesList = () => {
  const anecdotes = useSelector(state => state.anecdotes).sort((a, b) => b.votes - a.votes)
  const filter = useSelector(state => state.filter)

  const dispatch = useDispatch()

  const vote = anecdote => {
    dispatch(voteFor(anecdote))
    dispatch(sendConfirmation(anecdote.content, 5))
  }

  console.log(filter)
  return (
    <div>
      <Notification />
      {filter === '' 
        ? anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          )
        : anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdotesList