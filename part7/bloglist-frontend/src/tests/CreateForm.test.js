import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import CreateForm from '../components/CreateForm'

test('<CreateForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <CreateForm handleCreate={createBlog}/>
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'blog-for-test' }
  })
  fireEvent.change(author, {
    target: { value: 'author-for-test' }
  })
  fireEvent.change(url, {
    target: { value: 'url-for-test' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('blog-for-test')
  expect(createBlog.mock.calls[0][0].author).toBe('author-for-test')
  expect(createBlog.mock.calls[0][0].url).toBe('url-for-test')
})