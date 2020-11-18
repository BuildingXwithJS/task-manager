import { getSession, signIn, signOut } from 'next-auth/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Sidebar } from '../components/sidebar';
import { getUserProjects } from './api/project/all';

export default function Home({ session, projects }) {
  const router = useRouter();

  useEffect(() => {
    if (!session.user) {
      router.push('/login');
    }
  }, [session]);

  return (
    <>
      {!session.user && (
        <>
          Not signed in <br />
          <button onClick={signIn}>Sign in</button>
        </>
      )}
      {session.user && (
        <>
          <Head>
            <title>Task Manager</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="h-screen w-screen grid grid-cols-projects-layout">
            <Sidebar initialProjects={projects} />

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

export async function getServerSideProps(context) {
  // get user session
  const session = await getSession(context);

  // get user projects
  const userProjects = await getUserProjects(session.user);
  // Convert mongoose ObjectIDs to strings
  // because Next.js doesn't understand you can serialize
  // (for some reason)
  const projects = userProjects.map((project) => {
    const { __v, _id, user, ...obj } = project;
    return { ...obj, _id: String(_id), user: String(user) };
  });

  return {
    props: { projects, session }, // will be passed to the page component as props
  };
}
