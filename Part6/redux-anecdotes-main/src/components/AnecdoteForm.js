import React from 'react'
import { useDispatch } from 'react-redux'
import {createAnec } from '../reducers/anecdoteReducer'
import { setMessage} from '../reducers/notiReducer'
import {connect} from 'react-redux'


const NewAnec = (props) => {
    // const dispatch = useDispatch()

    // const addAnec = async (event) => {
    //     event.preventDefault()
    //     const content = event.target.anecdote.value
    //     event.target.anecdote.value = ''

    //     dispatch(createAnec(content))
    //     dispatch(setMessage(`you created an anecdote: ${content}`,5000))
    // }

    const addAnec = async ( event ) => { 
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''

      props.createAnec(content) 
      props.setMessage(`you created an anecdote: ${content}`,5000)
    }




return (
    <div>
    <h2>create new</h2>
      <form onSubmit={addAnec}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
)
}

//export default NewAnec 


const mapDispatchToProps = { 
  createAnec,
  setMessage
}

export default connect (null,mapDispatchToProps)(NewAnec)



