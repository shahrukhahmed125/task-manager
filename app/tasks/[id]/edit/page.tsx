import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/app/lib/prisma";
import { routes } from "@/app/lib/routes";
import { updateTask } from "@/app/lib/tasks";
import { taskSchema } from "@/app/lib/validations/task";
import { AppShell } from "@/app/ui/app-shell";
import { TaskForm } from "@/app/ui/tasks/task-form";

export default async function EditTaskPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams?: Promise<{ error?: string }> }) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect(routes.login());
  }

  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  const task = await prisma.task.findFirst({
    where: { id: Number(id), user_id: Number(session.user.id) },
  });

  if (!task) {
    redirect(routes.tasks.index());
  }

  async function updateTaskAction(formData: FormData) {
    "use server";

    const result = taskSchema.safeParse({
      title: formData.get("title")?.toString() ?? "",
      description: formData.get("description")?.toString(),
      status: formData.get("status")?.toString(),
    });

    if (!result.success) {
      redirect(`${routes.tasks.edit(id)}?error=Please enter valid task details`);
    }

    await updateTask(Number(id), result.data);
    redirect(routes.tasks.show(id));
  }

  return (
    <AppShell title="Edit task" subtitle="Update your existing task.">
      <TaskForm action={updateTaskAction} submitLabel="Save changes" error={resolvedSearchParams?.error} defaultValues={{ title: task.title, description: task.description ?? "", status: task.status }} />
    </AppShell>
  );
}
