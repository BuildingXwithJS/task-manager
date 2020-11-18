import { getSession } from 'next-auth/client';
import { Task } from '../../../src/db';

export default async (req, res) => {
  const { name, project } = req.body;
  const { user } = await getSession({ req });
  try {
    const task = new Task({ name, project, user: user._id });
    await task.save();
    res.status(200).json({ task: task.toObject() });
  } catch (error) {
    res.status(400).json({ error });
  }
};
