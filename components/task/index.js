import Link from 'next/link';

export function Task({ project, task, isCurrent }) {
  return (
    <Link
      href="/project/[projectid]/task/[taskid]"
      as={`/project/${project._id}/task/${task._id}`}
    >
      <a
        className={`${
          isCurrent && 'text-black'
        } px-1 py-2 mb-2 flex items-center border-b border-gray-500 focus:outline-none`}
      >
        <div className="text-xl pr-2 justify-center items-center">
          {task.icon}
        </div>
        <div className="flex flex-col flex-1">
          <div className="font-bold">{task.name}</div>
          <div className="text-xs">{task.description ?? ''}</div>
        </div>
      </a>
    </Link>
  );
}
