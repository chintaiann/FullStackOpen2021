import React, { useState } from 'react'


const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Statistics = (props) => (

      <tr>
        <td>{props.text}</td> 
        
        <td>  {props.value}</td>
      </tr>
      

)

const NoFeedbackYet = (props) => {
  if (props.track === 0){
    return (
      <div>
      No feedback given yet. </div>
    )
  }

  return (
    <table>
    <tbody>
      <Statistics text = "good" value = {props.good} />
      <Statistics text = "neutral" value = {props.neutral} />
      <Statistics text = "bad" value = {props.bad} />
      <Statistics text = "all" value = {props.total} />
      <Statistics text = "average     "  value = {props.average} />
      <Statistics text = "positive    "value = {props.positive} />
    </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let total = good + bad + neutral
  let average = ((good - bad)/total).toFixed(2)
  let percentpositive = (good/total *100).toFixed(2)

  return (
    <div>
      <b><h1>Give Feedback</h1></b>
      <Button handleClick = {()=> setGood(good+1)} text = "good" />
      <Button handleClick = {()=> setNeutral(neutral+1)} text = "neutral" />
      <Button handleClick = {()=> setBad(bad+1)} text = "bad" />
      <h1><b>Statistics</b></h1>
      <NoFeedbackYet track = {total} good = {good} bad = {bad} neutral = {neutral} 
                  total = {total} average = {average} positive = {percentpositive}/>

    </div>
  )
}




export default App