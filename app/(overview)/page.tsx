import Image from "next/image";
import SComp from "../WalletName";
import Link from "next/link";
import { LoginButton, LogoutButton } from "../_session/SessionButtons";
import { useContext } from "react";
import { WalletContext } from "../_session/WalletProvider";
export default function Home() {
  return (
    <main className="flex  min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <p className="text-2xl">Page 1</p>
        <SComp />
        <div >
          <LoginButton>Login</LoginButton>
          <LogoutButton>Logout</LogoutButton>
        </div>
        <Link href="/testroute">CLICK ME</Link>
      </div>
    </main>
  );
}
