import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (e) => {
    e.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type='text'
          value={title}
          data-testid = "title"
          name='title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type='text'
          value={author}
          data-testid = "author"
          name='author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type='text'
          value={url}
          data-testid = "url"
          name='url'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default BlogForm