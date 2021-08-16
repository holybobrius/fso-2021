import React from 'react'
import { create } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

const AnecdoteForm = props => {

  const getId = () => (100000 * Math.random()).toFixed(0)

  const createAnecdote = (event) => {
    event.preventDefault()
    const anecdote = {
      content: event.target.anecdote.value,
      votes: 0,
      id: getId()
    }
    props.create(anecdote)
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

const mapDispatchToProps = {
  create
}
const mapStateToProps = (state) => {
  return {}
}

const AnecdoteFormConnected = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
export default AnecdoteFormConnected