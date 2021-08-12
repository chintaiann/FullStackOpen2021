import React, {useState}  from 'react'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

const Blog = (props) => {
  const blog = props.blog
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (

      <div style={blogStyle}> 
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </div>
   
      // <div>
      // {blog.title} by {blog.author} has {blog.likes} likes! <br></br>
      // URL: {blog.url}
      // <button id="LikeButton" onClick={increaseLike}>Like!</button>
      // <button onClick={deleteBlog}>Delete this blog.</button>
      //   <button onClick={toggleVisibility}>Hide</button>
      // </div>

  )
}
export default Blog