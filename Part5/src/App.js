import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [message,setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)

  useEffect(() => {
    const loggedonUser = window.localStorage.getItem('loggedonUser')
    if (loggedonUser) {
      const user = JSON.parse(loggedonUser)
      setUser(user)
      getAllBlogs()
    }
    else setUser(null)
  },[])

  const getAllBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const userLogin = () => (
    <div>
      <p>{user.username} is logged on.</p>
      <button onClick={handleLogout}> Log Out</button>
      </div> 
  )

  const handleNewBlog = async (blogObject) => {
    
    try {
      blogService.setToken(user.token)
      await blogService.addBlog(blogObject)
      getAllBlogs()
        setMessage("New blog added!")
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        getAllBlogs()
    } catch(exception) {
      setErrorMessage('Cannot add new blog.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({"username":username,"password":password})
      window.localStorage.setItem('loggedonUser',JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      getAllBlogs()
      setUsername('')
      setPassword('')

      if (user) {
        setMessage(`${user.username} logged in!`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedonUser')
      setUser(null)
      setBlogs([])
      setMessage("Logged out!")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    catch(exception) {
      setErrorMessage('Logged out already!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const deleteBlog = async (BlogToDelete) => {
    try {
      if (window.confirm("Do you really want to delete this blog post?")) {
        blogService.setToken(user.token)
        const res = blogService.deleteBlog(BlogToDelete)
        setMessage(`Blog ${BlogToDelete.title} was successfully deleted!`)
        setBlogs(blogs.filter(blog => blog.id !== BlogToDelete.id))
        setErrorMessage(null)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    } catch(exception) {
      setErrorMessage("Unable to delete this blog.")
      setMessage(null)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (BlogToUpdate) => {
    try {
      const updatedBlog = blogService.updateBlog(BlogToUpdate)
      setBlogs(blogs.map(blog=>blog.id !== BlogToUpdate.id ? blog : BlogToUpdate))
      setTimeout(() => {
        setMessage(null)
      }, 5000)
  } catch (exception) {
    setErrorMessage("Cannot update blog.")
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
}


  return (
    <div>
      <h2>{message}</h2>
      <h2>{errorMessage}</h2>
      {user === null ? 
        <LoginForm handleLogin={handleLogin} 
        username={username}
        setUsername={setUsername}
        setPassword={setPassword}
        password={password}/> 
        : 
        <div>
          {userLogin()}
          <Togglable buttonLabel="Create new blog" secondLabel="Cancel">
          <CreateBlog newBlog={handleNewBlog} />
          </Togglable>
          
        </div>

        }   

        <div>
              <h2>Blogs</h2>
              {blogs.sort(function(a,b){return a.likes - b.likes}).map(blog =>
                  <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} updateBlog={updateBlog}/>
              )}

              
        </div>

  
    </div>
  )
}

export default App