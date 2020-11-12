import { signIn, signOut, useSession } from 'next-auth/client';
import Head from 'next/head';
import { Sidebar } from '../components/sidebar';

export default function Home() {
  const [session, loading] = useSession();

  return (
    <>
      {loading && <div>Loading..</div>}
      {!session && (
        <>
          Not signed in <br />
          <button onClick={signIn}>Sign in</button>
        </>
      )}
      {session && (
        <>
          <Head>
            <title>Task Manager</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="h-screen w-screen grid grid-cols-main-layout">
            <Sidebar />

            <div className="">Task list</div>

            <main className="p-2">
              <h1 className="font-bold">Welcome to Next.js!</h1>
              Signed in as {session.user.email} <br />
              <button onClick={signOut}>Sign out</button>
            </main>
          </div>
        </>
      )}
    </>
  );
}
