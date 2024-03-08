"use client";
import { useContext, ReactNode } from "react";
import { WalletContext } from "./WalletProvider";

export function LoginButton({ children }: { children: ReactNode }) {
  let { kit, session, setSession } = useContext(WalletContext);
  async function handleLogin() {
    const response = await kit?.login();
    setSession(response?.session);
  }

  return (
    <button className="rounded-lg bg-green-700 px-3 py-2" onClick={handleLogin}>
      {children}
    </button>
  );
}
export function LogoutButton({ children }: { children: ReactNode }) {
  let { kit, session, setSession } = useContext(WalletContext);
  async function handleLogout() {
    const response = await kit?.logout();
    setSession(null);
  }

  return (
    <button
      className="rounded-lg bg-green-700 px-3 py-2"
      onClick={handleLogout}
    >
      {children}
    </button>
  );
}
