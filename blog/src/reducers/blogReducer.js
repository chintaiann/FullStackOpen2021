import {setMessage} from './notiReducer'
import blogService from '../services/blogs'



const blogReducer = (state = [],action) => { 
    switch (action.type) {
        case 'INIT' :
            return action.data 
        
        case 'ADD' : 
            return state.concat(action.data)
        
        case 'DELETE':
            const newstate = state.filter(blog => blog.id !== action.data.id)
            return newstate

        case 'UPDATE' :
            const newstate2 = state.filter(blog=> blog.id !== action.data.id ? blog : action.data)
            return newstate2

        case 'COMMENT' : 
            const blogToComment = state.find((blog) => blog.id === action.id);
            const commentedBlog = { ...blogToComment, comments: action.comments };
            return state.map((blog) =>
              blog.id === action.id ? commentedBlog : blog
            )


        default: 
            return state 
    }
}

export const initBlogs = () => { 
    return async dispatch=>{
        const response = await blogService.getAll()
        dispatch({
            type: 'INIT',
            data: response 
        })

    }
}

export const createBlog = (newBlog) => { 
    return async dispatch => {
        const response = await blogService.addBlog(newBlog)
        dispatch({
            type:'ADD',
            data:response
        })

    }
}

export const deleteOneBlog = (blogToDelete) => {
    return async dispatch => {
        const response = await blogService.deleteBlog(blogToDelete)
        dispatch({
            type:'DELETE',
            data: blogToDelete
        })
    }
}

export const updateOneBlog = (blogToUpdate) => {
    return async dispatch => {
        const response = await blogService.updateBlog(blogToUpdate)
        dispatch({
            type: 'UPDATE',
            data: response
        })
    }
}

export const addComment = (id,comment) => {
    return async dispatch => {
        const response = await blogService.comment(id,comment)
        const { comments } = response
        dispatch({ 
            type: "COMMENT", 
            id:id,
            comments:comments
        })

    
    }
}

export default blogReducer 