import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import React from "react";

function Navbar() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const navigation = [
    { title: "Descubrir", path: "/descubrir" },
    { title: "Aleatorio", path: "/aleatorio" },
  ];

  return (
    <header>
      <nav className="items-center pt-5 sm:flex sm:space-x-6">
        <Link className="text-indigo-500 text-2xl font-extrabold" href="/">
          SinAutores
        </Link>
        <ul className="py-4 flex-1 items-center flex space-x-3 sm:space-x-6 sm:justify-end">
          {user && (
            <>
              <li
                className="text-gray-200 hover:text-[#E114E5] cursor-pointer"
                onClick={() => supabaseClient.auth.signOut()}
              >
                <p>Salir</p>
              </li>
              <li className="text-gray-200 hover:text-[#E114E5] cursor-pointer">
                <Link href="/vote">Votar</Link>
              </li>
            </>
          )}
          {navigation.map((item, idx) => (
            <li className="text-gray-200 hover:text-[#E114E5]" key={idx}>
              <Link href={item.path}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
