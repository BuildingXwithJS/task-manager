import { Emoji } from 'emoji-mart';
import Link from 'next/link';

export function Task({ project, task, isCurrent }) {
  return (
    <Link href={`/project/${project._id}/task/${task._id}`}>
      <a
        className={`${
          isCurrent && 'text-black'
        } px-1 py-2 mb-2 flex items-center border-b border-coolGray-900 border-opacity-20 focus:outline-none`}
      >
        <div className="flex justify-center items-center">
          <div className="mr-2">
            <Emoji emoji={task.icon ?? 'hammer'} size={16} />
          </div>

          <div className="flex flex-col flex-1">
            <div className="font-bold">{task.name}</div>
            <div className="text-xs">{task.description ?? ''}</div>
          </div>
        </div>
      </a>
    </Link>
  );
}
