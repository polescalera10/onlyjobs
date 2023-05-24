import { supabase } from "@/libs/supabase";
import React from "react";

function JobPost({ job, error }) {
  return <div>JobPost</div>;
}

export default JobPost;

export async function getServerSideProps(context) {
  const slug = context.query.id;
  const [, , id] = slug.split("-");

  const { data: job, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id);

  return {
    props: {
      job,
      error,
    },
  };
}
