"use client";
import {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import { SessionKit, Session } from "@wharfkit/session";

import { WalletPluginAnchor } from "@wharfkit/wallet-plugin-anchor";
import { WalletPluginCloudWallet } from "@wharfkit/wallet-plugin-cloudwallet";
import { WalletPluginWombat } from "@wharfkit/wallet-plugin-wombat";

export type WalletInformation = {
  kit: SessionKit | null;
  session: Session | null;
  setSession: Function;
};

export const WalletContext = createContext<WalletInformation>({
  kit: null,
  session: null,
  setSession: () => {},
});

export default function WalletProvider({ children }: { children: ReactNode }) {
  const [kit, setKit] = useState<SessionKit | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    const loadWharf = async () => {
      const { WebRenderer } = await import("@wharfkit/web-renderer");
      const sessionKit = new SessionKit({
        appName: "njs14wharf",
        chains: [
          {
            id: "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
            url: "https://wax.greymass.com",
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
      setSession(restored ?? null);
    };
    loadWharf();
  }, []);

  const value: WalletInformation = {
    kit: kit,
    session: session,
    setSession: setSession,
  };
  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export const useWalletContext = () => {
  return useContext(WalletContext);
};
