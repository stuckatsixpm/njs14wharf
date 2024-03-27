'use client';

import { useWalletContext } from './WalletProvider';

const LoginLogoutButton = () => {
  let { kit, session, setSession } = useWalletContext();

  async function handleLogin() {
    const response = await kit?.login();
    setSession(response?.session);
  }
  async function handleLogout() {
    const response = await kit?.logout();
    setSession(null);
  }

  return session ? (
    <button
      className={`rounded-lg border-2 border-red-800 bg-red-400 px-2 py-1 font-bold text-black`}
      onClick={handleLogout}
    >
      Logout
    </button>
  ) : (
    <button
      className={`rounded-lg border-2 border-green-800 bg-green-400 px-2 py-1 font-bold text-black`}
      onClick={handleLogin}
    >
      Login
    </button>
  );
};

const WalletSessionUI = () => {
  let { session, isLoading } = useWalletContext();

  return !isLoading ? (
    <div className='inline-flex items-center'>
      <p className='mr-2'>
        {session ? session.actor.toString() : 'Not logged in'}
      </p>
      <LoginLogoutButton />
    </div>
  ) : (
    <div className='inline-flex animate-pulse items-center'>
      <p className='mr-2 italic'>Loading</p>
      <button
        className='rounded-lg border-2 border-gray-800 bg-gray-400 px-2 py-2 font-bold text-black'
        disabled
      >
        <div className='h-2 w-12 rounded-lg bg-gray-300'></div>
      </button>
    </div>
  );
};

export default WalletSessionUI;
