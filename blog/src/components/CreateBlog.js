import React, {useState} from 'react' 
import {useDispatch,useSelector} from 'react-redux'
import {setMessage } from '../reducers/notiReducer'
import {createBlog} from '../reducers/blogReducer'

const CreateBlog = ({newBlog}) => {

    const [title,setTitle] = useState('')
    const [author,setAuthor] = useState('')
    const [url,setUrl] = useState('')
    const handleTitle= (event) => {
        setTitle(event.target.value)
      }
    const handleAuthor = (event) => {
        setAuthor(event.target.value)
      }
    const handleUrl= (event) => {
        setUrl(event.target.value)
      }

    const dispatch = useDispatch()

    const addBlog = async (event) => {
        event.preventDefault()
        const blogObject = {
          title: title,
          author: author,
          url: url
        }
        await newBlog()
        dispatch(createBlog(blogObject))
        
        setTitle('')
        setAuthor('')
        setUrl('')

    }
    return (
        <div>
            <form onSubmit={addBlog}>
        <div>
        Title:
          <input
          id='titleid'
          type="text"
          value={title}
          name="title"
          onChange={handleTitle}
        />
      </div>
      <div>
        Author:
          <input
          id='authorid'
          type="text"
          value={author}
          name="Author"
          onChange={handleAuthor}
        />
      </div>
      <div>
        URL: 
          <input
          id='urlid'
          type="text"
          value={url}
          name="URL"
          onChange={handleUrl}
        />
      </div>
      <button id='addblog' type="submit">Add Blog</button>
      </form>
        </div>
    )
    }



export default CreateBlog 