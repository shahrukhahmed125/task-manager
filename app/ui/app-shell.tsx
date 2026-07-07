import Link from "next/link";
import { auth } from "@/auth";
import { routes } from "@/app/lib/routes";
import { SignOutButton } from "./sign-out-button";
import { ThemeToggle } from "./theme-toggle";

type AppShellProps = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
};

export async function AppShell({ children, title, subtitle }: AppShellProps) {
  const session = await auth();
  const displayName = session?.user?.name || session?.user?.email || "User";

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
      <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href={routes.tasks.index()} className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Task Manager
            </Link>
            <span className="hidden rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 sm:inline-flex dark:bg-red-950/60 dark:text-red-300">
              Hi, {displayName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {session?.user ? <SignOutButton /> : null}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          {subtitle ? <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{subtitle}</p> : null}
        </div>
        {children}
      </main>
    </div>
  );
}
