import Blog from "./Blog"
import CreateForm from "./CreateForm"

const BlogsForm = ({ blogs, handleClick, handleCreate }) => (
  <div>
    <h2>blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
    <button onClick={handleClick}>logout</button>
    <CreateForm handleCreate={handleCreate}/>
  </div>
)

export default BlogsForm