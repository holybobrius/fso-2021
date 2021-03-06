import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from '../components/Blog'

describe('<Blog />', () => {
  test('renders blog title by default', () => {
    const blog = {
      title: 'blog for testing',
      author: 'author for testing',
      url: 'url for testing',
      likes: 'likes for testing'
    }

    const component = render(
      <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent('blog for testing')
  })

  test('renders blog author by default', () => {
    const blog = {
      title: 'blog for testing',
      author: 'author for testing',
      url: 'url for testing',
      likes: 'likes for testing'
    }

    const component = render(
      <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent('author for testing')
  })

  test('does not render blog url by default', () => {
    const blog = {
      title: 'blog for testing',
      author: 'author for testing',
      url: 'url for testing',
      likes: 'likes for testing'
    }

    const component = render(
      <Blog blog={blog} />
    )

    const url = component.container.querySelector('.url')

    expect(url).toBe(null)
  })

  test('does not render blog likes by default', () => {
    const blog = {
      title: 'blog for testing',
      author: 'author for testing',
      url: 'url for testing',
      likes: 'likes for testing'
    }

    const component = render(
      <Blog blog={blog} />
    )

    const likes = component.container.querySelector('.likes')

    expect(likes).toBe(null)
  })

  test('clicking the expand button renders blog url', () => {
    const blog = {
      title: 'blog for testing',
      author: 'author for testing',
      url: 'url for testing',
      likes: 5,
      user: { name: 'user for testing' }
    }

    const component = render(
      <Blog blog={blog} />
    )

    const button = component.getByText('expand')
    fireEvent.click(button)

    const url = component.container.querySelector('.url')

    expect(url).toHaveTextContent('url for testing')
  })

  test('clicking the expand button renders blog likes', () => {
    const blog = {
      title: 'blog for testing',
      author: 'author for testing',
      url: 'url for testing',
      likes: 5,
      user: { name: 'user for testing' }
    }

    const component = render(
      <Blog blog={blog} />
    )

    const button = component.getByText('expand')
    fireEvent.click(button)

    const likes = component.container.querySelector('.likes')

    expect(likes).toHaveTextContent('likes 5')
  })

  test('clicking the expand button renders blog likes', () => {
    const blog = {
      title: 'blog for testing',
      author: 'author for testing',
      url: 'url for testing',
      likes: 5,
      user: { name: 'user for testing' }
    }

    const mockHandler = jest.fn()
    const component = render(
      <Blog blog={blog} handleUpdate={mockHandler}/>
    )

    const expandButton = component.getByText('expand')
    fireEvent.click(expandButton)
    const likeButton = component.getByText('like')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})