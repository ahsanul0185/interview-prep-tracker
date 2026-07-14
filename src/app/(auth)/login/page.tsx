import { LoginForm } from "@/components/auth/LoginForm";
import { Card } from "@/components/ui/Card";

export default function LoginPage() {
  return (
    <Card className="w-full max-w-sm p-6">
      <h1 className="text-2xl font-semibold">Log in</h1>
      <p className="mt-1 mb-6 text-sm text-gray-500">
        Welcome back to Interview Prep Tracker.
      </p>
      <LoginForm />
    </Card>
  );
}
