import React from "react";
import { useSession, signIn, signOut } from "next-auth/client";
import Blogs from "../components/Blogs";
export default function Home() {

  const [session, loading] = useSession();
  if (session) {
    console.log("session = true")
    return (
      <>
        Signed in as {session.user.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <Blogs/>
      </>
    );
  }
  console.log("session = false")
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}


