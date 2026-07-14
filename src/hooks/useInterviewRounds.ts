"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { InterviewRound, RoundStatus } from "@/types";

export type RoundInput = {
  round_type: string;
  date?: string | null;
  status: RoundStatus;
  notes?: string | null;
};

// Fetch + mutate interview rounds for a single application (PRD 7.4).
export function useInterviewRounds(applicationId: string) {
  const supabase = createClient();
  const [rounds, setRounds] = useState<InterviewRound[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("interview_rounds")
        .select("*")
        .eq("application_id", applicationId)
        .order("created_at", { ascending: true });

      if (error) setError(error.message);
      else setRounds((data as InterviewRound[]) ?? []);
      setLoading(false);
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationId]);

  const createRound = useCallback(
    async (input: RoundInput) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return { error: "Not signed in" };

      const { data, error } = await supabase
        .from("interview_rounds")
        .insert({ ...input, application_id: applicationId, user_id: user.id })
        .select()
        .single();

      if (error) return { error: error.message };
      setRounds((prev) => [...prev, data as InterviewRound]);
      return { error: null };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [applicationId]
  );

  const updateRound = useCallback(
    async (id: string, input: Partial<RoundInput>) => {
      const { data, error } = await supabase
        .from("interview_rounds")
        .update(input)
        .eq("id", id)
        .select()
        .single();

      if (error) return { error: error.message };
      setRounds((prev) =>
        prev.map((r) => (r.id === id ? (data as InterviewRound) : r))
      );
      return { error: null };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const deleteRound = useCallback(
    async (id: string) => {
      const { error } = await supabase.from("interview_rounds").delete().eq("id", id);
      if (error) return { error: error.message };
      setRounds((prev) => prev.filter((r) => r.id !== id));
      return { error: null };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    rounds,
    loading,
    error,
    createRound,
    updateRound,
    deleteRound,
  };
}
