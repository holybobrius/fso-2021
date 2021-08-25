import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      booksCount
    }
  }
`

const ALL_BOOKS = gql`
  query {
    allBooks {
    title
    author {
      name
    }
    published
    genres
  }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'} data={authors.data} loading={authors.loading}
      />

      <Books
        show={page === 'books'} data={books.data} loading={books.loading}
      />

      <NewBook
        show={page === 'add'} booksQuery={ALL_BOOKS} authorsQuery={ALL_AUTHORS}
      />

    </div>
  )
}

export default App