"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { HrQuestion, HrState } from "@/types";

export type HrQuestionInput = {
  question: string;
  answer_notes?: string | null;
  state: HrState;
};

// Fetch + mutate HR questions (PRD 7.6).
export function useHrQuestions() {
  const supabase = createClient();
  const [questions, setQuestions] = useState<HrQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("hr_questions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) setError(error.message);
      else setQuestions((data as HrQuestion[]) ?? []);
      setLoading(false);
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createQuestion = useCallback(
    async (input: HrQuestionInput) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return { error: "Not signed in" };

      const { data, error } = await supabase
        .from("hr_questions")
        .insert({ ...input, user_id: user.id })
        .select()
        .single();

      if (error) return { error: error.message };
      setQuestions((prev) => [data as HrQuestion, ...prev]);
      return { error: null };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const updateQuestion = useCallback(
    async (id: string, input: Partial<HrQuestionInput>) => {
      const { data, error } = await supabase
        .from("hr_questions")
        .update(input)
        .eq("id", id)
        .select()
        .single();

      if (error) return { error: error.message };
      setQuestions((prev) =>
        prev.map((q) => (q.id === id ? (data as HrQuestion) : q))
      );
      return { error: null };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const deleteQuestion = useCallback(
    async (id: string) => {
      const { error } = await supabase.from("hr_questions").delete().eq("id", id);
      if (error) return { error: error.message };
      setQuestions((prev) => prev.filter((q) => q.id !== id));
      return { error: null };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    questions,
    loading,
    error,
    createQuestion,
    updateQuestion,
    deleteQuestion,
  };
}
