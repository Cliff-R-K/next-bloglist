import React, { useState } from "react";
import Blogs from "../components/Blogs";
import Notification from "../components/Notification";
import blogService from "../services/blogs";
import { useSession, signIn, signOut } from "next-auth/client";
import BlogForm from "../components/BlogForm";
const blogs = ({ data }) => {
  const [session, loading] = useSession();
  const [blogs, setBlogs] = useState(data);
  const [notification, setNotification] = useState(null);
  const [createNew, setCreateNew] = useState(false);

  if (typeof window !== "undefined" && loading) return null;
  if (!session) {
    return <h1>Access denied</h1>;
  }
  return (
    <>
      <h1>blogs</h1>
      <Notification {...{ notification, setNotification }} />
      {session.user.name} logged in
      <button onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}>
        Sign out
      </button>
      <br />
      {createNew && (
        <BlogForm
        session={session}
          user={session.user}
          blogs={blogs}
          setBlogs={setBlogs}
          setNotification={setNotification}
        />
      )}
      <button onClick={() => setCreateNew(!createNew)}>
        {createNew ? "cancel" : "create new blog"}
      </button>
      <Blogs {...{ blogs, setBlogs }} />
    </>
  );
};

export default blogs;

export const getStaticProps = async () => {
  const data = await blogService.getAll();

  return {
    props: { data }, // will be passed to the page component as props
  };
};
