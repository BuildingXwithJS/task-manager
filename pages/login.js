import { csrfToken } from 'next-auth/client';
import Head from 'next/head';
import Link from 'next/link';

export default function Login({ csrfToken }) {
  return (
    <div className="bg-coolGray-100 w-full h-full">
      <Head>
        <title>Task Manager - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-coolGray-600 mb-2 text-2xl font-bold">
          Task Manager: Login
        </h1>

        <form
          method="post"
          action="/api/auth/callback/credentials"
          className="bg-white p-4 shadow sm:rounded-md sm:overflow-hidden"
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

          <div className="w-64 mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-coolGray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              autoComplete="email"
              className="my-1 p-1 block w-full border border-coolGray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="w-64 mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-coolGray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="my-1 p-1 block w-full border border-coolGray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex w-full items-center justify-between">
            <Link href="/register">
              <a className="text-sm text-coolGray-600">Register</a>
            </Link>

            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

Login.getInitialProps = async (context) => {
  return {
    csrfToken: await csrfToken(context),
  };
};
