import React from 'react'
import { useParams } from 'react-router'

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find(n => n.id === id)
  console.log(user)
  return (
    <div>
      {!user ? null :
        <div>
          <h2>{user.name}</h2>
          <strong>added {user.blogs.length} blogs:</strong>
          <ul>
            {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
          </ul>
        </div>
      }
    </div>
  )
}

export default User
