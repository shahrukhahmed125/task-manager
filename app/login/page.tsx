"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { routes } from "@/app/lib/routes";
import { useState, type FormEvent } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email")?.toString(),
      password: formData.get("password")?.toString(),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      console.error("Login error:", result.error);
      return;
    }

    router.replace(routes.tasks.index());
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      {" "}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg border border-gray-200 p-6 shadow-sm"
      >
        {" "}
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="mt-2 text-gray-600">Sign in to manage your tasks.</p>
        <div className="mt-6">
          <label htmlFor="email" className="block font-medium">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="block font-medium">
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-2 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
        {error ? (
          <p className="mt-3 text-sm text-red-600">{error}</p>
        ) : null}

        <button
          type="submit"
          className="mt-6 w-full rounded bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
        >
          Sign In
        </button>
        <p className="mt-5 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            href={routes.register()}
            className="font-medium text-red-600 hover:underline"
          >
            Create one
          </Link>
        </p>
      </form>
    </main>
  );
}
