import React from 'react'
const LoginForm = props => {
  return(
    <form id='login' onSubmit={props.handleLogin}>
      <h2>login</h2>
      <input placeholder='username' onChange={props.handleUsername}></input>
      <br />
      <input placeholder='password' onChange={props.handlePassword}></input>
      <br />
      <input type='submit' />
    </form>
  )
}

export default LoginForm