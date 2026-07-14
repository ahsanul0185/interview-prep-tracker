// Fixed value sets from the PRD, as const arrays + derived union types.
// These mirror the CHECK constraints in supabase/schema.sql — keep them in sync.

// PRD 7.3 — application stages
export const APPLICATION_STAGES = [
  "Wishlist",
  "Applied",
  "Online Assessment",
  "Interview",
  "Offer",
  "Rejected",
] as const;
export type ApplicationStage = (typeof APPLICATION_STAGES)[number];

// PRD 7.4 — interview round types (suggested set; free text allowed by schema)
export const ROUND_TYPES = [
  "Phone Screen",
  "Technical",
  "HR",
  "System Design",
  "Behavioral",
  "Final",
] as const;
export type RoundType = (typeof ROUND_TYPES)[number];

// PRD 7.4 — interview round statuses
export const ROUND_STATUSES = ["Scheduled", "Cleared", "Failed"] as const;
export type RoundStatus = (typeof ROUND_STATUSES)[number];

// PRD 7.5 — DSA topic statuses
export const DSA_STATUSES = ["Not Started", "In Progress", "Confident"] as const;
export type DsaStatus = (typeof DSA_STATUSES)[number];

// PRD 7.6 — HR question states
export const HR_STATES = ["Prepared", "Needs Work"] as const;
export type HrState = (typeof HR_STATES)[number];

// Badge variant per status — single source of truth for badge colors.
// Must match the variants supported by components/ui/Badge.tsx.
type BadgeVariant =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

export const STAGE_VARIANTS: Record<ApplicationStage, BadgeVariant> = {
  Wishlist: "neutral",
  Applied: "info",
  "Online Assessment": "warning",
  Interview: "primary",
  Offer: "success",
  Rejected: "danger",
};

export const ROUND_STATUS_VARIANTS: Record<RoundStatus, BadgeVariant> = {
  Scheduled: "info",
  Cleared: "success",
  Failed: "danger",
};

export const DSA_STATUS_VARIANTS: Record<DsaStatus, BadgeVariant> = {
  "Not Started": "neutral",
  "In Progress": "warning",
  Confident: "success",
};

export const HR_STATE_VARIANTS: Record<HrState, BadgeVariant> = {
  Prepared: "success",
  "Needs Work": "warning",
};
