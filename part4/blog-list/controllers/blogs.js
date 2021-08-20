const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const element = await Blog.findById(request.params.id)
  response.json(element)
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    comments: body.comments,
    user: user
  })
  console.log('blog', blog)
  const result = await blog.save()
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

blogsRouter.post('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  

  const user = await User.findById(blog.user)
  const updatedObj = {
    title: blog.title,
    id: blog.id,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    comments: request.body.content,
    user: user
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedObj, { new: true })
  console.log('user', updatedBlog.user)
  updatedBlog.save()
  response.json(updatedBlog)
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
    comments: body.comments,
    user: body.user
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  updatedBlog.user = await User.findById(body.user)
  updatedBlog.save()
  console.log(updatedBlog)
  response.json(updatedBlog)
})

module.exports = blogsRouter