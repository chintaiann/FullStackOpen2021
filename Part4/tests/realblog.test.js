const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('../utils/list_helper')
const jwt = require('jsonwebtoken')

const initialBlog = [
  {
    title: "welcome to full stack open",
    url: "www.anything.com",
    author: "Anywho",
    likes: "5"
  },
  {
    title: "I really dont understand",
    url: "www.anywhere.com",
    author: "Anywhere",
    likes: "9"
  },
]
const blogtoAdd = {title: "added",
url: "www.anything.com",
author: "Example",
likes: "8"}



describe('when adding a new post',()=> {
  beforeEach(async () => {
    jest.setTimeout(30000);
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlog[0])
    await blogObject.save()
    blogObject = new Blog(initialBlog[1])
    await blogObject.save()
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('9914842', 10)
    const user = new User({ username: 'delete', name:"taiann",passwordHash })

    await user.save()
    //login with user and obtain token. 
    const userForToken = {
      username: user.username,
      id: user.id,
    }
    token = jwt.sign(userForToken, process.env.SECRET)

  })

  test('adding normal post with token' , async()=>{
      await api.post('/api/blogs', blogtoAdd)
      .set('Authorization',`Bearer ${token}`)
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(initialBlog.length + 1)
  
  })


  test('adding post with no token', async()=>{
    const result = await api
    .post('/api/blogs')
    .send(blogtoAdd)
    .expect(401)

    expect(result.body.error).toContain('token missing or invalid')
  })

})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('no username given' , async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` is required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('password is less than 3 chars', async ()=> {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'different',
      name: 'Superuser',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password length must be above 3')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })


})





afterAll(() => {
  mongoose.connection.close()
})