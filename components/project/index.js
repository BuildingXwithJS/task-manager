import Link from 'next/link';

const toFirstLetters = (name) =>
  name
    .split(' ')
    .map((word) => word[0].toUpperCase())
    .join('');

export function Project({ project, isCurrent }) {
  return (
    <Link href={`/project/${project._id}`}>
      <a
        className={`${
          isCurrent
            ? 'bg-coolGray-100 border-coolGray-200 text-black'
            : 'bg-coolGray-700 border-coolGray-800'
        } text-xl font-bold border rounded-full w-12 h-12 flex justify-center items-center focus:outline-none`}
        title={project.name}
      >
        {toFirstLetters(project.name)}
      </a>
    </Link>
  );
}
