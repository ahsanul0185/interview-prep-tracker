"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Application } from "@/types";

// Fetch a single application by ID for the detail page (PRD 7.3).
// Returns loading/error states and a refetch helper.
export function useApplication(id: string) {
  const supabase = createClient();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchApplication() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("id", id)
        .single();

      if (error) setError(error.message);
      else setApplication(data as Application);
      setLoading(false);
    }

    fetchApplication();
  }, [id, supabase]);

  return { application, loading, error };
}
