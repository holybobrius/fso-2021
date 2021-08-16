const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(n => n.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)
    case 'CREATE':
      return state.concat(action.data)
    default: return state
  }
}

export const voteFor = id => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const create = anecdote => {
  console.log('anecdote', anecdote)
  return {
    type: 'CREATE',
    data: anecdote
  }
}

export default anecdoteReducer