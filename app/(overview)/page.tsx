import WalletSessionUI from '@/app/_session/SessionButtons';

import AccountBalance from '../_ui/AccountBalances';

export default function Page() {
  const tokens: [string, string][] = [
    ['eosio.token', 'WAX'],
    ['foundry.tag', 'GUILD'],
  ];
  return (
    <main className='z-10 max-w-5xl items-center justify-between font-mono text-sm text-white'>
      <p className='text-2xl'>NextJS 14 + Wharfkit demo</p>
      <div className='mb-2 mt-2 flex w-full justify-center'>
        <WalletSessionUI />
      </div>

      <AccountBalance tokens={tokens} />
    </main>
  );
}
