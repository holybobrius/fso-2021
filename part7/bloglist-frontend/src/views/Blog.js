import React from 'react'
import { useHistory, useParams } from 'react-router'
import { Container } from '@material-ui/core'

const Blog = ({ blogs, handleLike, handleDelete, handleComment }) => {
  const id = useParams().id
  const blog = blogs.find(n => n.id === id)
  const history = useHistory()
  const sendComment = event => {
    event.preventDefault()
    handleComment(blog.id, event.target.comment.value)
  }
  return(
    <Container>
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
          <h3>comments</h3>
          <form onSubmit={sendComment}>
            <input name='comment' />
            <input type='submit' />
          </form>
          <ul>
            {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
          </ul>
          <button className='delete' onClick={() => {
            if(window.confirm(`remove ${blog.title} by ${blog.author}?`)) handleDelete(blog)
            history.push('/')
          }}>delete</button>
        </div>
      }
    </Container>
  )
}

export default Blog