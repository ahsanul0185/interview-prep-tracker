import { Badge } from "@/components/ui/Badge";
import { isDueToday, isOverdue } from "@/lib/utils";

// Visual flag for a reminder's due date (PRD 7.7).
export function DueBadge({ dueDate, isDone }: { dueDate: string; isDone?: boolean }) {
  if (isDone) {
    return <Badge variant="neutral">Done</Badge>;
  }

  if (isOverdue(dueDate)) {
    return <Badge variant="danger">Overdue</Badge>;
  }

  if (isDueToday(dueDate)) {
    return <Badge variant="warning">Due today</Badge>;
  }

  return <Badge variant="info">Upcoming</Badge>;
}
