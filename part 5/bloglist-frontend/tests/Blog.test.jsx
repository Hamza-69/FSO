import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/components/Blog'

describe('Blog', () => {
  let container
  let like
  beforeEach(() => {
    like = vi.fn()
    const blog = {
      title: 'sample title',
      author: 'somebody',
      url: 'sample url',
      likes: 8
    }

    container = render(<Blog blog={blog} handleLike={like}/>
    ).container
  })

  test('renders blog', () => {
    const element = screen.getByText('sample title somebody')
    expect(element).toBeDefined()
    const hide = container.querySelector('.hidden')
    expect(hide).toHaveStyle('display: none')
  })

  test('renders url and likes', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.shown button')
    await user.click(button)

    const element = screen.getByText('sample title somebody')
    expect(element).toBeDefined()
    const hide = container.querySelector('.hidden')
    expect(hide).not.toHaveStyle('display: none')
  })
  test('Like button works', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.like')

    await user.click(button)
    await user.click(button)

    expect(like.mock.calls).toHaveLength(2)
  })
})