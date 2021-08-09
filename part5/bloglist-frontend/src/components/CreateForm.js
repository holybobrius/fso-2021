import axios from "axios"
import { useState } from "react"
import blogsService from "../services/blogs"

const CreateForm = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    const newObject = { title, author, url}
    handleCreate(newObject)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>create</h2>
      <label>title</label>
      <input onChange={({ target }) => setTitle(target.value)} />
      <br></br>
      <label>author</label>
      <input onChange={({ target }) => setAuthor(target.value)} />
      <br></br>
      <label>url</label>
      <input onChange={({ target }) => setUrl(target.value)} />
      <br></br>
      <input type='submit'></input>
    </form>
  )
}

export default CreateForm