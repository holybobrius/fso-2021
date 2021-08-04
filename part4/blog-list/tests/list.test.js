const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: "610a51bdf38b9b3930895504",
      title: "Blog Example",
      author: "FSO",
      url: "https://fullstackopen.com/en/part4/",
      likes: 4,
      __v: 0
    }
  ]

  const blogsList = [
    {
      _id: "610a51bdf38b9b3930895504",
      title: "Blog Example 1",
      author: "FSO",
      url: "https://fullstackopen.com/en/part4/",
      likes: 2,
      __v: 0
    },
    {
      _id: "610a51bdf38b9b3930895504",
      title: "Blog Example 2",
      author: "FSO",
      url: "https://fullstackopen.com/en/part4/",
      likes: 5,
      __v: 0
    },
    {
      _id: "610a51bdf38b9b3930895504",
      title: "Blog Example 3",
      author: "FSO",
      url: "https://fullstackopen.com/en/part4/",
      likes: 1,
      __v: 0
    }
  ]

  test('of one blog equals the likes of that blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(4)
  })

  test('of empty list to be 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('of list with multiple blogs to be calculated right', () => {
    const result = listHelper.totalLikes(blogsList)
    expect(result).toBe(8)
  })
})