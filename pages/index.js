import React,{useEffect} from "react";
import { useSession, signIn, signOut } from "next-auth/client";
import { useRouter } from 'next/router'
export default function Home() {

  const [session, loading] = useSession();
  const router = useRouter()

 /*  useEffect(() => {
  if(!session){
    alert(loading)
    signIn()
    //router.push('/api/auth/signin?callbackUrl=http://localhost:3000')
  }
  }, [session]) */


  if (session) {
    console.log("session = true")
    console.log(session)
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


