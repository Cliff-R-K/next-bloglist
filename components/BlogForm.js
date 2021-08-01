import React from 'react'

const BlogForm = () => {
    const submitHandler = (e) => {
        e.preventDefault()
    }
    return (
        <div>
           <h1>create new</h1>
           <form onSubmit={submitHandler}>
               title:<input type="text" /><br/>
               author:<input type="text" /><br/>
               url:<input type="text" /><br/>
               <button action="submit">create</button>
            </form> 
        </div>
    )
}

export default BlogForm
