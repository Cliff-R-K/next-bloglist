import React from "react";
import { useSession, signIn, signOut } from "next-auth/client";
import { useRouter } from 'next/router'
export default function Home() {

  const [session, loading] = useSession();
  const router = useRouter()

  if (session) {
    console.log("session = true")
    router.push('/blogs')
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


