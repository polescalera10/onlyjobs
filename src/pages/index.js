import Hero from "@/components/Hero";
import List from "@/components/List";
import { supabase } from "@/libs/supabase/supabase";
import Head from "next/head";

const Home = ({ jobs, error }) => {
  return (
    <>
      <Head>
        <title>Onlyjobs.com</title>
      </Head>
      <Hero />
      <List jobs={jobs} />
      {error && (
        <div>Parece que hay un error, por favor vuelva en un rato.</div>
      )}
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const { data: jobs, error } = await supabase
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  return {
    props: {
      jobs,
      error,
    },
  };
}
