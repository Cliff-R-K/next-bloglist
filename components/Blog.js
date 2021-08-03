import React, { useState } from "react";
import blogService from '../services/blogs'
import { useSession} from "next-auth/client";
import PropTypes from 'prop-types'

const Blog = ({ blog, blogs, setBlogs, setUpdate }) => {
const [hide, setHide] = useState(true);
const [session, loading] = useSession();


const likeHandler = () => {
    blogService.like(blog)
    let blogsCopy = [...blogs]
    const blogIndex = blogsCopy.indexOf(blog)
    blogsCopy[blogIndex].likes += 1
    setBlogs(blogsCopy)
    setUpdate(true)
}

const removeHandler = async () => {
    const confirm = window.confirm(`Remove blog ${blog.title} ?`)
    if(!confirm) return
    await blogService.remove(blog.id)
    let blogsCopy = [...blogs].filter(b => b.id !== blog.id)
    setBlogs(blogsCopy)

}

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

return(
  <div style={blogStyle}>
    {blog.title}
    <button onClick={() => setHide(!hide)}>{hide ? "view" : "hide"}</button>
    {!hide && (
      <>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button onClick={likeHandler}>like</button></div>
        <div>{blog.author}</div>
        {session.user.sub === blog.user.id && <div><button onClick={removeHandler}>remove</button></div>}
      </>
    )}
  </div>
)};

export default Blog;

Blog.protoTypes = {
    blog: PropTypes.object.isRequired, 
    blogs: PropTypes.array.isRequired, 
    setBlogs: PropTypes.func.isRequired, 
    setUpdate: PropTypes.func.isRequired
}