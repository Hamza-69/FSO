import { useState } from "react"
import blogService from "../services/blogs"

const BlogForm = ({token, setNotification, setNotificationType}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await blogService.sendBlog({title, author, url}, token)
      setNotification(`a new blog ${title} by ${author} added`)
      setNotificationType('good')
      setTimeout(() => {
        setNotification(null)
        setNotificationType(null)
      }, 5000)
    } catch {
      setNotification("Title and Url are required!")
      setNotificationType("error")
      setTimeout(() => {
        setNotification(null)
        setNotificationType(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
    <div>
      title:
      <input 
        type="text"
        value={title}
        name="title"
        onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    <div>
      author:
      <input 
        type="text"
        value={author}
        name="author"
        onChange={({ target }) => setAuthor(target.value)}
      />
      </div>
      <div>
        url:
        <input 
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm