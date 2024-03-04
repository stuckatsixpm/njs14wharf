'use client'; //Use client to access context
import { useContext } from "react";
import { WalletContext } from "@/app/_session/WalletProvider";
export default function SComp(){
    
    let {kit, session, setSession} = useContext(WalletContext);
    return (
        <div>
        <p>{session ? (session.actor.toString()) : ("Not logged in")}</p>
        </div>
    )
}