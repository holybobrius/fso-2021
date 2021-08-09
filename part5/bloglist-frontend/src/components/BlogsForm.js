import Blog from "./Blog"

const BlogsForm = ({ blogs, handleClick }) => (
  <div>
    <h2>blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
    <button onClick={handleClick}>logout</button>
  </div>
)

export default BlogsForm