'use client';

import { Session, SessionKit } from '@wharfkit/session';
import { WalletPluginAnchor } from '@wharfkit/wallet-plugin-anchor';
import { WalletPluginCloudWallet } from '@wharfkit/wallet-plugin-cloudwallet';
import { WalletPluginWombat } from '@wharfkit/wallet-plugin-wombat';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

export type WalletInformation = {
  kit: SessionKit | null;
  session: Session | null;
  setSession: Function;
  isLoading: boolean;
};

export const WalletContext = createContext<WalletInformation>({
  kit: null,
  session: null,
  setSession: () => {},
  isLoading: false,
});

export default function WalletProvider({ children }: { children: ReactNode }) {
  const [kit, setKit] = useState<SessionKit | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadWharf = async () => {
      const { WebRenderer } = await import('@wharfkit/web-renderer');
      const sessionKit = new SessionKit({
        appName: 'NextJS 14 + Wharfkit Demo',
        chains: [
          {
            id: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
            url: 'https://wax.greymass.com',
          },
        ],
        ui: new WebRenderer(),
        walletPlugins: [
          new WalletPluginCloudWallet(),
          new WalletPluginAnchor(),
          new WalletPluginWombat(),
        ],
      });

      const restored = await sessionKit.restore();
      setKit(sessionKit);
      setIsLoading(false);
      setSession(restored ?? null);
    };
    loadWharf();
  }, []);

  const value: WalletInformation = {
    kit: kit,
    session: session,
    setSession: setSession,
    isLoading: isLoading,
  };
  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export const useWalletContext = () => {
  return useContext(WalletContext);
};
