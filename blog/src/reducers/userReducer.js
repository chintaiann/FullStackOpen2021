
import userService from '../services/users'

const userReducer = (state = null,action) => { 
    switch (action.type) {
        case 'INIT_ALLUSERS' :
            return action.data 
  
        default: 
            return state 
    }
}

export const init_allUsers = () => {
    return async dispatch => {
        const response = await userService.getAll()
        dispatch({
            type:'INIT_ALLUSERS',
            data: response
        })
    }
}

export default userReducer 