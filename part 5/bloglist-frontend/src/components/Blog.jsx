import { useRef, useState } from 'react'
import Toggleble from './Toggleble'
import Button from './Button'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const detailsRef = useRef()
  const [like, setLike] = useState(blog.likes)
  return (
    <div style={{ border : '2px solid black', margin : '8px 0px' }} className='blog'>
      {blog.title} {blog.author}
      <Toggleble text = 'view' text2 = 'hide' ref = {detailsRef} position = {true} toHide = {blog.title} >
        <br/>
        {blog.url} <br/>
        likes {like} <Button text='like' handleClick={() => handleLike(blog, setLike)} className = "like"/><br/>
        {blog.user.name} <br />
        {blog.user.username !== user.username || <Button text = 'remove' handleClick={() => window.confirm(`Remove blog ${blog.title} by ${blog.author}`) && handleDelete(blog)}/>}
      </Toggleble>
    </div>
  )
}

export default Blog