import '../styles/blogs.css'

import React, { useState } from 'react'
const Blog = ({ blog, handleUpdate, handleDelete }) => {
  const [expanded, setExpanded] = useState(false)
  return(
    <div className='blog'>
      {expanded
        ? <div>
          <p>{`${blog.title} by ${blog.author}`}</p>
          <p style={{ color: 'blue' }}>{blog.url}</p>
          <div>
            {`likes ${blog.likes}`}
            <button onClick={() => {
              const blogToUpdate = {
                ...blog, likes: blog.likes+1
              }
              handleUpdate(blogToUpdate)
            }}>like</button>
          </div>
          <p>{`added by ${blog.user.name}`}</p>
          <button className='delete' onClick={() => {
            if(window.confirm(`remove ${blog.title} by ${blog.author}?`)) handleDelete(blog)
          }}>delete</button>
          <button onClick={() => setExpanded(!expanded)}>hide</button>
        </div>
        : <div>
          {blog.title} {blog.author}
          <button onClick={() => setExpanded(!expanded)}>expand</button>
        </div>
      }
    </div>
  )
}

export default Blog