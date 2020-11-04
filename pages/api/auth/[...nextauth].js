import { verify } from 'argon2';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { serverRuntimeConfig } from '../../../next.config';
import { User } from '../../../src/db';

const options = {
  pages: {
    signIn: '/login',
    signOut: '/register',
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
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
        if (await verify(existingUser.password, credentials.password)) {
          return existingUser.toObject();
        }
        return null;
      },
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  database: serverRuntimeConfig.databaseUrl,
};

export default (req, res) => NextAuth(req, res, options);
