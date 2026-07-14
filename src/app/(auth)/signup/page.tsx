import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">Create your account</h1>
      <p className="mt-1 mb-6 text-sm text-gray-500">
        Your own private prep space (PRD §7.1).
      </p>
      <SignupForm />
    </div>
  );
}
