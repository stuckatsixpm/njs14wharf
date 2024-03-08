import { LoginButton, LogoutButton } from "../_session/SessionButtons";
import Link from "next/link";
import NameComponent from "@/app/WalletName";
export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl items-center justify-between font-mono text-sm">
        <p className="text-2xl">Page 2</p>
        <NameComponent />
        <div className="mt-2">
          <LoginButton>Login</LoginButton>
          <LogoutButton>Logout</LogoutButton>
        </div>
        <button className="my-2 rounded-lg border border-white px-2 py-1">
          <Link href="/">Go to a different page</Link>
        </button>
      </div>
    </main>
  );
}
