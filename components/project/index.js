import Link from 'next/link';

const toFirstLetters = (name) =>
  name
    .split(' ')
    .map((word) => word[0].toUpperCase())
    .join('');

export function Project({ project, isCurrent }) {
  return (
    <Link href="/project/[projectid]" as={`/project/${project._id}`}>
      <a
        className={`${
          isCurrent ? 'bg-gray-300 text-black' : 'bg-gray-700'
        } p-1 rounded-2xl w-12 h-12 flex justify-center items-center focus:outline-none`}
        title={project.name}
      >
        {toFirstLetters(project.name)}
      </a>
    </Link>
  );
}
