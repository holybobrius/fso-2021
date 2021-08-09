const mongoose = require('mongoose')
const supertest = require('supertest')
const blogsRouter = require('../controllers/blogs')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialNotes = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialNotes[0])
  await blogObject.save()
  blogObject = new Blog(initialNotes[1])
  await blogObject.save()
  blogObject = new Blog(initialNotes[3])
  await blogObject.save()
})

test('fetching data from database runs correctly', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(3)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('unique identifier of blogs is named id and not _id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
  expect(response.body[0]._id).not.toBeDefined()
})

test('POST request successfuly creates a new blog post', async () => {
  const newBlog = {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QtdXNlcm5hbWUiLCJpZCI6IjYxMGZmZDViMDE1YmEyNGYwNGY4ODQ2OCIsImlhdCI6MTYyODQzNzg3NX0.WEO30MU41b04HDy9UlNo2I3RQ22sibjNId7F3iYtZU4')
    .send(newBlog)
  const response = await api.get('/api/blogs')
  const blogs = response.body.map(blog => blog.title)
  expect(response.body).toHaveLength(4)
  expect(blogs).toContain('Type wars')
})

test('if likes property is undefined, blog will have the default value of 0 likes', async () => {
  const newBlog = {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    __v: 0
  }
  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QtdXNlcm5hbWUiLCJpZCI6IjYxMGZmZDViMDE1YmEyNGYwNGY4ODQ2OCIsImlhdCI6MTYyODQzNzg3NX0.WEO30MU41b04HDy9UlNo2I3RQ22sibjNId7F3iYtZU4')
    .send(newBlog)

  const response = await api.get('/api/blogs')
  expect(response.body[3].likes).toBe(0)
})

describe('attempting to add blogs with undefined title or url properties results in 400 Bad Request', () => {
  test('(no title)', async () => {
    const newBlog = {
      _id: "5a422bc61b54a676234d17fc",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      __v: 0
    }
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QtdXNlcm5hbWUiLCJpZCI6IjYxMGZmZDViMDE1YmEyNGYwNGY4ODQ2OCIsImlhdCI6MTYyODQzNzg3NX0.WEO30MU41b04HDy9UlNo2I3RQ22sibjNId7F3iYtZU4')
      .send(newBlog)
      .expect(401)
  })
  test('(no url)', async () => {
    const newBlog = {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      __v: 0
    }
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QtdXNlcm5hbWUiLCJpZCI6IjYxMGZmZDViMDE1YmEyNGYwNGY4ODQ2OCIsImlhdCI6MTYyODQzNzg3NX0.WEO30MU41b04HDy9UlNo2I3RQ22sibjNId7F3iYtZU4')
      .send(newBlog)
      .expect(401)
  })
}, 100000)

afterAll(() => {
  mongoose.connection.close()
})