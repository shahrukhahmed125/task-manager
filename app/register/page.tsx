import Link from "next/link";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "../lib/prisma";

const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export default function RegisterPage() {
  async function registerAction(formData: FormData) {
    "use server";

    const result = registerSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!result.success) {
      redirect("/register?error=Please enter valid details");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: result.data.email,
      },
    });

    if (existingUser) {
      redirect("/register?error=Email already exists");
    }

    const hashedPassword = await hash(result.data.password, 12);

    await prisma.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: hashedPassword,
      },
    });

    redirect("/login?success=Account created successfully");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      {" "}
      <form
        action={registerAction}
        className="w-full max-w-md rounded-lg border border-gray-200 p-6 shadow-sm"
      >
        {" "}
        <h1 className="text-3xl font-bold">Create Account</h1>{" "}
        <p className="mt-2 text-white">Register to manage your tasks. </p>
        <div className="mt-6">
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-2 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
        <div className="mt-4">
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
            minLength={6}
            required
            className="mt-2 w-full rounded border border-gray-300 px-3 py-2"
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full rounded bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700"
        >
          Create Account
        </button>
        <p className="mt-5 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-red-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}
