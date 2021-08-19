import React, { useEffect } from 'react'
import BlogsForm from './components/BlogsForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import usersService from './services/users'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { login, logout } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { end, showError, showNotif } from './reducers/notificationReducer'
import { create, deleteBlog, initializeBlogs, updateBlog } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Users from './views/Users'
import User from './views/User'
import Blog from './views/Blog'

const App = () => {

  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsAppUser')
    dispatch(logout())
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: event.target.username.value,
        password: event.target.password.value
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
    blogService.create(newBlog).then(addedBlog => dispatch(create(addedBlog)))
    dispatch(showNotif(`a new blog ${newBlog.title} by ${newBlog.author} added`))
    setTimeout(() => {
      dispatch(end())
    }, 5000)
  }

  const handleUpdate = updatedBlog => {
    console.log(updatedBlog.user)
    blogService.update(updatedBlog.id, updatedBlog)
      .then(updatedObj => dispatch(updateBlog(updatedObj)))
  }

  const handleDelete = async blog => {
    console.log('history', history)
    // eslint-disable-next-line no-unused-vars
    const response = await blogService.deleteBlog(blog)
    dispatch(deleteBlog(blog.id))
  }

  useEffect(() => {
    usersService.getAll().then(res => {
      dispatch(initializeUsers(res))
    })
  }, [dispatch])


  useEffect(() => {
    blogService.getAll().then(res => dispatch(initializeBlogs(res)))
    usersService.getAll().then(res => dispatch(initializeUsers(res)))
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(login(user))
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <Router>
      {user === null ? null :
        <nav>
          <Link to='/'>Blogs</Link>
          <Link to='/users'>Users</Link>
          <button onClick={handleLogout}>logout</button>
        </nav>
      }
      <Switch>
        <Route path='/blogs/:id'>
          <Blog blogs={blogs} handleLike={handleUpdate} handleDelete={handleDelete}/>
        </Route>
        <Route exact path='/users/:id'>
          <User users={users}/>
        </Route>
        <Route exact path='/users'>
          <Users users={users}/>
        </Route>
        <Route exact path='/'>
          <div>
            <Notification message={notification.content} styles={notification.style}/>
            {user !== null
              ? <BlogsForm blogs={blogs} handleClick={handleLogout} handleCreate={handleSubmit} handleUpdate={handleUpdate} handleDelete={handleDelete}/>
              : <Togglable buttonLabel='show login'><LoginForm
                handleLogin={handleLogin}
              /></Togglable>
            }
          </div>
        </Route>
      </Switch>
    </Router>
  )
}

export default App