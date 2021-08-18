import React from 'react'
const LoginForm = props => {
  return(
    <form id='login' onSubmit={props.handleLogin}>
      <h2>login</h2>
      <input id='username' placeholder='username' onChange={props.handleUsername}></input>
      <br />
      <input id='password' placeholder='password' onChange={props.handlePassword}></input>
      <br />
      <input id='submitLogin' type='submit' />
    </form>
  )
}

export default LoginForm