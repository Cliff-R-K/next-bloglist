import React,{useState} from 'react'
import blogService from '../services/blogs'

const BlogForm = ({user, blogs, setBlogs, setNotification, session}) => {
const [title, setTitle] = useState("")
const [author, setAuthor] = useState("")
const [url, setUrl] = useState("")

    const submitHandler = async (e) => {
        e.preventDefault()
        if(!(title||author||url)){
            window.alert("fill in all required information before submitting new blog")
            return
        }
        const blog = {title, author, url, user}
        const savedBlog = await blogService.save(blog)

        const blogsCopy = [...blogs,savedBlog]
       
        setBlogs(blogsCopy)
        setNotification({type:"notification", message:`a new blog ${blog.title} by ${blog.author} added`})
        setTitle("")
        setAuthor("")
        setUrl("")
        console.log(session)
    }
    return (
        <>
           <h1>create new</h1>
           <form onSubmit={submitHandler}>
               title:<input type="text" value={title} onChange={e =>setTitle(e.target.value) }/><br/>
               author:<input type="text" value={author} onChange={e =>setAuthor(e.target.value)}/><br/>
               url:<input type="text" value={url} onChange={e =>setUrl(e.target.value)}/><br/>
               <button action="submit">create</button>
            </form> 
        </>
    )
}

export default BlogForm
