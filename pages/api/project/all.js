import { getSession } from 'next-auth/client';
import { Project } from '../../../src/db';

export default async (req, res) => {
  const { user } = await getSession({ req });
  try {
    const projects = await Project.find({ user: user._id }).lean();
    res.status(200).json({ projects });
  } catch (error) {
    res.status(400).json({ error });
  }
};
