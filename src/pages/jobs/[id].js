import { supabase } from "@/libs/supabase";
import moment from "moment/moment";
import "moment/locale/es";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { translate } from "@/utils/translateTypeJob";

function JobPost({ job, error }) {
  const router = useRouter();
  moment.locale("es");
  const { created_at, location, position, description, salary, remote, type } =
    job;

  if (error) return router.push("/");
  return (
    <>
      <Head>
        <title>{`${job.position} ${location || (remote && "REMOTE")}`}</title>
      </Head>
      <div className="flex flex-col gap-y-2 border-b-blue-600 border-b-2 border-dotted py-12">
        <h1 className="text-5xl">{position}</h1>
        <h2 className="text-2xl">{location || (remote && "REMOTE")}</h2>
        <div className="flex justify-between gap-5 text-xl">
          <div className="flex gap-4">
            <p>{translate(type)}</p>
            <p>{salary}$</p>
          </div>

          <p>{moment(new Date(created_at)).fromNow()}</p>
        </div>
      </div>
      <div className="flex py-12">
        <div className="flex-1">{description}</div>
        <div>
          <button className="py-4 px-6  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
            Me interesa este trabajo
          </button>
        </div>
      </div>

      {/* <div>
        <button className="py-4 px-6  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
          Aplicar para este trabajo
        </button>
      </div> */}
    </>
  );
}

export default JobPost;

export async function getServerSideProps(context) {
  const slug = context.query.id;
  const [, , id] = slug.split("-");

  const { data, error } = await supabase.from("jobs").select("*").eq("id", id);

  const job = data[0];

  return {
    props: {
      job,
      error,
    },
  };
}
