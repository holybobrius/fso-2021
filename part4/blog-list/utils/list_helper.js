const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.length === 0 ?  0 : blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favouriteBlog = blogs => {
  if(blogs.length === 0) return 'no blogs in list!'
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  return blogs.filter(blog => blog.likes === maxLikes)[0]
}

const mostBlogs = blogs => {
  const authors = []
  _.uniq(blogs.map(blog => blog.author)).forEach(author => {
    authors.push({author: author, blogs: blogs.filter(blog => blog.author === author).length})
  })
  const maxBlogs = Math.max(...authors.map(author => author.blogs))
  return authors.filter(author => author.blogs === maxBlogs)[0]
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}