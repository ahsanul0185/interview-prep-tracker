// Domain types per the PRD §9 data model. Field names match the Supabase
// columns (snake_case) so rows can be used directly without mapping.
import type {
  ApplicationStage,
  DsaStatus,
  HrState,
  RoundStatus,
} from "@/lib/constants";

export type {
  ApplicationStage,
  DsaStatus,
  HrState,
  RoundStatus,
  RoundType,
} from "@/lib/constants";

export type Profile = {
  id: string;
  user_id: string;
  display_name: string | null;
  created_at: string;
};

export type Application = {
  id: string;
  user_id: string;
  company: string;
  role: string;
  stage: ApplicationStage;
  date_applied: string | null;
  link: string | null;
  notes: string | null;
  created_at: string;
};

export type InterviewRound = {
  id: string;
  user_id: string;
  application_id: string;
  round_type: string;
  date: string | null;
  status: RoundStatus;
  notes: string | null;
  created_at: string;
};

export type DsaTopic = {
  id: string;
  user_id: string;
  name: string;
  status: DsaStatus;
  created_at: string;
};

export type HrQuestion = {
  id: string;
  user_id: string;
  question: string;
  answer_notes: string | null;
  state: HrState;
  created_at: string;
};

export type Reminder = {
  id: string;
  user_id: string;
  title: string;
  due_date: string;
  application_id: string | null;
  is_done: boolean;
  created_at: string;
};
