import React from "react";
import Blogs from "../components/Blogs";
import blogService from "../services/blogs";
import { useSession, signIn, signOut } from "next-auth/client";
const blogs = ({ data }) => {
  const [session, loading] = useSession();

  if (typeof window !== "undefined" && loading) return null;
  if (!session) {
    return <h1>Access denied</h1>;
  }

  return (
    <div>
      Signed in as {session.user.name} <br />
      <button onClick={() => signOut()}>Sign out</button>
      BlogsPage
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
