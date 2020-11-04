import Head from 'next/head';
import { useRef } from 'react';

export default function Register() {
  const emailRef = useRef();
  const passRef = useRef();

  const doRegister = async () => {
    const body = {
      email: emailRef.current.value,
      password: passRef.current.value,
    };

    const result = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((r) => r.json());
    console.log(result);
  };

  return (
    <div className="">
      <Head>
        <title>Task Manager - Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-2">
        <h1 className="font-bold">Register!</h1>

        <div>
          <input type="text" placeholder="Email" ref={emailRef} />
        </div>
        <div>
          <input type="password" placeholder="Password" ref={passRef} />
        </div>

        <button onClick={doRegister}>Register</button>
      </main>
    </div>
  );
}
