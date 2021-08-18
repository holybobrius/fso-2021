import React from 'react'
const LoginForm = props => {
  return(
    <form id='login' onSubmit={props.handleLogin}>
      <h2>login</h2>
      <input id='username' placeholder='username' name='username'></input>
      <br />
      <input id='password' placeholder='password' name='password'></input>
      <br />
      <input id='submitLogin' type='submit' />
    </form>
  )
}

export default LoginForm