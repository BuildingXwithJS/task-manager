import Head from 'next/head';
import { useRef } from 'react';
import axios from 'redaxios';

export default function Register() {
  const emailRef = useRef();
  const passRef = useRef();

  const doRegister = async () => {
    const data = {
      email: emailRef.current.value,
      password: passRef.current.value,
    };

    const result = await axios.post('/api/register', data);
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
