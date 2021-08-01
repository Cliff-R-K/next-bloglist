import React from "react";
import Blogs from "../components/Blogs";
import blogService from "../services/blogs";
import { useSession, signIn, signOut } from "next-auth/client";
import BlogForm from "../components/BlogForm";
const blogs = ({ data }) => {
  const [session, loading] = useSession();

  if (typeof window !== "undefined" && loading) return null;
  if (!session) {
    return <h1>Access denied</h1>;
  }
  console.log(session)
  return (
    <div>
        <h1>blogs</h1>
      {session.user.name} logged in <button onClick={() => signOut({ callbackUrl: 'http://localhost:3000' })}>Sign out</button><br/>
      <BlogForm />
      <Blogs data={data} />
    </div>
  );
};

export default blogs;

export const getStaticProps = async () => {
  const data = await blogService.getAll();

  return {
    props: { data }, // will be passed to the page component as props
  };
};
