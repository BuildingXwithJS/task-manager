import { hash } from 'argon2';
import { User } from '../../src/db';

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await hash(password);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(200).json({ user: user.toObject() });
  } catch (error) {
    res.status(400).json({ error });
  }
};
