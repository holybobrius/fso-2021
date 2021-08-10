import Blog from "./Blog"
import CreateForm from "./CreateForm"
import Togglable from "./Togglable"

const BlogsForm = ({ blogs, handleClick, handleCreate, handleUpdate }) => {
  return (
    <div>
      <Togglable buttonLabel='create new blog'><CreateForm handleCreate={handleCreate}/></Togglable>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}  handleUpdate={handleUpdate}/>
      )}
      <button onClick={handleClick}>logout</button>
    </div>
  )
}

export default BlogsForm