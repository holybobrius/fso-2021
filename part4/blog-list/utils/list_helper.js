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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}