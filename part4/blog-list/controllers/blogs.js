const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  console.log(blogs)
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const element = await Blog.findById(request.params.id)
  response.json(element)
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user
  console.log('user', user)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user
  })
  const result = await blog.save()
  console.log('request user', result.user)
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user
  logger.info(blog, user)
  if(user.id.toString() !== blog.user.toString()) return response.status(401).json({ error: 'wrong user!' })
  blog.remove()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  console.log('body user', body.user)
  console.log('request user', request.user)
  body.user._id = body.user.id
  delete body.user.id
  const blog = {
    title: body.title,
    id: body.id,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  updatedBlog.user = await User.findById(body.user)
  updatedBlog.save()
  console.log(updatedBlog)
  response.json(updatedBlog)
})

module.exports = blogsRouter