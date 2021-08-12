import loginService from '../services/login'
import blogService from '../services/blogs'
import { setMessage } from './notiReducer'

const authReducer = (state = null,action) => { 
    switch (action.type) {

        case 'INIT_USER' :
            return action.user 

        case 'LOGIN' : 
            return action.user

        case 'LOGOUT': 
            return action.user

        default: 
            return state 
    }
}
export const initUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedOnUser')
        if (loggedUserJSON){
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            dispatch({
                type:'INIT_USER',
                user:user 
            })

        }
        else {
            dispatch({
                type:'INIT_USER',
                user:null
            })
        }
    }
}

export const Login = (username,password) => {
    return async dispatch => {
        const user = await loginService.login({"username":username,"password":password})
        window.localStorage.setItem('loggedOnUser',JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch({
            type:'LOGIN',
            user: user
        }) 
    }
}

export const Logout = () => {
    return async dispatch => {
        window.localStorage.removeItem('loggedOnUser')
        dispatch({
            type:'LOGOUT',
            user: null

        })
    }
}






export default authReducer 