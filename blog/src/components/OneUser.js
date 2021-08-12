import React from 'react'
import {useSelector} from 'react-redux'
import {
    useParams
  } from "react-router-dom"

const OneUser =() => {
    const id = useParams().id
    const users = useSelector(state=>state.users)
    if (!users){
        return null
    }
    const user = users.find(n => String(n.id) === String(id))
    return (
        <div>
           <h2>{user.username}</h2>
           <h3>Added Blogs:</h3>
        <ul>
           {user.blogs.map(blog => 
           <li key={blog.id}> {blog.title} </li>
            )}
        </ul>
        </div>
    )
}

export default OneUser 