import React from 'react'
import { useState } from 'react'

const CreateForm = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    const newObject = { title, author, url }
    handleCreate(newObject)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>create</h2>
      <label>title</label>
      <input id='title' onChange={({ target }) => setTitle(target.value)} />
      <br></br>
      <label>author</label>
      <input id='author' onChange={({ target }) => setAuthor(target.value)} />
      <br></br>
      <label>url</label>
      <input id='url' onChange={({ target }) => setUrl(target.value)} />
      <br></br>
      <input id='submitBlog' type='submit'></input>
    </form>
  )
}

export default CreateForm