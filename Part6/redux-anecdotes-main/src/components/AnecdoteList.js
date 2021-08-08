import React from 'react'
import { useDispatch,useSelector} from 'react-redux'
import { increasevote } from '../reducers/anecdoteReducer'
import {setMessage} from '../reducers/notiReducer'


const AnecdoteList = () => {
   
    const anecdotes = useSelector(state=>state.anecdotes)
    const filter = useSelector(state=>state.filter)

    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(increasevote(id))
        const message = anecdotes.find(n => n.id === id).content
        dispatch(setMessage(`you voted: ${message}`,5000))
    }

    return (
        <div>
            
            {anecdotes.filter(anecdote => anecdote.content.includes(filter)).sort(function(a,b){return b.votes-a.votes}).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}






export default AnecdoteList






