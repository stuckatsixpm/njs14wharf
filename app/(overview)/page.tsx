import Image from "next/image";
import NameComponent from "../WalletName";
import Link from "next/link";
import { LoginButton, LogoutButton } from "../_session/SessionButtons";
import { useContext } from "react";
import { WalletContext } from "../_session/WalletProvider";
export default function Page() {
  return (
    <main className="flex  min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl items-center justify-between font-mono text-sm">
        <p className="text-2xl">Page 1</p>
        <NameComponent />
        <div className="mt-2">
          <LoginButton>Login</LoginButton>
          <LogoutButton>Logout</LogoutButton>
        </div>
        <button className="px-2 py-1 border border-white rounded-lg my-2">
          <Link href="/testroute">Go to a different page</Link>
        </button>
      </div>
    </main>
  );
}
