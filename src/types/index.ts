// Domain types per the PRD §9 data model (to implement):
//
//   Profile        — id, user_id, display_name
//   Application    — id, user_id, company, role, stage, date_applied, link, notes
//   InterviewRound — id, application_id, user_id, round_type, date, status, notes
//   DsaTopic       — id, user_id, name, status
//   HrQuestion     — id, user_id, question, answer_notes, state
//   Reminder       — id, user_id, title, due_date, application_id, is_done
//
// Plus union types: ApplicationStage, RoundType, RoundStatus, DsaStatus, HrState
// (values in src/lib/constants.ts).
export {};
