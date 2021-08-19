import React from 'react'
import { useHistory, useParams } from 'react-router'

const Blog = ({ blogs, handleLike, handleDelete }) => {
  const id = useParams().id
  const blog = blogs.find(n => n.id === id)
  const history = useHistory()
  return(
    <div>
      {!blog ? null :
        <div>
          <h2>
            {blog.title}
          </h2>
          <a href={blog.url}>link</a>
          <p>{blog.likes} likes</p>
          <button onClick={() => {
            const blogToUpdate = {
              ...blog, likes: blog.likes+1
            }
            handleLike(blogToUpdate)
          }}>like</button>
          <p>added by {blog.user.name}</p>
          <button className='delete' onClick={() => {
            if(window.confirm(`remove ${blog.title} by ${blog.author}?`)) handleDelete(blog)
            history.push('/')
          }}>delete</button>
        </div>
      }
    </div>
  )
}

export default Blog