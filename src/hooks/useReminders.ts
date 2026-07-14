"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Reminder } from "@/types";

export type ReminderInput = {
  title: string;
  due_date: string;
  application_id?: string | null;
  is_done?: boolean;
};

// Fetch + mutate reminders (PRD 7.7). Sorted by due_date ascending so the most
// urgent items appear first.
export function useReminders() {
  const supabase = createClient();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("reminders")
        .select("*")
        .order("due_date", { ascending: true });

      if (error) setError(error.message);
      else setReminders((data as Reminder[]) ?? []);
      setLoading(false);
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createReminder = useCallback(
    async (input: ReminderInput) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return { error: "Not signed in" };

      const { data, error } = await supabase
        .from("reminders")
        .insert({ ...input, user_id: user.id })
        .select()
        .single();

      if (error) return { error: error.message };
      setReminders((prev) => insertSorted(prev, data as Reminder));
      return { error: null };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const updateReminder = useCallback(
    async (id: string, input: Partial<ReminderInput>) => {
      const { data, error } = await supabase
        .from("reminders")
        .update(input)
        .eq("id", id)
        .select()
        .single();

      if (error) return { error: error.message };
      setReminders((prev) =>
        prev
          .map((r) => (r.id === id ? (data as Reminder) : r))
          .sort((a, b) => a.due_date.localeCompare(b.due_date))
      );
      return { error: null };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const deleteReminder = useCallback(
    async (id: string) => {
      const { error } = await supabase.from("reminders").delete().eq("id", id);
      if (error) return { error: error.message };
      setReminders((prev) => prev.filter((r) => r.id !== id));
      return { error: null };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    reminders,
    loading,
    error,
    createReminder,
    updateReminder,
    deleteReminder,
  };
}

function insertSorted(prev: Reminder[], reminder: Reminder): Reminder[] {
  const next = [...prev, reminder];
  next.sort((a, b) => a.due_date.localeCompare(b.due_date));
  return next;
}
