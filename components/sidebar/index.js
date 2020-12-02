import { signOut } from 'next-auth/client';
import { useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { Project } from '../project';
import { AddProject } from '../project/add';

export function Sidebar({ initialProjects = [], currentProject }) {
  const [projects, setProjects] = useState(initialProjects);

  const handleNewProject = (newProject) => {
    const newProjects = projects.concat(newProject);
    setProjects(newProjects);
  };

  return (
    <div className="flex flex-col space-y-2 h-screen bg-coolGray-400 text-white p-2 items-center">
      {projects.map((project) => (
        <Project
          key={project._id}
          project={project}
          isCurrent={project._id === currentProject?._id}
        />
      ))}

      <AddProject onNewProject={handleNewProject} />

      <div className="flex-1" />

      <button
        className="text-xs p-1 bg-rose-800 border border-rose-900 rounded-full w-8 h-8 flex justify-center items-center focus:outline-none"
        onClick={signOut}
        title="Logout"
      >
        <FaSignOutAlt />
      </button>
    </div>
  );
}
