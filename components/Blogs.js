import React, { useEffect, useState } from "react";
import Blog from "./Blog";

const Blogs = ({ blogs, setBlogs }) => {
    const [update, setUpdate] = useState(true)
    useEffect(() => {
    console.log("sort");
    let blogsCopy = [...blogs];
    blogsCopy.sort((a, b) => a.likes - b.likes);

 
    setBlogs(blogsCopy);
    setUpdate(false)
  }, [update]);

  return (
    <div>
      <h2>blogs</h2>
      {blogs &&
        blogs.map((blog) => (
          <Blog key={blog.id} {...{ blog, blogs, setBlogs,setUpdate }} />
        ))}
    </div>
  );
};

export default Blogs;
