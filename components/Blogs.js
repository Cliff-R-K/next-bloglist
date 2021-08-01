import React, { useState } from "react";
import Blog from "./Blog";
import blogService from "../services/blogs";

const Blogs = ({ data }) => {

console.log(data)    
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

export const getStaticProps = async () => {
    const data = await blogService.getAll()

  return {
    props: { data } // will be passed to the page component as props
  };
}
