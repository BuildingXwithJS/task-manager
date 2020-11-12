import { useEffect, useState } from 'react';
import axios from 'redaxios';
import { Project } from '../project';
import { AddProject } from '../project/add';

export function Sidebar() {
  const [projects, setProjects] = useState([]);

  useEffect(async () => {
    const { data } = await axios.get('/api/project/all');
    console.log(data);
    const { projects: serverProjects } = data;
    setProjects(serverProjects);
  }, []);

  const handleNewProject = (newProject) => {
    const newProjects = projects.concat(newProject);
    setProjects(newProjects);
  };

  return (
    <div className="flex flex-col space-y-2 h-screen bg-gray-900 text-white p-2">
      {projects.map((project) => (
        <Project key={project._id} project={project} />
      ))}

      <AddProject onNewProject={handleNewProject} />
    </div>
  );
}
