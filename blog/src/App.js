import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import AllUsers from './components/AllUsers'
import OneUser from './components/OneUser'
import OneBlog from './components/OneBlog'
import NavBar from './components/NavBar'


import {useDispatch,useSelector} from 'react-redux'
import {setMessage } from './reducers/notiReducer'
import { initBlogs,createBlog,deleteOneBlog,updateOneBlog} from './reducers/blogReducer'
import {Login, Logout , initUser} from './reducers/authReducer'
import { init_allUsers } from './reducers/userReducer'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

import Container from '@material-ui/core/Container'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  AppBar,
  Toolbar,
  Button 
} from '@material-ui/core'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state=>state.blogs)
  const user = useSelector(state=>state.user)

  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
 


  useEffect(() => {
    
    dispatch(init_allUsers())
    dispatch(initUser())
    dispatch(initBlogs())
  },[dispatch])


  const userLogin = () => (
    <div>
      <p>{user.username} is logged on.</p>
      <button onClick={handleLogout}> Log Out</button>
      </div> 
  )

  const handleNewBlog = async () => {
    try {
      blogService.setToken(user.token)
      dispatch(setMessage("New blog added!",5000))
    } catch(exception) {
      dispatch(setMessage('Cannot add new blog.',5000))
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      dispatch(Login(username,password))
      dispatch(setMessage('logged in!',5000))
      setUsername('')
      setPassword('')

    } catch (exception) {
      dispatch(setMessage('Wrong credentials',5000))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      dispatch(Logout())
      dispatch(setMessage("Logged out!",5000))
    }
    catch(exception) {
      dispatch(setMessage('Logged out already!',5000))
    }
  }


  const deleteBlog = async (BlogToDelete) => {
    try {
      if (window.confirm("Do you really want to delete this blog post?")) {
        blogService.setToken(user.token)
        dispatch(deleteOneBlog(BlogToDelete))
        dispatch(setMessage(`Blog ${BlogToDelete.title} was successfully deleted!`,5000))
      }
    } catch(exception) {
      dispatch(setMessage("Unable to delete this blog.",5000))
    }
  }

  const updateBlog = async (BlogToUpdate) => {
    try {
      dispatch(updateOneBlog(BlogToUpdate))
      dispatch(setMessage('Updated',5000))
  } catch (exception) {
    dispatch(setMessage("Cannot update blog.",5000))
  }
}

  const padding = {
    padding: 5
  }
  
  return (
    <Container>


  
    <Router >
      <div>
      <Notification/>
    </div>
           <AppBar position="static">
             <Toolbar>
             <Button color="inherit" component={Link} to="/">
                  Blogs
                </Button>
                <Button color="inherit" component={Link} to="/users">
                  Users
                </Button>  
             </Toolbar>
           </AppBar>
                
            
      <Switch>
        <Route path="/blogs/:id"> <OneBlog deleteBlog={deleteBlog} updateBlog={updateBlog}/></Route>
        <Route path="/users/:id"> <OneUser/> </Route>
        <Route path="/users"> <AllUsers/> </Route>
        <Route path="/"> 
        <div>
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
                
            
              <h2>Blogs</h2>
              {blogs.filter(blog => blog != null).sort(function(a,b){return b.likes - a.likes}).map(blog => 
                  <Blog key={blog.id} blog={blog}/>
              )}
              </div>
              }  
        </div>
        </Route>
      </Switch>
    </Router>
    </Container>



  )
}

export default App