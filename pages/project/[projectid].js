import { getSession, signIn, signOut } from 'next-auth/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Sidebar } from '../../components/sidebar';
import { getUserProjects } from '../api/project/all';

export default function ProjectPage({ session, projects, currentProject }) {
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
            <title>Task Manager - {currentProject.name}</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="h-screen w-screen grid grid-cols-main-layout">
            <Sidebar
              initialProjects={projects}
              currentProject={currentProject}
            />

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

export async function getServerSideProps(context) {
  // get user session
  const session = await getSession(context);

  const userProjects = await getUserProjects(session.user);
  // Convert mongoose ObjectIDs to strings
  // because Next.js doesn't understand you can serialize
  // (for some reason)
  const projects = userProjects.map((project) => {
    const { __v, _id, user, ...obj } = project;
    return { ...obj, _id: String(_id), user: String(user) };
  });

  const currentProjectId = context.params.projectid;
  const currentProject = projects.find(
    (project) => project._id === currentProjectId
  );

  return {
    props: { session, projects, currentProject }, // will be passed to the page component as props
  };
}
