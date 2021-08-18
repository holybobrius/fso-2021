const successfulNotifStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px'
}

const errorNotifStyle = {
  color: 'red',
  background: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px'
}

const notificationReducer = (state = [], action) => {
  switch(action.type) {
  case 'SHOW_NOTIF':
    return state = {
      content: action.data,
      style: successfulNotifStyle
    }
  case 'SHOW_ERROR':
    return state = {
      content: action.data,
      style: errorNotifStyle
    }
  case 'END':
    return state = []
  default:
    return state
  }
}

export const showNotif = message => {
  return {
    type: 'SHOW_NOTIF',
    data: message
  }
}

export const showError = message => {
  return {
    type: 'SHOW_ERROR',
    data: message
  }
}

export const end = () => {
  return {
    type: 'END'
  }
}

export default notificationReducer