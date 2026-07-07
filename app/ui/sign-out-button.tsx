"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { routes } from "@/app/lib/routes";

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: routes.login() })}
      className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-red-400 hover:text-red-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
    >
      <LogOut size={16} />
      Logout
    </button>
  );
}
