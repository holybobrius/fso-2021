const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'SEND_CONFIRMATION':
      return state = `you voted for ${action.data.content}`
    case 'SEND_ERROR': 
      return state = `Error!`
    case 'END_NOTIFICATION':
      return state = null
    default: return state
  }
}

export const sendConfirmation = content => {
  return {
    type: 'SEND_CONFIRMATION',
    data: { content }
  }
}

export const endNotification = () => {
  console.log('closing')
  return {
    type: 'END_NOTIFICATION'
  }
}

export const sendError = () => {
  return {
    type: 'SEND_ERROR'
  }
}

export default notificationReducer
