// pages/index.tsx

import { useState } from 'react';
import Link from 'next/link';

const Home = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h1>Welcome to Dominoes Game</h1>
      <div>
        <button>
          <Link href="/signup">Sign Up</Link>
        </button>
        <button>
          <Link href="/login">Login</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
