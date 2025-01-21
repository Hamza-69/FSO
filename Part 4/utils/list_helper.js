const dummy = (blogs) => {
  blogs
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const findFavoriteBlog = (blogs) => {
  const favorite = blogs.reduce((currentFavorite, blog) => {
    return blog.likes > currentFavorite.likes ? blog : currentFavorite
  }, blogs[0])

  return favorite
}

const mostBlogs = (blogs) => {
  const most = blogs.reduce((Authors, blog) => {
    if (Authors[blog.author]) {
      Authors[blog.author] += 1
    } else {
      Authors[blog.author] = 1
    }
    return Authors
  }, {})
  const max = Object.keys(most).reduce((currentAuthor, authorVal) => {
    return currentAuthor.blogs > most[authorVal] ? currentAuthor : { author:  authorVal, blogs: most[authorVal] }
  }, { author: '', blogs: 0 })
  if (max.author !== '') {
    return max
  }
}
const mostLikes = (blogs) => {
  const most = blogs.reduce((Authors, blog) => {
    if (Authors[blog.author]) {
      Authors[blog.author] += blog.likes
    } else {
      Authors[blog.author] = blog.likes
    }
    return Authors
  }, {})
  const max = Object.keys(most).reduce((currentAuthor, authorVal) => {
    return currentAuthor.likes > most[authorVal] ? currentAuthor : { author:  authorVal, likes: most[authorVal] }
  }, { author: '', likes: 0 })
  if (max.author !== '') {
    return max
  }
}
module.exports = {
  dummy,
  totalLikes,
  findFavoriteBlog,
  mostBlogs,
  mostLikes
}