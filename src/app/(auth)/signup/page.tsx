import { SignupForm } from "@/components/auth/SignupForm";
import { Card } from "@/components/ui/Card";

export default function SignupPage() {
  return (
    <Card className="w-full max-w-sm p-6">
      <h1 className="text-2xl font-semibold">Create your account</h1>
      <p className="mt-1 mb-6 text-sm text-gray-500">
        Start tracking your job search today.
      </p>
      <SignupForm />
    </Card>
  );
}
