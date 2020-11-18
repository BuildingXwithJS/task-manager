import { useState } from 'react';
import { Project } from '../project';
import { AddProject } from '../project/add';

export function Sidebar({ initialProjects = [], currentProject }) {
  const [projects, setProjects] = useState(initialProjects);

  const handleNewProject = (newProject) => {
    const newProjects = projects.concat(newProject);
    setProjects(newProjects);
  };

  return (
    <div className="flex flex-col space-y-2 h-screen bg-gray-900 text-white p-2">
      {projects.map((project) => (
        <Project
          key={project._id}
          project={project}
          isCurrent={project._id === currentProject?._id}
        />
      ))}

      <AddProject onNewProject={handleNewProject} />
    </div>
  );
}
