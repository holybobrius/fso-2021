import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleClick = (rate) => {
    switch(rate) {
      case 'good': 
        console.log(good)
        setGood(previousValue => previousValue + 1)
        console.log(good)
        break
      case 'neutral':
        setNeutral(previousValue => previousValue + 1)
        break
      case 'bad':
        setBad(previousValue => previousValue + 1)
        break
      default:
        console.log('wrong rate')
    }
  }

  const total = () => (
    good + neutral + bad
  )

  const average = () => (
    (good - bad) / total()
  )

  const positive = () => (
    `${good / total()*100} %`
  )

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={() => handleClick('good')}/>
      <Button text='neutral' handleClick={() => handleClick('neutral')}/>
      <Button text='bad' handleClick={() => handleClick('bad')}/>
      <h1>statistics</h1>
      {good === 0 && bad === 0 && neutral === 0 ? <p>no feedback given</p> : 
        <div>
          <Statistics title='good' value={good} />
          <Statistics title='neutral' value={neutral} />
          <Statistics title='bad' value={bad} />
          <Statistics title='all' value={total()} />
          <Statistics title='average' value={good === 0 && bad === 0 && neutral === 0 ? '0' : average()} />
          <Statistics title='positive' value={good === 0 && bad === 0 && neutral === 0 ? '0 %' : positive()} />
        </div>
      }
    </div>
  )
}

const Statistics = (props) => (
  <p>{props.title} {props.value}</p>
)

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

export default App