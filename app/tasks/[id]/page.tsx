import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import { routes } from "@/app/lib/routes";
import { AppShell } from "@/app/ui/app-shell";

export default async function TaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(routes.login());
  }

  const { id } = await params;
  const task = await prisma.task.findFirst({
    where: { id: Number(id), user_id: Number(session.user.id) },
  });

  if (!task) {
    redirect(routes.tasks.index());
  }

  return (
    <AppShell title={task.title} subtitle="Task details">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
            {task.status.replace("_", " ")}
          </span>
          <div className="flex items-center gap-2">
            <Link href={routes.tasks.edit(task.id)} className="rounded-full border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:border-red-400 hover:text-red-600 dark:border-zinc-700 dark:text-zinc-200">
              Edit
            </Link>
            <Link href={routes.tasks.index()} className="rounded-full border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:border-red-400 hover:text-red-600 dark:border-zinc-700 dark:text-zinc-200">
              Back
            </Link>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
          <div>
            <p className="font-medium text-zinc-900 dark:text-zinc-100">Description</p>
            <p className="mt-1">{task.description || "No description provided."}</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
