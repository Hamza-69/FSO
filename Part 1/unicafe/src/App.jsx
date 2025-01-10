import { useState } from 'react'

const Button = ({onClick, text}) =>  <button onClick={onClick}>{text}</button>
const Stat = ({number, text, sign}) =>  <tr><td>{text}</td><td>{number} {sign}</td></tr>
const Statistics = ({good, neutral, bad}) => {
  const stats = (
  <table>
  <tbody>
  <Stat number = {good} text = {"good"}/>
  <Stat number = {neutral} text = {"neutral"}/>
  <Stat number = {bad} text = {"bad"}/>
  <Stat number = {(good +neutral+bad)} text = {"all"}/>
  <Stat number = {(good - bad)/(good +neutral+bad)} text = {"average"}/>
  <Stat number = {good*100/(good +neutral+bad)} text = {"positive"} sign = {"%"}/>
  </tbody>
  </table> 
  )
  return (
    <>
    <h1>statistics</h1>
    {(good +neutral+bad) == 0 ? "No feedback given": stats}
    </>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleClick = (value, func) => () => {
    func(value+1)
  }
  let stats = <Statistics good = {good} bad = {bad} neutral={neutral}/>
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick = {handleClick(good, setGood)} text = {"good"}/>
      <Button onClick = {handleClick(neutral, setNeutral)} text = {"neutral"}/>
      <Button onClick = {handleClick(bad, setBad)} text = {"bad"}/>
      {stats}
    </div>
  )
}

export default App