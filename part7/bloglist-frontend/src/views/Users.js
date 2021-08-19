import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import usersService from '../services/users'

const Users = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    usersService.getAll().then(res => {
      dispatch(initializeUsers(res))
    })
  }, [dispatch])

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => <li key={user.id}>{user.name} (blogs: {user.blogs.length})</li>)}
      </ul>
    </div>
  )
}

export default Users