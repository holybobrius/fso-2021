import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { sendConfirmation, endNotification } from '../reducers/notificationReducer'
import Notification from './Notification'

const AnecdotesList = () => {
  const anecdotes = useSelector(state => state.anecdotes).sort((a, b) => b.votes - a.votes)
  const notification = useSelector(state => state.notifications)
  const filter = useSelector(state => state.filter)

  const dispatch = useDispatch()

  const vote = anecdote => {
    dispatch(voteFor(anecdote))
    dispatch(sendConfirmation(anecdote.content))
    setTimeout(() => dispatch(endNotification()), 5000)
  }

  console.log(filter)
  return (
    <div>
      <Notification label={notification}/>
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