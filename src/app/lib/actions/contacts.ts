"use server";

import { createClient } from "../supabase/server";

export const searchUsersByQuery = async (query: string) => {
  if (!query || query.length < 2) {
    return [];
  }

  const supabase = await createClient();

  const { data: users, error } = await supabase.rpc("search_users", {
    limit_count: 20,
    search_query: query,
  });
  if (error) {
    console.error("Error searching users:", error);
    return [];
  }

  return users || [];
};
