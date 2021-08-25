import React from 'react'
import { gql, useMutation } from '@apollo/client'

const EDIT_YEAR = gql`
  mutation editBorn($name: String!, $born: Int!) {
    editBorn(name: $name, born: $born) {
      name
      born
      booksCount
      id
    }
  }
`

const Authors = (props) => {
  const [ editBorn ] = useMutation(EDIT_YEAR, { refetchQueries: [ {query: props.authorsQuery } ] })
  console.log('edit born', editBorn)
  if (!props.show) {
    return null
  }
  if(props.loading) {
    return <div>loading...</div>
  }

  const authors = props.data.allAuthors
  

  const onSubmit = event => {
    event.preventDefault()
    editBorn({ variables: { name: event.target.name.value, born: Number(event.target.year.value) } })
  }
  console.log(props)

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.booksCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>set a birthyear</h2>
      <form onSubmit={onSubmit}>
        <label>name</label>
        <input name='name' />
        <br></br>
        <label>year</label>
        <input type='number' name='year' />
        <br></br>
        <input type='submit' />
      </form>
    </div>
  )
}

export default Authors
