"use client";
import { LoginButton, LogoutButton } from "../_session/SessionButtons";
import Link from "next/link";
import { useContext } from "react";
import { WalletContext } from "../_session/WalletProvider";
import WalletName from "@/app/WalletName";
export default function Page() {
  let { kit, session, setSession } = useContext(WalletContext);
  return (
    <main className="flex  min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
      <p className="text-2xl">Page 2</p>
        <WalletName />
        <div>
          <LoginButton>Login</LoginButton>
          <LogoutButton>Logout</LogoutButton>
        </div>
        <Link href="/">CLICK ME</Link>
      </div>
    </main>
  );
}
