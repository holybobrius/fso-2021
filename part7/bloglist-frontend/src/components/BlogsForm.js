import React from 'react'
import Blog from './Blog'
import CreateForm from './CreateForm'
import Togglable from './Togglable'
import styled from 'styled-components'

const Header = styled.h1`
  font-size: 3rem;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`

const BlogsForm = ({ blogs, handleCreate, handleUpdate, handleDelete }) => {
  return (
    <Container>
      <Header>blogs</Header>
      <Container>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleUpdate={handleUpdate} handleDelete={handleDelete}/>
        )}
      </Container>
      <Togglable buttonLabel='create new blog'><CreateForm handleCreate={handleCreate}/></Togglable>
    </Container>
  )
}

export default BlogsForm