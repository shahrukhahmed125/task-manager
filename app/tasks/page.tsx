import Link from "next/link";
import { auth } from "@/auth";
import { deleteTask, getTasksByUserId } from "@/app/lib/tasks";
import { routes } from "@/app/lib/routes";
import { AppShell } from "@/app/ui/app-shell";
import { PlusCircle } from "lucide-react";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function TasksPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(routes.login());
  }

  async function deleteTaskAction(formData: FormData) {
    "use server";

    const taskId = Number(formData.get("taskId"));

    if (!taskId) {
      redirect(routes.tasks.index());
    }

    await deleteTask(taskId);
    redirect(routes.tasks.index());
  }

  const tasks = await getTasksByUserId(Number(session.user.id));

  return (
    <AppShell title="My Tasks" subtitle="Manage your personal work tasks.">
      <div className="flex items-center justify-end">
        <Link
          href={routes.tasks.create()}
          className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          <PlusCircle size={16} />
          New Task
        </Link>
      </div>

      <div className="mt-8 grid gap-4">
        {tasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-center text-zinc-600 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
            No tasks yet. Create your first task.
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <Link href={routes.tasks.show(task.id)} className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-lg font-semibold">{task.title}</h2>
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                      {task.status.replace("_", " ")}
                    </span>
                  </div>
                  {task.description ? (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{task.description}</p>
                  ) : null}
                </Link>
                <div className="flex items-center gap-2">
                  <Link href={routes.tasks.edit(task.id)} className="rounded-full border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:border-red-400 hover:text-red-600 dark:border-zinc-700 dark:text-zinc-200">
                    Edit
                  </Link>
                  <form action={deleteTaskAction}>
                    <input type="hidden" name="taskId" value={task.id} />
                    <button type="submit" className="rounded-full border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:border-red-400 hover:text-red-600 dark:border-zinc-700 dark:text-zinc-200">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </AppShell>
  );
}
