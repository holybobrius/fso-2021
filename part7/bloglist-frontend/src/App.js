import React, { useState, useEffect } from 'react'
import BlogsForm from './components/BlogsForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { login, logout } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { end, showError, showNotif } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const handleUsername = event => {
    setUsername(event.target.value)
  }

  const handlePassword = event => {
    setPassword(event.target.value)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsAppUser')
    dispatch(logout())
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedBlogsAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(login(user))
    } catch (exception) {
      dispatch(showError('Login failed!'))
      setTimeout(() => {
        dispatch(end())
      }, 5000)
    }
  }

  const handleSubmit = newBlog => {
    newBlog.user = user
    console.log(newBlog, newBlog.user.token)
    blogService.create(newBlog).then(addedBlog => setBlogs(blogs.concat(addedBlog)))
    dispatch(showNotif(`a new blog ${newBlog.title} by ${newBlog.author} added`))
    setTimeout(() => {
      dispatch(end())
    }, 5000)
  }

  const handleUpdate = updatedBlog => {
    console.log(updatedBlog.user)
    blogService.update(updatedBlog.id, updatedBlog)
      .then(updatedObj => setBlogs(blogs.map(blog => blog.id === updatedObj.id ? updatedObj : blog)))
  }

  const handleDelete = async blog => {
    // eslint-disable-next-line no-unused-vars
    const response = await blogService.deleteBlog(blog)
    setBlogs(blogs.filter(el => el.id !== blog.id))
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(login(user))
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Notification message={notification.content} styles={notification.style}/>
      {user !== null
        ? <BlogsForm blogs={blogs} handleClick={handleLogout} handleCreate={handleSubmit} handleUpdate={handleUpdate} handleDelete={handleDelete}/>
        : <Togglable buttonLabel='show login'><LoginForm
          handleUsername={handleUsername}
          handlePassword={handlePassword}
          handleLogin={handleLogin}
        /></Togglable>
      }
    </div>
  )
}

export default App