import { login } from "@/actions";
import LoginForm from "@/components/forms/LoginForm";

export default async function Page() {
  return (
    <main className="grid h-screen w-screen place-items-center overflow-hidden bg-gray-100">
      <div className="flex w-full max-w-md flex-col gap-8 rounded-lg bg-white px-8 py-9 shadow">
        <h1 className="text-center text-lg font-semibold">
          Welcome To Dashboard
        </h1>

        {/* Login Form */}
        <LoginForm loginAction={login} />
      </div>
    </main>
  );
}
