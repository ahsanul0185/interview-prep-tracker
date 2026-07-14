import { Badge } from "@/components/ui/Badge";
import { STAGE_VARIANTS } from "@/lib/constants";
import type { ApplicationStage } from "@/types";

// Colored pill for an application's stage (PRD 7.3).
export function StageBadge({ stage }: { stage: ApplicationStage }) {
  return <Badge variant={STAGE_VARIANTS[stage]}>{stage}</Badge>;
}
