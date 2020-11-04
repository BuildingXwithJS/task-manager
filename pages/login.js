import { csrfToken } from 'next-auth/client';
import Head from 'next/head';

export default function Login({ csrfToken }) {
  return (
    <div className="">
      <Head>
        <title>Task Manager - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-2">
        <h1 className="font-bold">Login!</h1>

        <form method="post" action="/api/auth/callback/credentials">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label>
            Email
            <input name="email" type="text" />
          </label>
          <label>
            Password
            <input name="password" type="text" />
          </label>
          <button type="submit">Sign in</button>
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
