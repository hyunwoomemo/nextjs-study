"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const NavItem = ({ mobile }: { mobile?: boolean }) => {
  const { data: session, status } = useSession();

  return (
    <ul className={`text-md justify-center flex gap-4 w-full items-center ${mobile && "flex-col h-full"}`}>
      <li className="py-2 text-center border-b-4 cursor-pointer">
        <Link href="/admin">Admin</Link>
      </li>
      <li className="py-2 text-center border-b-4 cursor-pointer">
        <Link href="/user">User</Link>
      </li>
      {session?.user ? (
        <li className="py-2 text-center border-b-4 cursor-pointer">
          <button onClick={() => signOut()}>Signout</button>
        </li>
      ) : (
        <li className="hover:text-red-500 py-2 text-center border-b-4 cursor-auto">
          <button onClick={() => signIn()}>Signin</button>
        </li>
      )}
    </ul>
  );
};

export default NavItem;
