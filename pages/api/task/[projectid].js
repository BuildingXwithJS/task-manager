import { getSession } from 'next-auth/client';
import { Task } from '../../../src/db';

export const getProjectTasks = async (project) => {
  const tasks = await Task.find({ project }).lean();
  return tasks;
};

export default async (req, res) => {
  try {
    const { user } = await getSession({ req });
    if (!user) {
      throw new Error('Not logged in!');
    }
    const tasks = await getProjectTasks(req.params.projectid);
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(400).json({ error });
  }
};
