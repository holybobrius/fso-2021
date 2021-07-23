import React from 'react'

const Person = ({person, handleClick}) => (
    <div>
        <p>{person.name} {person.number}</p>
        <button onClick={() => handleClick(person)}>delete</button>
    </div>
)

export default Person