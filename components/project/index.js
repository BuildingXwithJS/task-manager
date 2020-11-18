import Link from 'next/link';

const toFirstLetters = (name) =>
  name
    .split(' ')
    .map((word) => word[0].toUpperCase())
    .join('');

export function Project({ project }) {
  return (
    <Link href={`/project/${project._id}`}>
      <a
        className="bg-gray-600 p-1 rounded-2xl w-12 h-12 flex justify-center items-center focus:outline-none"
        title={project.name}
      >
        {toFirstLetters(project.name)}
      </a>
    </Link>
  );
}
