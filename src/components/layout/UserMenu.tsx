"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

export function UserMenu({ email }: { email: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    // Refresh so proxy sees the cleared session, then send to login.
    router.refresh();
    router.push("/login");
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden max-w-40 truncate text-sm text-gray-500 sm:inline">
        {email}
      </span>
      <Button variant="secondary" onClick={handleLogout} disabled={loading}>
        {loading ? "…" : "Log out"}
      </Button>
    </div>
  );
}
