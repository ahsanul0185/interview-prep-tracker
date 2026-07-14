"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Application, ApplicationStage } from "@/types";

export type ApplicationInput = {
  company: string;
  role: string;
  stage: ApplicationStage;
  date_applied?: string | null;
  link?: string | null;
  notes?: string | null;
};

// Fetch + mutate the current user's applications (PRD 7.3). RLS scopes every
// query to the signed-in user; inserts must set user_id explicitly.
export function useApplications() {
  const supabase = createClient();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) setError(error.message);
    else setApplications((data as Application[]) ?? []);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const createApplication = useCallback(
    async (input: ApplicationInput) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return { error: "Not signed in" };

      const { data, error } = await supabase
        .from("applications")
        .insert({ ...input, user_id: user.id })
        .select()
        .single();

      if (error) return { error: error.message };
      setApplications((prev) => [data as Application, ...prev]);
      return { error: null };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const updateApplication = useCallback(
    async (id: string, input: Partial<ApplicationInput>) => {
      const { data, error } = await supabase
        .from("applications")
        .update(input)
        .eq("id", id)
        .select()
        .single();

      if (error) return { error: error.message };
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? (data as Application) : a))
      );
      return { error: null };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const deleteApplication = useCallback(
    async (id: string) => {
      const { error } = await supabase.from("applications").delete().eq("id", id);
      if (error) return { error: error.message };
      setApplications((prev) => prev.filter((a) => a.id !== id));
      return { error: null };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    applications,
    loading,
    error,
    refetch: fetchApplications,
    createApplication,
    updateApplication,
    deleteApplication,
  };
}
