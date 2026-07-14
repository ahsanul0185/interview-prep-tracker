"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { DsaStatus, DsaTopic } from "@/types";

export type DsaTopicInput = {
  name: string;
  status: DsaStatus;
};

// Fetch + mutate DSA topics (PRD 7.5).
export function useDsaTopics() {
  const supabase = createClient();
  const [topics, setTopics] = useState<DsaTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("dsa_topics")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) setError(error.message);
      else setTopics((data as DsaTopic[]) ?? []);
      setLoading(false);
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createTopic = useCallback(
    async (input: DsaTopicInput) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return { error: "Not signed in" };

      const { data, error } = await supabase
        .from("dsa_topics")
        .insert({ ...input, user_id: user.id })
        .select()
        .single();

      if (error) return { error: error.message };
      setTopics((prev) => [data as DsaTopic, ...prev]);
      return { error: null };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const updateTopic = useCallback(
    async (id: string, input: Partial<DsaTopicInput>) => {
      const { data, error } = await supabase
        .from("dsa_topics")
        .update(input)
        .eq("id", id)
        .select()
        .single();

      if (error) return { error: error.message };
      setTopics((prev) =>
        prev.map((t) => (t.id === id ? (data as DsaTopic) : t))
      );
      return { error: null };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const deleteTopic = useCallback(
    async (id: string) => {
      const { error } = await supabase.from("dsa_topics").delete().eq("id", id);
      if (error) return { error: error.message };
      setTopics((prev) => prev.filter((t) => t.id !== id));
      return { error: null };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    topics,
    loading,
    error,
    createTopic,
    updateTopic,
    deleteTopic,
  };
}
