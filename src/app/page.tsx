// TODO (PRD 7.1): redirect signed-in users to /dashboard, everyone else to /login.
export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
      <h1 className="text-3xl font-bold">Interview Prep Tracker</h1>
      <p className="text-gray-500">
        Project setup complete — auth pages live in (auth), app pages in (dashboard).
      </p>
    </main>
  );
}
