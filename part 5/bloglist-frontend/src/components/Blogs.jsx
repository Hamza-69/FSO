import Blog from './Blog'
const Blogs = ({ blogs, handleLike, handleDelete }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete}/>
      )}
    </div>
  )
}

export default Blogs