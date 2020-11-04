import { User } from '../../src/db';

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    res.status(200).json({ user: user.toObject() });
  } catch (error) {
    res.status(400).json({ error });
  }
};
