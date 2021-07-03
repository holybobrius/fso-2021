import React from 'react'

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

export default Course