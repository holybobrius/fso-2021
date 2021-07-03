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

const Total = (props) => (
  <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
)

export default App