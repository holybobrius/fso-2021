import React, { useState } from 'react'

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
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [best, setBest] = useState([anecdotes.indexOf(anecdotes[Math.floor(Math.random()*anecdotes.length)])])

  const handleVote = () => {
    const votesCopy = [ ...votes ];
    const bestAnecdotes = []
    votesCopy[selected] += 1
    setVotes(votesCopy)
    console.log(votes)
    votes.forEach(el => {
      if(el === Math.max.apply(null, votes)) {
        bestAnecdotes.push(votes.indexOf(el))
      }
    })
    setBest(bestAnecdotes[Math.floor(Math.random()*bestAnecdotes.length)])
    console.log('best', bestAnecdotes)
  }

  
  return (
    <div>
      <h2>anecdote of the day</h2>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]}/>
      <button onClick={handleVote}>vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random()*anecdotes.length))}>new anecdote</button>
      <h2>anecdote with most votes</h2>
      <Anecdote anecdote={anecdotes[best]} votes={votes[best]} />
    </div>
  )
}

const Anecdote = (props) => (
  <div>
    <p>{props.anecdote}</p>
    <p>has {props.votes} votes</p>
  </div>
)
export default App
