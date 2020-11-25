import { Project, Task } from './db';

export const getUserProjects = async (user) => {
  const projects = await Project.find({ user: user._id }).lean();
  return projects;
};

export const getProjectTasks = async (project) => {
  const tasks = await Task.find({ project }).lean();
  return tasks;
};
