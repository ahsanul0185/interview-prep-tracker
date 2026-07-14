import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">Log in</h1>
      <p className="mt-1 mb-6 text-sm text-gray-500">
        Welcome back to Interview Prep Tracker.
      </p>
      <LoginForm />
    </div>
  );
}
