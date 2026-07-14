"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

export function UserMenu({
  email,
  showEmail = true,
}: {
  email: string;
  showEmail?: boolean;
}) {
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
    <div className="flex items-center gap-2">
      {showEmail && (
        <span className="min-w-0 flex-1 truncate text-sm text-gray-500">
          {email}
        </span>
      )}
      <Button
        variant="secondary"
        size="sm"
        onClick={handleLogout}
        disabled={loading}
        className="shrink-0"
      >
        {loading ? "…" : "Log out"}
      </Button>
    </div>
  );
}
