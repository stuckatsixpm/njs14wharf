'use client';

//Use client to access context
import { WalletContext } from '@/app/_session/WalletProvider';
import { useContext, useEffect, useState } from 'react';

const LightAPIFunc = (
  chain: string,
  account: string,
  contract: string,
  token: string,
) =>
  `https://wax.light-api.net/api/tokenbalance/${chain}/${account}/${contract}/${token}`;

interface AccountBalanceProps {
  tokens: [string, string][];
}

interface TokenBalance {
  contract: string;
  symbol: string;
  balance: string;
}

const GetBalance = async (
  account: string,
  contract: string,
  symbol: string,
): Promise<TokenBalance> => {
  let resp = await fetch(LightAPIFunc('wax', account, contract, symbol), {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
    cache: 'reload',
  });
  let balance = await resp.text();
  return { contract: contract, symbol: symbol, balance: balance };
};

const AccountBalance = ({ tokens }: AccountBalanceProps) => {
  let { kit, session, setSession, isLoading } = useContext(WalletContext);
  let [balances, setBalances] = useState<TokenBalance[]>([]);
  let [isLoaded, setIsLoaded] = useState<boolean>(false);
  useEffect(() => {
    const getBalances = async () => {
      if (!session) return;
      let account = session.actor.toString();

      let responses = tokens.map(([contract, symbol]) => {
        return GetBalance(account, contract, symbol);
      });
      await Promise.all(responses)
        .then((newBalances: TokenBalance[]) => setBalances(newBalances))
        .finally(() => setIsLoaded(true));

      for (let token of tokens) {
        let [contract, symbol] = token;
        let result = await fetch(
          LightAPIFunc('wax', account, contract, symbol),
          {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
            cache: 'reload',
          },
        );
      }
    };
    if (session && !balances.length) {
      console.log('fetching');
      getBalances();
    }
  }, [session]);

  if (!session) {
    return (
      <div className='rounded-lg border-2 border-white bg-slate-950 px-6 py-3 text-center text-white'>
        <p>Log in to see balances</p>
      </div>
    );
  }
  return (
    <div className='rounded-lg border-2 border-white bg-slate-950 px-6 py-3 text-center text-white'>
      {isLoaded ? (
        <div className='flex w-full flex-col items-center'>
          <p className='text-lg'>Token Balances</p>
          <table>
            <tbody>
              <tr>
                <th className='border px-2 text-left'>Contract</th>
                <th className='border px-2 text-left'>Token</th>
                <th className='border px-2 text-left'>Balance</th>
              </tr>
              {balances.map((t: TokenBalance) => (
                <tr key={t.symbol + '@' + t.contract}>
                  <td className='border px-2 text-left'>{t.contract}</td>
                  <td className='border px-2 text-left'>{t.symbol}</td>
                  <td className='border px-2 text-left'>{t.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading balances</p>
      )}
    </div>
  );
};

export default AccountBalance;
