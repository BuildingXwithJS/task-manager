import { getSession } from 'next-auth/client';
import { Project } from '../../../src/db';

export default async (req, res) => {
  const { name } = req.body;
  const { user } = await getSession({ req });
  try {
    const project = new Project({ name, user: user._id });
    await project.save();
    res.status(200).json({ project: project.toObject() });
  } catch (error) {
    res.status(400).json({ error });
  }
};
