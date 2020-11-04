import Head from 'next/head';

export default function Login() {
  return (
    <div className="">
      <Head>
        <title>Task Manager - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-2">
        <h1 className="font-bold">Login!</h1>
      </main>
    </div>
  );
}
