import React from 'react'

const Authors = (props) => {
  if (!props.show) {
    return null
  }
  if(props.loading) {
    return <div>loading...</div>
  }

  const authors = props.data.allAuthors
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

    </div>
  )
}

export default Authors
