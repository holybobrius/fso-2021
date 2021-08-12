import React from 'react'
import { create } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({ dispatch }) => {

  const createAnecdote = (event) => {
    event.preventDefault()
    dispatch(create(event.target.anecdote.value))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm