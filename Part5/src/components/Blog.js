import React, {useState}  from 'react'
import blogService from '../services/blogs'

const Blog = (props) => {
  const blog = props.blog
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [blogObject, setBlogObject] = useState(blog)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const increaseLike = () => {
    const updatedBlog = ({
      ...blog,
      likes: ++blog.likes 
    })
    props.updateBlog(updatedBlog)
    setBlogObject(updatedBlog)
  }
  
  const deleteBlog = () => props.deleteBlog(blog)

  return (
    <div className='blog' style={blogStyle}>
      <div className='default' style={hideWhenVisible}>
      {blog.title} by {blog.author}
        <button onClick={toggleVisibility}>Show</button>
      </div>
      <div style={showWhenVisible}>
      {blog.title} by {blog.author} has {blog.likes} likes! <br></br>
      URL: {blog.url}
      <button id="LikeButton" onClick={increaseLike}>Like!</button>
      <button onClick={deleteBlog}>Delete this blog.</button>
        <button onClick={toggleVisibility}>Hide</button>
      </div>
    </div>
  )
}
export default Blog