

let timer
const startMessage = "Welcome to Anecdotes!"

const notiReducer = (state = startMessage , action) => {
    switch (action.type) {
        case 'SET_NOTE' :
            return state = action.data.notification

        default:
            return state
    }
}


export const setMessage = (notification, timeout) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTE',
            data: { notification }
        })
        clearTimeout(timer)
        timer = setTimeout(() => dispatch({
            type: 'SET_NOTE',
            data: { notification: '' }
        }), timeout)
    }
}



export default notiReducer 