import { supabase } from "./supabase";

export const addToSupabase = async (job) => {
  const { data, error } = await supabase.from("jobs").insert([job]).select();
  return { data, error };
};
