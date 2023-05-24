import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import React from "react";

function Navbar() {
  // const supabaseClient = useSupabaseClient();
  // const user = useUser();
  const navigation = [
    { title: "Descubrir", path: "/descubrir" },
    { title: "Aleatorio", path: "/aleatorio" },
  ];

  return (
    <header>
      <nav className="items-center pt-5 flex justify-between">
        <Link className="text-blue-600 text-2xl font-extrabold" href="/">
          OnlyJobs
        </Link>
        <ul className="py-4 items-center flex space-x-3 sm:space-x-6">
          {/* {user && (
            <>
              <li
                className="text-black hover:text-blue-500 cursor-pointer"
                onClick={() => supabaseClient.auth.signOut()}
              >
                <p>Salir</p>
              </li>
              <li className="text-black hover:text-blue-500 cursor-pointer">
                <Link href="/vote">Votar</Link>
              </li>
            </>
          )} */}
          {/* {navigation.map((item, idx) => (
            <li className="text-black hover:text-blue-500" key={idx}>
              <Link href={item.path}>{item.title}</Link>
            </li>
          ))} */}
          <button
            type="button"
            className="py-4 px-6  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
          >
            Publicar un trabajo
          </button>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
