import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Button from './components/Button'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggleble from './components/Toggleble'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [token, setTokenHidden] = useState(null)
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  const setToken = (token) => {
    setTokenHidden('Bearer '+token)
  }
  const blogref = useRef()
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
    } catch {
      setNotification('wrong username or password')
      setNotificationType('error')
      setTimeout(() => {
        setNotification(null)
        setNotificationType(null)
      }, 5000)
    }
  }

  const handleLike = async (blog, setLike) => {
    try {
      await blogService.like(blog, token)
      setLike(blog.likes+1)
      blog.likes = blog.likes + 1
    } catch(e){
      null
    }
  }

  const handleDelete = async (blog) => {
    try {
      await blogService.deletePost(blog, token)
      setBlogs(blogs.filter((item) => item.id !== blog.id))
    } catch(e){
      null
    }
  }

  const handleSubmit = async (e, title, author, url) => {
    e.preventDefault()
    try {
      setBlogs(blogs.concat(await blogService.sendBlog({ title, author, url }, token)))
      setNotification(`a new blog ${title} by ${author} added`)
      setNotificationType('good')
      blogref.current.toggle()
      setTimeout(() => {
        setNotification(null)
        setNotificationType(null)
      }, 5000)
    } catch {
      setNotification('Title and Url are required!')
      setNotificationType('error')
      setTimeout(() => {
        setNotification(null)
        setNotificationType(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    setToken(null)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user)
      blogService.getAll(token).then(blogs =>
        setBlogs( blogs )
      )
  }, [user])

  return (
    <>
      <Notification text = {notification} className = {notificationType}/>
      {user ?
        <>
          <p>{user.name} logged in <Button text='Logout' handleClick = {handleLogout}/></p>
          <Toggleble text={'new blog'} ref={blogref}>
            <BlogForm token = {token} setNotification={setNotification} setNotificationType={setNotificationType} handleSubmit={handleSubmit} />
          </Toggleble>
          <Blogs blogs={blogs} handleLike = {handleLike} handleDelete = {handleDelete}/>
        </>:
        <>
          <Login handleLogin={handleLogin} setUser={setUsername} setPassword={setPassword} user={username} password={password}/>
        </>
      }
    </>
  )
}

export default App