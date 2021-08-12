
import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch, Route, Link
  } from "react-router-dom"


 
const AllUsers = () => {
    const users = useSelector(state=>state.users)

    if (!users) {
        return null
    }

    return (
        <div>
            <h2>Users</h2>
            {users.map(user => 
            <div key={user.id}><Link to={`/users/${user.id}`}>{user.username}  </Link>: {user.blogs.filter(blog => blog.title !== null).length} total blogs </div>
                )}
        </div>
    )
}

export default AllUsers 
