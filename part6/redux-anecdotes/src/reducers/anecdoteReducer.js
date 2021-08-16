import anecdotesService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const anecdoteToVote = state.find(n => n.id === action.data.id)
      const votedAnecdote = {...anecdoteToVote, votes: anecdoteToVote.votes + 1}
      return state.map(el => el.id === votedAnecdote.id ? votedAnecdote : el)
    case 'CREATE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return state = action.data
    default: return state
  }
}

export const voteFor = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.update(anecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const create = anecdote => {
  return async dispatch => {
    const addedAnecdote = await anecdotesService.addAnecdote(anecdote)
    dispatch({
      type: 'CREATE',
      data: addedAnecdote
    })}
}

export const initializeAnecdotes = anecdotes => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer