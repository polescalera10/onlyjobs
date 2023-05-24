import Hero from "@/components/Hero";
import List from "@/components/List";
import { supabase } from "@/libs/supabase";
import Head from "next/head";

const Home = ({ jobs, error }) => {
  return (
    <>
      <Head>
        <title>Onlyjobs.com</title>
      </Head>
      <Hero />
      <List jobs={jobs} />
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const { data: jobs, error } = await supabase.from("jobs").select("*");

  return {
    props: {
      jobs,
      error,
    },
  };
}
