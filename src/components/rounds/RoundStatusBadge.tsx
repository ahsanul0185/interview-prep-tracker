import { Badge } from "@/components/ui/Badge";
import { ROUND_STATUS_VARIANTS } from "@/lib/constants";
import type { RoundStatus } from "@/types";

// Colored pill for an interview round's status (PRD 7.4).
export function RoundStatusBadge({ status }: { status: RoundStatus }) {
  return <Badge variant={ROUND_STATUS_VARIANTS[status]}>{status}</Badge>;
}
