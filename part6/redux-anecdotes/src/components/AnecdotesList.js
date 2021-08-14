import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { sendConfirmation } from '../reducers/notificationReducer'
import Notification from './Notification'

const AnecdotesList = () => {
  const anecdotes = useSelector(state => state.anecdotes).sort((a, b) => b.votes - a.votes)
  const notification = useSelector(state => state.notifications)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteFor(id))
    dispatch(sendConfirmation())
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdotesList