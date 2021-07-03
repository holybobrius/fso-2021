import React from 'react'

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

const Course = ({course}) => (
  <div>
    <Header course={course.name}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
  </div>
)

const Header = (props) => {
  console.log(props)
  return(
    <h1>{props.course}</h1>
  )
}

const Content = (props) => (
  <>
    {props.parts.map(part => 
      <Part part={part.name} exercises={part.exercises} key={part.id} />
    )}
  </>
)

const Part = (props) => (
  <p>
    {props.part} {props.exercises}
  </p>
)

const Total = (props) => {
  let total = props.parts.reduce((sum, part) => sum+=part.exercises, 0);
  return <h3>Number of exercises {total}</h3>
}

export default App