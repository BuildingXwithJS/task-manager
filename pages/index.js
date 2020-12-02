import { getSession } from 'next-auth/client';
import Head from 'next/head';
import { Sidebar } from '../components/sidebar';
import { getUserProjects } from '../src/utils';

export default function Home({ session, projects }) {
  return (
    <>
      <Head>
        <title>Task Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-coolGray-100 h-screen w-screen grid grid-cols-projects-layout">
        <Sidebar initialProjects={projects} />

        <main className="p-2">
          <h1 className="text-2xl font-bold">Welcome to Task Manager!</h1>
          <p className="text-lg">You are signed in as {session.user.email}</p>
        </main>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  // get user session
  const session = await getSession(context);
  // if there's no session - redirect to login
  if (!session?.user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

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
