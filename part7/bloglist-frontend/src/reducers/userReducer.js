const userReducer = (state = null, action) => {
  switch(action.type) {
  case 'LOGIN':
    return state = action.data
  case 'LOGOUT':
    return state = null
  default:
    return state
  }
}

export const login = credentials => {
  return {
    type: 'LOGIN',
    data: credentials
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}

export default userReducer