const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('express-async-errors')


blogRouter.get('/', async (request, response) => {
    const blog = await Blog.find({}).populate('user', {username:1})
    if (blog){
      response.json(blog.map(blog => blog.toJSON()))
    }
    else {
      response.status(404).end()
    }
  })
  
blogRouter.post('/', async (request, response) => {
    const body = request.body
    //const token = getTokenFrom(request)
    //const decodedToken = jwt.verify(request.token,process.env.SECRET)
    if (!request.token || !request.decodedToken){
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    //const user = await User.findById(request.decodedToken.id)
    const user = request.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    if (!blog.likes) {
      blog.likes = 0
    }
    if (!blog.title || !blog.url){
      response.status(400).json("400 Bad Request").end()
    }
    const blogsave = await blog.save()
    
    if (blogsave){
      user.blogs = user.blogs.concat(blogsave._id)
      await user.save()
      response.status(201).json(blogsave)
    }
    else {
      response.status(404).end()
    }
  })



  blogRouter.delete('/:id',async (request,response)=>{
    if (!request.token || !request.decodedToken){
      return response.status(401).json({ error: 'token missing or invalid for deletion' })
    }

    //check if request.token === token returned by username of post.
    //const user = await User.findById(request.decodedToken.id) //current logged in
    const blog = await Blog.findById(request.params.id)
    console.log(blog.user.toString())
    console.log(request.user._id)
    //console.log(user._id.toString())

    if (blog.user.toString() === request.user._id.toString()) {
      const deleted = await Blog.findByIdAndDelete(request.params.id)
          if (deleted) {
            return response.status(204).end()
          }
          else {
            return response.status(404).end()
          }
          }

    else {
      return response.status(401).json({ error: 'userid not the same.' })
    }
  })

  blogRouter.put('/:id',async(request,response)=>{
    const body = request.body 
    const blogpost = {
      title: body.title ,
      author: body.author,
      likes: body.likes,
      url: body.url
    }

    const resp = await Blog.findByIdAndUpdate(request.params.id, blogpost)
    if (resp) {
      return response.json(resp)
    }
    else {
      return response.status(404).end()
    }
    
  })



  module.exports = blogRouter