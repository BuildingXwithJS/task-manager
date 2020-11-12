export function Project({ project }) {
  return (
    <button className="bg-gray-600 p-1 rounded-2xl w-12 h-12 flex justify-center items-center focus:outline-none">
      {project.name}
    </button>
  );
}
