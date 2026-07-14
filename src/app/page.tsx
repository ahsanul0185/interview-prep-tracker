import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Entry point — send users where they belong (PRD 7.1).
export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  redirect(user ? "/dashboard" : "/login");
}
