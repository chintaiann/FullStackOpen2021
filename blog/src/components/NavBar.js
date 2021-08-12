import React from 'react'
import {
    BrowserRouter as Router,
    Switch, Route, Link
  } from "react-router-dom"


const NavBar = () => {

    const padding = {
        padding: 5
      }

    return (
        <Router>
            <div>
                <Link style={padding} to="/">Blogs</Link>
                <Link style={padding} to="/users">Users</Link>
            </div>
        </Router>
    )
}

export default NavBar