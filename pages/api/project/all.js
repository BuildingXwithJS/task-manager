import { getSession } from 'next-auth/client';
import { Project } from '../../../src/db';

export const getUserProjects = async (context) => {
  const { user } = await getSession(context);
  const projects = await Project.find({ user: user._id }).lean();
  return projects;
};

export default async (req, res) => {
  try {
    const projects = await getUserProjects({ req });
    res.status(200).json({ projects });
  } catch (error) {
    res.status(400).json({ error });
  }
};
