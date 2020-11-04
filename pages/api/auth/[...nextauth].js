import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { User } from '../../../src/db';

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'your@email.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const existingUser = await User.findOne({ email: credentials.email });

        // FIXME: encrypt password and compare encrypted versions
        if (existingUser.password === credentials.password) {
          return existingUser.toObject();
        }

        return null;
      },
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
};

export default (req, res) => NextAuth(req, res, options);
