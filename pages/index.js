import { signIn, signOut, useSession } from 'next-auth/client';
import Head from 'next/head';

export default function Home() {
  const [session, loading] = useSession();

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={signIn}>Sign in</button>
        </>
      )}
      {session && (
        <div className="">
          <Head>
            <title>Task Manager</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className="p-2">
            <h1 className="font-bold">Welcome to Next.js!</h1>
            Signed in as {session.user.email} <br />
            <button onClick={signOut}>Sign out</button>
          </main>
        </div>
      )}
    </>
  );
}
