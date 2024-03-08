"use client"; //Use client to access context
import { useContext } from "react";
import { WalletContext } from "@/app/_session/WalletProvider";
export default function NameComponent() {
  let { kit, session, setSession } = useContext(WalletContext);
  return (
    <div className="rounded-lg border-2 border-white bg-blue-900 text-center text-white">
      <p>{session ? session.actor.toString() : "Not logged in"}</p>
    </div>
  );
}
