import React from "react";
import { useSession, signIn, signOut } from "next-auth/client";
export default function Home() {

  const [session, loading] = useSession();
  if (session) {
    console.log("session = true")
    return (
      <>
        Signed in as {session.user.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
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


