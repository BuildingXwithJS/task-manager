import { getSession } from 'next-auth/client';
import Head from 'next/head';
import { Sidebar } from '../../../../components/sidebar';
import { TaskView } from '../../../../components/task/view';
import { TaskList } from '../../../../components/tasklist';
import { getProjectTasks, getUserProjects } from '../../../../src/utils';

export default function ProjectPage({
  session,
  projects,
  tasks,
  currentProject,
  currentTask,
}) {
  return (
    <>
      <Head>
        <title>Task Manager - {currentProject.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen w-screen grid grid-cols-main-layout">
        <Sidebar initialProjects={projects} currentProject={currentProject} />

        <div className="">
          <TaskList initialTasks={tasks} currentProject={currentProject} />
        </div>

        <main className="p-2">
          <TaskView project={currentProject} task={currentTask} />
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
