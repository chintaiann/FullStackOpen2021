import anecService from '../services/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)


const anecReducer = (state = [], action) => {
  switch(action.type) {
    case 'increase_vote':
      const id = action.data.id
      const anecdotetovote = state.find(n => n.id === id)
      const voted = {...anecdotetovote, votes: anecdotetovote.votes+1}
      return state.map( anecdote => anecdote.id !==id ? anecdote : voted)

    case 'create' : 
      return [...state, action.data]

    case 'INIT' :
      return action.data 
    
    default: 
      return state
  }
}

export const increasevote = (id) => {
  return async dispatch => {
    await anecService.vote(id)

    dispatch({
      type: 'increase_vote',
      data: {id} 
    })
   }
}

export const createAnec = (content) => {
  return async dispatch => {
    const newAnec = await anecService.createNew(content)
    dispatch({
      type:'create',
      data: newAnec
    })
  }
}

export const initializeAnec = () => {
  return async dispatch => {
    const anecdotes = await anecService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}
export default anecReducer 