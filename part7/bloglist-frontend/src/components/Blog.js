import '../styles/blogs.css'
import styled from 'styled-components'
import React from 'react'
import { Link } from 'react-router-dom'

const Item = styled.div`
  background-color: #D1D1D1;
  margin: 5px;
  border: 1px solid black;
  font-size: 1.3rem;
  color: black;
`

const Blog = ({ blog }) => {
  return(
    <Item>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </Item>
  )
}

export default Blog