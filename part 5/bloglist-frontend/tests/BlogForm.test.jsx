import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../src/components/BlogForm'

describe('BlogForm', () => {
  test('adds form', async () => {
    let createBlog = vi.fn()
    let container = render(<BlogForm createBlog={createBlog}/>
    ).container
    const user = userEvent.setup()
    const button = container.querySelector('button')
    const inputs = screen.getAllByRole('textbox')

    await user.type(inputs[0], 'sample title')
    await user.type(inputs[1], 'somebody')
    await user.type(inputs[2], 'sample url')
    await user.click(button)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('sample title')
    expect(createBlog.mock.calls[0][0].author).toBe('somebody')
    expect(createBlog.mock.calls[0][0].url).toBe('sample url')
  })
})