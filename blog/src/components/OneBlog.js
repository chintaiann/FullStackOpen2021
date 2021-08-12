import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {
    useParams
  } from "react-router-dom"
import addComment from '../reducers/blogReducer'
import blogService from '../services/blogs'


const OneBlog = (props) => {
    const dispatch = useDispatch()
    const id = useParams().id
    const blogs = useSelector(state=>state.blogs)
    const user = useSelector(state=>state.user)


    if (!blogs) {
        return null
    }

    const blog = blogs.find(n=> String(n.id)===String(id))

    const increaseLike = () => {
        const updatedBlog = ({
          ...blog,
          likes: ++blog.likes 
        })
        props.updateBlog(updatedBlog)
      }
      
      const deleteBlog = () => {
        props.deleteBlog(blog)
      }

      const handleComment = async (event) => {
        event.preventDefault()
        const comment = event.target.comment.value
        const id = blog.id
        blogService.setToken(user.token)

        dispatch(addComment(id,comment))
        event.target.comment.value = ''
      }
      



    return (
        <div>
            <h1>{blog.title} by {blog.author}</h1>
            <h3>{blog.url}</h3>
            <div>
                {blog.likes} likes. <button id="LikeButton" onClick={increaseLike}>Like!</button>
            </div>
            <div>
                <button onClick={deleteBlog}>Delete this blog.</button>
            </div>
            
            added by : {blog.user.username}

            <div>
                <h2>Comments:</h2>
                <form onSubmit={handleComment}>
                  <input type="text" name="comment"></input>
                  <button  type="submit">Add comment</button>
                </form>


                <ul>
           {blog.comments.map(comment => 
           <li> {comment} </li>
            )}
        </ul>
               
                
            </div>

        </div>
    )








}





export default OneBlog 
