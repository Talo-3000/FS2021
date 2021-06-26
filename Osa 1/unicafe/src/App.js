import React, { useState } from 'react'
const Statistics = ({good, neutral, bad, all}) => {
  const countAverage = () => {
    let average = all.reduce((acc,cur) => acc + cur, 0) / all.length
    return (average)
  }
  const countPositive = () => {
    let positives = 0
    all.forEach(val => {
      if (val === 1) {
        positives = positives + 1
      }
    })
    return (positives / all.length * 100)    
  }
  if (all.length === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="average" value={countAverage()} />
          <StatisticsLine text="positive" value={countPositive()} />
        </tbody>
      </table>
    </div>
  )
}
const StatisticsLine = ({text, value}) => {
  return (

      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>

  )
}
const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState([])
  
  const handleGood = () => {
    setGood(good + 1)
    setAll(all.concat(1))
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all.concat(0))
  }
  const handleBad = () => {
    setBad(bad + 1)
    setAll(all.concat(-1))
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGood} text='good'/>
      <Button handleClick={handleNeutral} text='neutral'/>
      <Button handleClick={handleBad} text='bad'/>
      <h2>Statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} all={all}/>
      
    </div>
  )
}


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

export default App