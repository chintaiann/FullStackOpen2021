import React, { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
  let upper = anecdotes.length 
  let x = Array.apply(null, {length: upper}).map(function() {return 0;})
  const [selected, setSelected] = useState(0)
  const [allVotes,setVote] = useState(x)


  

  const randomize = () => setSelected(Math.floor(Math.random() * upper))
  const vote = () => { 
    const copy = [...allVotes]
    copy[selected] += 1 
    setVote(copy)
  }
  

    var largestvalue = allVotes[0]
    var largestindex = 0 

    for (var i =0; i<upper;i++){
      if (largestvalue < allVotes[i]){
        largestvalue = allVotes[i]
        largestindex = i 
      }
    }
   // find index of the most voted anecdote 

  return (
    <div>
      <h1><b>Anecdote of the day</b></h1>
      {anecdotes[selected]} <br></br>
      has {allVotes[selected]} votes <br></br>
      <Button handleClick = {vote} text = "Vote" />
      <Button handleClick = {randomize} text = "Next Anecdote" />

      <br></br>

      <h1><b>Anecdote with the most votes</b></h1><br></br>
      {anecdotes[largestindex]} has {largestvalue} votes 


      

    </div>
  )
}

export default App