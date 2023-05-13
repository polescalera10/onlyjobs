import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import Script from "next/script";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  // const [supabaseClient] = useState(() =>
  //   createBrowserSupabaseClient({
  //     supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
  //     supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  //   })
  // );
  return (
    <>
      {/* <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script id="GTAG" strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `}
      </Script>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      > */}
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      {/* </SessionContextProvider> */}
    </>
  );
}
