const notificationReducer = (state = 'notification', action) => {
  switch(action.type) {
    case 'SEND_CONFIRMATION':
      return state = `you voted for this anecdote!`
    case 'SEND_ERROR': 
      return state = `Error!`
    default: return state
  }
}

export const sendConfirmation = () => {
  return {
    type: 'SEND_CONFIRMATION'
  }
}

export const sendError = () => {
  return {
    type: 'SEND_ERROR'
  }
}

export default notificationReducer
