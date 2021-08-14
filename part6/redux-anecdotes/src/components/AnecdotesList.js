import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import anecdoteReducer, { voteFor } from '../reducers/anecdoteReducer'
import { sendConfirmation, endNotification } from '../reducers/notificationReducer'
import Notification from './Notification'

const AnecdotesList = () => {
  const anecdotes = useSelector(state => state.anecdotes).sort((a, b) => b.votes - a.votes)
  const notification = useSelector(state => state.notifications)
  const dispatch = useDispatch()

  const vote = anecdote => {
    dispatch(voteFor(anecdote.id))
    dispatch(sendConfirmation(anecdote.content))
    setTimeout(() => dispatch(endNotification()), 5000)
  }
  return (
    <div>
      <Notification label={notification}/>
      {anecdotes.map(anecdote =>
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