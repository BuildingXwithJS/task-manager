import { getSession, signIn } from 'next-auth/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Sidebar } from '../../../../components/sidebar';
import { TaskList } from '../../../../components/tasklist';
import { getUserProjects } from '../../../api/project/all';
import { getProjectTasks } from '../../../api/task/[projectid]';

export default function ProjectPage({
  session,
  projects,
  tasks,
  currentProject,
  currentTask,
}) {
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

            <div className="">
              <TaskList initialTasks={tasks} currentProject={currentProject} />
            </div>

            <main className="p-2">{JSON.stringify(currentTask)}</main>
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
  // resolve current project
  const currentProjectId = context.params.projectid;
  const currentProject = projects.find(
    (project) => project._id === currentProjectId
  );

  // fetch tasks list for current project
  const projectTasks = await getProjectTasks(currentProject._id);
  // Convert mongoose ObjectIDs to strings
  // because Next.js doesn't understand you can serialize
  // (for some reason)
  const tasks = projectTasks.map((task) => {
    const { __v, _id, user, project, ...obj } = task;
    return {
      ...obj,
      _id: String(_id),
      user: String(user),
      project: String(project),
    };
  });

  // resolve current project
  const currentTaskId = context.params.taskid;
  const currentTask = tasks.find((task) => task._id === currentTaskId);

  return {
    props: { session, projects, tasks, currentProject, currentTask }, // will be passed to the page component as props
  };
}
