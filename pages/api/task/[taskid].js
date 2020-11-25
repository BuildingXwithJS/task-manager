import { getSession } from 'next-auth/client';
import { Task } from '../../../src/db';

export default async (req, res) => {
  try {
    const { user } = await getSession({ req });
    if (!user) {
      throw new Error('Not logged in!');
    }

    const { _id, project, user: taskUser, ...newData } = req.body;
    const tasks = await Task.findByIdAndUpdate(req.query.taskid, newData, {
      new: true,
    });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(400).json({ error });
  }
};
