import React, { useState } from "react";
import Blog from "./Blog";

const Blogs = ({ data }) => {

const [blogs, setBlogs] = useState(data);

  return (
    <div>
      <h2>blogs</h2>
      {blogs && blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Blogs;


