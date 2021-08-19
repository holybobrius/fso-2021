import React from 'react'
import Blog from './Blog'
import CreateForm from './CreateForm'
import Togglable from './Togglable'

const BlogsForm = ({ blogs, handleCreate, handleUpdate, handleDelete }) => {
  return (
    <div>
      <Togglable buttonLabel='create new blog'><CreateForm handleCreate={handleCreate}/></Togglable>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleUpdate={handleUpdate} handleDelete={handleDelete}/>
      )}
    </div>
  )
}

export default BlogsForm