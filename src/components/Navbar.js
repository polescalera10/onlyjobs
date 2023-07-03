import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import React from "react";
import Button from "./Button";

function Navbar() {
  return (
    <header>
      <nav className="items-center pt-5 flex justify-between">
        <Link className="text-blue-600 text-2xl font-extrabold" href="/">
          OnlyJobs
        </Link>
        <div className="py-4 items-center flex space-x-3 sm:space-x-6">
          <Link href="/publicar-un-trabajo">
            <Button>Publicar un trabajo</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
